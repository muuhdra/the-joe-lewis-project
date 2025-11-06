// src/components/admin/MarkdownEditor.tsx
import React, { useEffect, useRef, useState } from "react"
import { uploadImageAndGetUrl } from "../../data/storage"

type Props = {
  value: string
  onChange: (html: string) => void
  slug: string
  folder: string
}

type FmtState = {
  bold: boolean
  italic: boolean
  underline: boolean
  bulleted: boolean
  numbered: boolean
  block: "H1" | "H2" | "P" | null
}

export default function MarkdownEditor({ value, onChange, slug, folder }: Props) {
  const areaRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const colorRef = useRef<HTMLInputElement>(null)

  const [hint, setHint] = useState("")
  const [fmt, setFmt] = useState<FmtState>({
    bold: false,
    italic: false,
    underline: false,
    bulleted: false,
    numbered: false,
    block: null,
  })
  const [textColor, setTextColor] = useState<string>("#000000")
  const hintTimer = useRef<number | null>(null)

  // Sync parent value -> DOM
  useEffect(() => {
    if (!areaRef.current) return
    if (areaRef.current.innerHTML !== (value || "")) {
      areaRef.current.innerHTML = value || ""
    }
  }, [value])

  const notify = () => {
    if (!areaRef.current) return
    onChange(areaRef.current.innerHTML)
    refreshState()
  }

  function showHint(text: string, persist = false) {
    setHint(text)
    if (hintTimer.current) window.clearTimeout(hintTimer.current)
    if (!persist) {
      hintTimer.current = window.setTimeout(() => setHint(""), 4500) as any
    }
  }

  function refreshState() {
    try {
      const bold = document.queryCommandState("bold")
      const italic = document.queryCommandState("italic")
      const underline = document.queryCommandState("underline")
      const bulleted = document.queryCommandState("insertUnorderedList")
      const numbered = document.queryCommandState("insertOrderedList")
      let block: FmtState["block"] = null
      const tag = getBlockTag(areaRef.current)
      if (tag === "H1" || tag === "H2" || tag === "P") block = tag
      setFmt({ bold, italic, underline, bulleted, numbered, block })
    } catch {}
  }

  function getBlockTag(container: HTMLElement | null): string | null {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return null
    let node: Node | null = sel.getRangeAt(0).startContainer
    if (!node) return null
    if (node.nodeType === 3) node = node.parentNode
    while (node && node instanceof HTMLElement) {
      if (node === container) break
      const tag = node.tagName
      if (["H1", "H2", "P", "BLOCKQUOTE", "PRE"].includes(tag)) return tag
      node = node.parentElement
    }
    return null
  }

  function cmd(command: string, val?: string, helpText?: string) {
    document.execCommand(command, false, val)
    notify()
    if (helpText) showHint(helpText)
  }

  function setBlock(tag: "H1" | "H2" | "P") {
    document.execCommand("formatBlock", false, tag)
    notify()
    const label = tag === "H1" ? "Heading" : tag === "H2" ? "Subheading" : "Paragraph"
    showHint(`${label} selected — type to continue with this style.`)
  }

  function addLink() {
    const url = prompt("Link URL (e.g., https://example.com)")
    if (!url) return
    cmd("createLink", url, "Link inserted. Select it and click Link again to change or remove.")
  }

  function wrap(tag: "blockquote" | "pre", label: string) {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return
    const range = sel.getRangeAt(0)
    const el = document.createElement(tag)
    el.appendChild(range.extractContents())
    range.insertNode(el)
    range.setStartAfter(el)
    range.setEndAfter(el)
    sel.removeAllRanges()
    sel.addRange(range)
    notify()
    showHint(`${label} added. Type after the block to return to normal text.`)
  }

  function insertNode(node: Node) {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) {
      areaRef.current?.appendChild(node)
    } else {
      const r = sel.getRangeAt(0)
      r.deleteContents()
      r.insertNode(node)
      r.setStartAfter(node)
      r.setEndAfter(node)
      sel.removeAllRanges()
      sel.addRange(r)
    }
    notify()
  }

  // ---- YouTube
  function addYouTube() {
    const url = prompt("Paste a YouTube URL")
    if (!url) return
    insertYouTubeByUrl(url)
  }
  function insertYouTubeByUrl(url: string) {
    const idMatch =
      url.match(/v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/) || url.match(/embed\/([^?]+)/)
    const id = idMatch?.[1]
    if (!id) { alert("Invalid YouTube link"); return }
    const iframe = document.createElement("iframe")
    iframe.width = "560"
    iframe.height = "315"
    iframe.src = `https://www.youtube.com/embed/${id}`
    iframe.title = "YouTube"
    iframe.frameBorder = "0"
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ;(iframe as any).allowFullscreen = true
    iframe.style.display = "block"
    iframe.style.margin = "16px 0"
    insertNode(iframe)
    showHint("Video inserted. You can move it by selecting the frame and cut/paste.", true)
  }

  // ---- Images
  function chooseImage() { fileRef.current?.click() }
  async function handleFile(file: File) {
    if (!file) return
    if (!slug) { alert("Please fill the SLUG first so the image can be stored in the right folder."); return }
    const url = await uploadImageAndGetUrl(file, folder, slug)
    const img = document.createElement("img")
    img.src = url
    img.alt = file.name
    img.loading = "lazy"
    // Keep the editor consistent with reading view
    img.style.maxWidth = "100%"
    img.style.maxHeight = "70vh"
    img.style.borderRadius = "12px"
    img.style.display = "block"
    img.style.margin = "12px 0"
    insertNode(img)
    showHint("Image added. It automatically fits the page width.", true)
  }

  // ---- Two-up (two images side by side)
  function insertTwoUp() {
    const html = `
<div class="jl-two">
  <img src="/image/left.jpg" alt="left" loading="lazy" decoding="async" />
  <img src="/image/right.jpg" alt="right" loading="lazy" decoding="async" />
</div>
`.trim()
    document.execCommand("insertHTML", false, html)
    notify()
    showHint("Two-up block inserted. Replace the two images (drag/drop or paste).")
  }

  // DnD / Paste
  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer?.files?.[0]
    if (f) handleFile(f)
  }
  function onPaste(e: React.ClipboardEvent) {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const it = items[i]
        if (it.kind === "file") {
          const f = it.getAsFile()
          if (f) { e.preventDefault(); handleFile(f); return }
        }
      }
    }
    const text = e.clipboardData?.getData("text")
    if (text && /youtu(\.be|be\.com)/i.test(text)) { e.preventDefault(); insertYouTubeByUrl(text) }
  }

  useEffect(() => {
    const handler = () => refreshState()
    document.addEventListener("selectionchange", handler)
    return () => document.removeEventListener("selectionchange", handler)
  }, [])

  // Text color
  function openColorPicker() { colorRef.current?.click() }
  function applyColor(color: string) {
    setTextColor(color)
    document.execCommand("foreColor", false, color)
    notify()
    showHint(`Text color applied — ${color}.`, false)
  }
  function clearColor() {
    document.execCommand("removeFormat")
    notify()
    showHint("Text style cleared.", false)
  }

  return (
    <div className="rounded-xl border" style={{ borderColor: "var(--border)" }}>
      <div className="px-3 py-2 text-sm"
           style={{ background: "var(--surface)", borderBottom: `1px solid var(--border)` }}>
        <span className="font-medium">Quick help:</span> Click <b>Heading</b>, <b>Bold</b>, etc.
        A guide message will tell you what to do next. Drop or paste an image, or use <b>Add image</b>.
        Paste a YouTube link, or click <b>Add video</b>.
      </div>

      <div className="flex flex-wrap items-center gap-2 px-3 py-3"
           style={{ borderBottom: `1px solid var(--border)`, background: "var(--bg)" }}>
        <Group title="Structure">
          <Btn onClick={() => setBlock("H1")} text="Heading"    active={fmt.block === "H1"} />
          <Btn onClick={() => setBlock("H2")} text="Subheading" active={fmt.block === "H2"} />
          <Btn onClick={() => setBlock("P")}  text="Paragraph"  active={fmt.block === "P"} />
        </Group>

        <Group title="Format">
          <Btn onClick={() => cmd("bold", undefined, "Bold is ON — type to write in bold (click again to stop).")}
               text="Bold" active={fmt.bold} />
          <Btn onClick={() => cmd("italic", undefined, "Italic is ON — type to write in italic.")}
               text="Italic" active={fmt.italic} />
          <Btn onClick={() => cmd("underline", undefined, "Underline is ON — type to underline.")}
               text="Underline" active={fmt.underline} />
        </Group>

        <Group title="Lists">
          <Btn onClick={() => cmd("insertUnorderedList", undefined, "Bulleted list — type to add items.")}
               text="• Bullets" active={fmt.bulleted} />
          <Btn onClick={() => cmd("insertOrderedList", undefined, "Numbered list — type to add items.")}
               text="1. Numbers" active={fmt.numbered} />
        </Group>

        <Group title="Insert">
          <Btn onClick={addLink}     text="Link" />
          <Btn onClick={chooseImage} text="Add image" />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.currentTarget.value = "" }}
          />
          <Btn onClick={addYouTube}  text="Add video" />
          <Btn onClick={insertTwoUp} text="Two-up" />
        </Group>

        <Group title="Color">
          <ColorBtn color={textColor} onPick={openColorPicker} onClear={clearColor} />
          <input
            ref={colorRef}
            type="color"
            value={textColor}
            onChange={(e) => applyColor(e.target.value)}
            hidden
          />
        </Group>

        <Group title="Tools">
          <Btn onClick={() => wrap("blockquote", "Quote")} text="Quote" />
          <Btn onClick={() => wrap("pre", "Code block")}   text="Code" />
          <Btn onClick={() => { cmd("removeFormat"); showHint("Text style cleared.") }}
               text="Clear style" />
        </Group>
      </div>

      {hint && (
        <div className="px-3 py-2 text-sm"
             style={{ background: "var(--surface)", borderBottom: `1px solid var(--border)`, color: "var(--ink)" }}>
          {hint}
        </div>
      )}

      {/* EDITOR AREA */}
      <div
        ref={areaRef}
        contentEditable
        suppressContentEditableWarning
        className="editor-area min-h-[220px] max-h-[480px] overflow-y-auto px-4 py-4 leading-7 rounded-b-xl"
        style={{
          outline: "none",
          background: "#ffffff",
          color: "var(--ink)",
          fontFamily: 'ui-serif, Georgia, "Times New Roman", Times, serif',
          fontSize: "16px",
        }}
        onInput={notify}
        onBlur={notify}
        onDrop={onDrop}
        onPaste={onPaste}
        aria-label="Editor area"
      />

      <div className="px-3 py-2 text-xs text-muted"
           style={{ borderTop: `1px solid var(--border)`, background: "var(--surface)" }}>
        <ul className="list-disc pl-5 space-y-1">
          <li>Colored buttons mean the style is <b>ON</b> (e.g., Bold).</li>
          <li>A short guide appears below the toolbar after each click.</li>
          <li>Images: choose a file, drag & drop, or paste from clipboard.</li>
          <li>Videos: paste a YouTube link — the preview is embedded automatically.</li>
          <li>Two-up: inserts a side-by-side image block.</li>
          <li>Text color: click the color swatch to pick, “×” to clear.</li>
        </ul>
      </div>

      {/* Local styles for the editable area */}
      <style>{`
        .editor-area ul, .editor-area ol { margin: .7em 0; padding-left: 1.4em; }
        .editor-area ul { list-style: disc outside; }
        .editor-area ol { list-style: decimal outside; }
        .editor-area li { margin: .3em 0; }

        .editor-area h1 { font-size: 1.75rem; font-weight: 800; line-height: 1.2; margin: 1.1em 0 .5em }
        .editor-area h2 { font-size: 1.35rem; font-weight: 700; margin: 1em 0 .45em }
        .editor-area p  { margin: .8em 0; }

        .editor-area img { max-width: 100%; height: auto; max-height: 70vh; display:block; margin: 1rem 0; border-radius: 12px; }

        /* two images side by side */
        .editor-area .jl-two { display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin: 1rem 0; }
        .editor-area .jl-two img { margin:0; }
        @media (max-width:640px){ .editor-area .jl-two { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}

/* ---------- Small UI helpers ---------- */

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] uppercase tracking-wide text-muted">{title}</span>
      <div className="flex items-center gap-2">{children}</div>
      <span className="mx-2 h-6 w-px" style={{ background: "var(--border)" }} />
    </div>
  )
}

function Btn({ onClick, text, active }: { onClick: () => void; text: string; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!active}
      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-[var(--accent)] text-white" : "hover:bg-black/5"
      }`}
      style={{ borderColor: "var(--border)", background: active ? "var(--accent)" as any : "var(--surface)" }}
      title={text}
    >
      {text}
    </button>
  )
}

function ColorBtn({
  color,
  onPick,
  onClear,
}: { color: string; onPick: () => void; onClear: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPick}
        className="rounded-lg border px-2 py-1.5 text-sm font-medium hover:bg-black/5"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        title="Text color"
      >
        <span className="mr-2">Text color</span>
        <span aria-hidden className="inline-block h-4 w-6 rounded border" style={{ background: color, borderColor: "var(--border)" }} />
      </button>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border px-2 py-1.5 text-sm hover:bg-black/5"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        title="Clear color"
      >
        ×
      </button>
    </div>
  )
}
