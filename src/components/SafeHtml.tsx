
import React, { useMemo } from "react"


function basicSanitize(html: string) {
  return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
}


function mdToHtml(md: string) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // blocs
  const lines = md.replace(/\r\n?/g, "\n").split("\n")
  const out: string[] = []
  let inList = false

  const flushList = () => { if (inList) { out.push("</ul>"); inList = false } }

  for (let raw of lines) {
    const line = raw.trimRight()

    if (!line.trim()) { flushList(); out.push("") ; continue }

    if (/^###\s+/.test(line)) { flushList(); out.push(`<h3>${esc(line.replace(/^###\s+/, ""))}</h3>`); continue }
    if (/^##\s+/.test(line))  { flushList(); out.push(`<h2>${esc(line.replace(/^##\s+/, ""))}</h2>`);  continue }
    if (/^#\s+/.test(line))   { flushList(); out.push(`<h1>${esc(line.replace(/^#\s+/, ""))}</h1>`);   continue }

    if (/^-\s+/.test(line)) {
      if (!inList) { out.push("<ul>"); inList = true }
      out.push(`<li>${esc(line.replace(/^-+\s+/, ""))}</li>`)
      continue
    } else {
      flushList()
    }

    // paragraphes (inline markdown simple)
    let p = esc(line)
    // images ![alt](src)
    p = p.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, a, s) => `<img src="${s}" alt="${a}" />`)
    // liens [text](url)
    p = p.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, s) => `<a href="${s}" target="_blank" rel="noopener noreferrer">${t}</a>`)
    // gras **tx**
    p = p.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // italique *tx*
    p = p.replace(/\*([^*]+)\*/g, "<em>$1</em>")

    out.push(`<p>${p}</p>`)
  }
  flushList()
  return out.join("\n")
}

/** Détection très simple : si on voit un marqueur Markdown, on convertit */
function looksLikeMarkdown(s: string) {
  return /(^|\n)\s*#{1,3}\s|!\[|\[.*?\]\(.*?\)|\n-\s/.test(s)
}

/** Transformations “riches” : images distantes et YouTube */
function postProcess(html: string) {
  let h = html

  // YouTube: si on trouve une URL youtube sur une ligne seule → iframe
  h = h.replace(
    /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{6,}))[^\S\r\n]*$/gm,
    (_m, _full, id) =>
      `<div class="yt-wrap"><iframe src="https://www.youtube.com/embed/${id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`
  )

  // Ajoute loading="lazy" aux <img>
  h = h.replace(/<img(.*?)>/g, (m) => {
    if (/loading=/.test(m)) return m
    return m.replace("<img", '<img loading="lazy"')
  })

  return h
}

type Props = {
  html: string
}

export default function SafeHtml({ html }: Props) {
  const finalHtml = useMemo(() => {
    const raw = looksLikeMarkdown(html) ? mdToHtml(html) : html
    const rich = postProcess(raw)
    return basicSanitize(rich)
  }, [html])

  return (
    <div
      className="content-html prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: finalHtml }}
    />
  )
}

