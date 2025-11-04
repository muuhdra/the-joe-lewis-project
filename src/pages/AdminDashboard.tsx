// src/pages/AdminDashboard.tsx
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import MarkdownEditor from "../components/admin/MarkdownEditor"

// Supabase (logout)
import { supabase } from "../lib/supabase"

// Bloc newsletter (autonome)
import AdminNewsletterBlock from "../components/admin/AdminNewsletterBlock"

// Posts (blog / travel)
import {
  adminGetPosts,   // admin: tout voir (brouillons + dates futures)
  upsertPost,
  deletePost,
  DraftPost,
  Section,
  Post,
} from "../data/postStore"

// eBooks
import {
  getEbooks,
  upsertEbook,
  deleteEbook,
  Ebook,
} from "../data/ebookStore"

// Upload d’image (Supabase Storage)
import { uploadImageAndGetUrl } from "../data/storage"

/* -------------------- Guard simple (flag session) -------------------- */
function guard(nav: ReturnType<typeof useNavigate>) {
  if (sessionStorage.getItem("admin_ok") !== "1") {
    nav("/admin")
  }
}

/* -------------------- Defaults -------------------- */
const emptyPost: DraftPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  image: "",
  video_url: "",
  isDraft: false,
  category: "Travel",
  reading_time: "4 min",
  author: "Joe Lewis",
  section: "blog",
  date: "",
}

const emptyEbook: Partial<Ebook> = {
  slug: "",
  title: "",
  excerpt: "",
  cover_image: "",
  file_url: "",
  price: 0,
  author: "Joe Lewis",
}

/* Small helpers */
const fmtDate = (iso: string) => new Date(iso).toLocaleString()
const pageSize = 10
const nowISO = () => new Date().toISOString()
const isFuture = (iso?: string) => !!iso && new Date(iso) > new Date()

function statusOf(p: Post) {
  if (p.is_draft) return { label: "Draft", className: "bg-yellow-100 text-yellow-700 border-yellow-200" }
  if (isFuture(p.date)) return { label: "Scheduled", className: "bg-blue-100 text-blue-700 border-blue-200" }
  return { label: "Published", className: "bg-green-100 text-green-700 border-green-200" }
}

export default function AdminDashboard() {
  const nav = useNavigate()
  guard(nav)

  const [tab, setTab] = useState<"posts" | "ebooks" | "newsletter">("posts")
  const [loading, setLoading] = useState(false)

  // --- Posts ---
  const [blog, setBlog] = useState<Post[]>([])
  const [travel, setTravel] = useState<Post[]>([])
  const [postForm, setPostForm] = useState<DraftPost>({ ...emptyPost })

  // collapsibles + search + pagination
  const [blogOpen, setBlogOpen] = useState(true)
  const [travelOpen, setTravelOpen] = useState(false)
  const [blogQ, setBlogQ] = useState("")
  const [travelQ, setTravelQ] = useState("")
  const [blogPage, setBlogPage] = useState(1)
  const [travelPage, setTravelPage] = useState(1)

  const blogFiltered = useMemo(() => {
    const q = blogQ.trim().toLowerCase()
    const items = q
      ? blog.filter(p =>
          (p.title + " " + p.slug + " " + (p.excerpt ?? "")).toLowerCase().includes(q)
        )
      : blog
    return items.sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [blog, blogQ])

  const travelFiltered = useMemo(() => {
    const q = travelQ.trim().toLowerCase()
    const items = q
      ? travel.filter(p =>
          (p.title + " " + p.slug + " " + (p.excerpt ?? "")).toLowerCase().includes(q)
        )
      : travel
    return items.sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [travel, travelQ])

  const blogPages = Math.max(1, Math.ceil(blogFiltered.length / pageSize))
  const travelPages = Math.max(1, Math.ceil(travelFiltered.length / pageSize))
  const blogSlice = blogFiltered.slice((blogPage - 1) * pageSize, blogPage * pageSize)
  const travelSlice = travelFiltered.slice((travelPage - 1) * pageSize, travelPage * pageSize)

  // --- eBooks ---
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [ebookForm, setEbookForm] = useState<Partial<Ebook>>({ ...emptyEbook })

  /* ------------ Lazy-load par onglet ------------ */
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        if (tab === "posts") {
          const [b, t] = await Promise.all([
            adminGetPosts("blog"),
            adminGetPosts("travel"),
          ])
          setBlog(b); setTravel(t)
        } else if (tab === "ebooks") {
          setEbooks(await getEbooks())
        }
        // tab === "newsletter" -> rien à faire ici : AdminNewsletterBlock gère tout (fetch + realtime)
      } catch (e: any) {
        console.error(e)
        alert(e.message ?? "Load error")
      } finally {
        setLoading(false)
      }
    })()
  }, [tab])

  /* -------------------- Helpers -------------------- */
  function onPostChange<K extends keyof DraftPost>(k: K, v: DraftPost[K]) {
    setPostForm(f => ({ ...f, [k]: v }))
  }
  function onEbookChange<K extends keyof Ebook>(k: K, v: Ebook[K]) {
    setEbookForm(f => ({ ...(f as any), [k]: v }))
  }

  // Charge un post dans le formulaire pour édition
  function loadForEdit(p: Post) {
    setTab("posts")
    const edited: DraftPost = {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? "",
      content: p.content ?? "",
      image: p.image ?? "",
      video_url: (p as any).video_url ?? "",
      isDraft: !!p.is_draft,
      category: (p as any).category ?? "",
      reading_time: (p as any).reading_time ?? "",
      author: p.author ?? "Joe Lewis",
      section: p.section as Section,
      date: p.date || "",
    }
    setPostForm(edited)
    if (p.section === "blog") { setBlogOpen(true) } else { setTravelOpen(true) }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* -------------------- Logout (fiable) -------------------- */
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Erreur de déconnexion :", error.message)
        alert("Erreur de déconnexion : " + error.message)
        return
      }
    } catch (err: any) {
      console.error("Erreur inattendue :", err)
    } finally {
      sessionStorage.removeItem("admin_ok")
      nav("/admin")
      window.location.href = "/admin"
    }
  }

  /* -------------------- POSTS actions -------------------- */
  async function saveAsDraft(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!postForm.title || !postForm.slug) {
      alert("Title & slug requis")
      return
    }
    try {
      setLoading(true)
      await upsertPost({
        ...postForm,
        isDraft: true,
        date: postForm.date || nowISO(),
      })
      alert("Draft saved ✅")
      setPostForm({ ...emptyPost })
      const [b, t] = await Promise.all([adminGetPosts("blog"), adminGetPosts("travel")])
      setBlog(b); setTravel(t)
    } catch (err: any) {
      alert(err.message ?? "Save draft error")
    } finally { setLoading(false) }
  }

  async function publishNow() {
    if (!postForm.title || !postForm.slug) {
      alert("Title & slug requis")
      return
    }
    try {
      setLoading(true)
      await upsertPost({
        ...postForm,
        isDraft: false,
        date: nowISO(),
      })
      alert("Published ✅")
      setPostForm({ ...emptyPost })
      const [b, t] = await Promise.all([adminGetPosts("blog"), adminGetPosts("travel")])
      setBlog(b); setTravel(t)
    } catch (err: any) {
      alert(err.message ?? "Publish error")
    } finally { setLoading(false) }
  }

  // Programme un post (date future obligatoire)
  async function schedulePost() {
    if (!postForm.title || !postForm.slug) {
      alert("Title & slug requis")
      return
    }
    if (!postForm.date || !isFuture(postForm.date)) {
      alert("Choisis une date FUTURE dans “Publish at” pour programmer.")
      return
    }
    try {
      setLoading(true)
      await upsertPost({
        ...postForm,
        isDraft: false,   // on planifie comme “non draft” + date future
      })
      alert("Scheduled ✅ This post will go live on the selected date.")
      setPostForm({ ...emptyPost })
      const [b, t] = await Promise.all([adminGetPosts("blog"), adminGetPosts("travel")])
      setBlog(b); setTravel(t)
    } catch (err: any) {
      alert(err.message ?? "Schedule error")
    } finally { setLoading(false) }
  }

  // Met à jour un post existant (édition)
  async function updatePost() {
    if (!postForm.title || !postForm.slug) {
      alert("Title & slug requis")
      return
    }
    try {
      setLoading(true)
      await upsertPost({
        ...postForm,
        isDraft: !!postForm.isDraft,
        // on respecte la date saisie (passé ou futur). Si vide, on met maintenant.
        date: postForm.date || nowISO(),
      })
      alert("Updated ✅")
      setPostForm({ ...emptyPost })
      const [b, t] = await Promise.all([adminGetPosts("blog"), adminGetPosts("travel")])
      setBlog(b); setTravel(t)
    } catch (err: any) {
      alert(err.message ?? "Update error")
    } finally { setLoading(false) }
  }

  async function removePost(slug: string, section: Section) {
    if (!confirm("Delete this post?")) return
    try {
      setLoading(true)
      await deletePost(slug, section)
      if (section === "blog") setBlog(await adminGetPosts("blog"))
      else setTravel(await adminGetPosts("travel"))
    } catch (err: any) {
      alert(err.message ?? "Delete post error")
    } finally { setLoading(false) }
  }

  /* -------------------- EBOOKS actions -------------------- */
  async function saveEbook(e: React.FormEvent) {
    e.preventDefault()
    if (!ebookForm.slug || !ebookForm.title) {
      alert("Title & slug requis")
      return
    }
    try {
      setLoading(true)
      await upsertEbook({
        ...ebookForm,
        price: Number(ebookForm.price || 0),
      })
      alert("eBook saved ✅")
      setEbookForm({ ...emptyEbook })
      setEbooks(await getEbooks())
    } catch (err: any) {
      alert(err.message ?? "Save ebook error")
    } finally { setLoading(false) }
  }

  async function removeEbook(slug: string) {
    if (!confirm("Delete this eBook?")) return
    try {
      setLoading(true)
      await deleteEbook(slug)
      setEbooks(await getEbooks())
    } catch (err: any) {
      alert(err.message ?? "Delete ebook error")
    } finally { setLoading(false) }
  }

  /* ------------- UI bits used by both accordions ------------- */
  function SectionPanel({
    title,
    open,
    onToggle,
    q,
    setQ,
    items,
    slice,
    page,
    pages,
    onPage,
    section,
  }: {
    title: string
    open: boolean
    onToggle: () => void
    q: string
    setQ: (v: string) => void
    items: Post[]
    slice: Post[]
    page: number
    pages: number
    onPage: (p: number) => void
    section: Section
  }) {
    return (
      <div className="rounded-2xl border" style={{ borderColor: "var(--border)" }}>
        {/* Header / toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">{title}</span>
            <span className="rounded-full px-2 py-0.5 text-xs"
              style={{ background: "var(--chip)" }}>
              {items.length}
            </span>
          </div>
          <span className="text-sm text-muted">{open ? "Hide ▲" : "Show ▼"}</span>
        </button>

        {/* Body */}
        {open && (
          <div className="px-4 pb-4">
            {/* tools row */}
            <div className="mb-3 flex items-center gap-3">
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); onPage(1) }}
                placeholder="Search title / slug / excerpt…"
                className="w-full sm:w-80 rounded-xl border px-3 py-2 bg-[var(--surface)]"
                style={{ borderColor: "var(--border)" }}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="[&>th]:text-left [&>th]:px-3 [&>th]:py-2 border-b"
                      style={{ borderColor: "var(--border)" }}>
                    <th className="w-[32%]">Title</th>
                    <th className="w-[20%]">Slug</th>
                    <th className="w-[14%]">Status</th>
                    <th className="w-[18%]">Date</th>
                    <th className="w-[16%]" />
                  </tr>
                </thead>
                <tbody>
                  {slice.map(p => {
                    const st = statusOf(p)
                    return (
                      <tr key={`${section}-${p.slug}`}
                        className="[&>td]:px-3 [&>td]:py-2 border-b last:border-b-0"
                        style={{ borderColor: "var(--border)" }}>
                        <td className="truncate">{p.title}</td>
                        <td className="truncate text-muted">{p.slug}</td>
                        <td>
                          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium">
                            <span className={`rounded-full px-2 py-0.5 ${st.className}`}>{st.label}</span>
                          </span>
                        </td>
                        <td className="whitespace-nowrap">{fmtDate(p.date)}</td>
                        <td className="text-right space-x-2">
                          <button className="btn btn-ghost" onClick={() => loadForEdit(p)}>Edit</button>
                          <button className="btn btn-ghost" onClick={() => removePost(p.slug, section)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })}
                  {slice.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-muted">
                        No items.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            {pages > 1 && (
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-muted">
                  {items.length} items • page {page}/{pages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-ghost"
                    disabled={page <= 1}
                    onClick={() => onPage(page - 1)}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-ghost"
                    disabled={page >= pages}
                    onClick={() => onPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  /* ==================== UI ==================== */
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <button
            className="btn btn-ghost hover:bg-red-500 hover:text-white transition"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          <button
            className={`px-3 py-1.5 rounded-full border text-sm ${tab==="posts" ? "bg-[var(--accent)] text-white border-transparent" : "bg-[var(--surface)]"}`}
            style={{ borderColor: "var(--border)" }}
            onClick={() => setTab("posts")}
          >
            Posts
          </button>
          <button
            className={`px-3 py-1.5 rounded-full border text-sm ${tab==="ebooks" ? "bg-[var(--accent)] text-white border-transparent" : "bg-[var(--surface)]"}`}
            style={{ borderColor: "var(--border)" }}
            onClick={() => setTab("ebooks")}
          >
            eBooks
          </button>
          <button
            className={`px-3 py-1.5 rounded-full border text-sm ${tab==="newsletter" ? "bg-[var(--accent)] text-white border-transparent" : "bg-[var(--surface)]"}`}
            style={{ borderColor: "var(--border)" }}
            onClick={() => setTab("newsletter")}
          >
            Newsletter
          </button>
        </div>

        {loading && <p className="mt-4 text-muted">Loading…</p>}

        {/* ==================== TAB: POSTS ==================== */}
        {tab === "posts" && (
          <div className="mt-8 space-y-6">
            <SectionPanel
              title="Blog (All)"
              open={blogOpen}
              onToggle={() => setBlogOpen(o => !o)}
              q={blogQ}
              setQ={setBlogQ}
              items={blog}
              slice={blogSlice}
              page={blogPage}
              pages={blogPages}
              onPage={setBlogPage}
              section="blog"
            />
            <SectionPanel
              title="Travel / Photography (All)"
              open={travelOpen}
              onToggle={() => setTravelOpen(o => !o)}
              q={travelQ}
              setQ={setTravelQ}
              items={travel}
              slice={travelSlice}
              page={travelPage}
              pages={travelPages}
              onPage={setTravelPage}
              section="travel"
            />

            {/* Form Post */}
            <form
              className="grid gap-4 rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onSubmit={(e) => { e.preventDefault(); saveAsDraft() }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create / Edit Post</h2>
                {postForm.slug && (
                  <span className="text-xs text-muted">Editing: <b>{postForm.slug}</b></span>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted">Section</label>
                  <select
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={postForm.section || "blog"}
                    onChange={e => onPostChange("section", e.target.value as Section)}
                  >
                    <option value="blog">Blog</option>
                    <option value="travel">Travel / Photography</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-muted">Title *</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={postForm.title}
                    onChange={e => onPostChange("title", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Slug *</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={postForm.slug}
                    onChange={e => onPostChange("slug", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-muted">Category</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={(postForm as any).category ?? ""}
                    onChange={e => onPostChange("category" as any, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted">Excerpt</label>
                <input
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--border)" }}
                  value={postForm.excerpt}
                  onChange={e => onPostChange("excerpt", e.target.value)}
                />
              </div>

              {/* Image + upload */}
              <div>
                <label className="text-sm text-muted">Cover image</label>
                <div className="flex gap-2">
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="URL ou /image/posts/xxx.jpg"
                    value={postForm.image}
                    onChange={e => onPostChange("image", e.target.value)}
                  />
                  <label className="btn btn-ghost cursor-pointer">
                    Upload
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        if (!postForm.slug) { alert("Renseigne le slug avant l’upload"); return }
                        try {
                          const url = await uploadImageAndGetUrl(file, "posts", postForm.slug)
                          onPostChange("image", url)
                        } catch (err: any) {
                          alert(err.message ?? "Upload error")
                        }
                      }}
                    />
                  </label>
                </div>
                {postForm.image && (
                  <img
                    src={postForm.image}
                    className="mt-2 h-24 rounded-lg border"
                    style={{ borderColor: "var(--border)" }}
                  />
                )}
              </div>

              {/* Vidéo */}
              <div>
                <label className="text-sm text-muted">Video URL (YouTube/Vimeo…)</label>
                <input
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--border)" }}
                  value={postForm.video_url || ""}
                  onChange={e => onPostChange("video_url", e.target.value)}
                />
              </div>

              {/* Planification & brouillon */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Publish at</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={postForm.date ? new Date(postForm.date).toISOString().slice(0,16) : ""}
                    onChange={e => onPostChange("date", e.target.value ? new Date(e.target.value).toISOString() : "")}
                  />
                  <p className="text-xs text-muted mt-1">
                    Choose a past date to back-date. Choose a future date and click <b>Schedule</b>.
                  </p>
                </div>
                <label className="flex items-center gap-2 mt-6 sm:mt-8">
                  <input
                    type="checkbox"
                    checked={!!postForm.isDraft}
                    onChange={e => onPostChange("isDraft", e.target.checked)}
                  />
                  <span className="text-sm text-muted">Save as draft</span>
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Reading time</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={postForm.reading_time || ""}
                    onChange={e => onPostChange("reading_time", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted">Author</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={postForm.author || ""}
                    onChange={e => onPostChange("author", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted">Content (HTML/Markdown)</label>
                <MarkdownEditor
                  value={postForm.content || ""}
                  onChange={(v) => onPostChange("content", v)}
                  slug={postForm.slug}
                  folder="posts"
                />
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3">
                <button className="btn btn-ghost" type="button" onClick={saveAsDraft}>Save as draft</button>
                <button className="btn btn-primary" type="button" onClick={publishNow}>Publish now</button>
                <button className="btn" type="button" onClick={schedulePost}>Schedule</button>
                <button className="btn btn-secondary" type="button" onClick={updatePost} disabled={!postForm.slug}>
                  Update post
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setPostForm({ ...emptyPost })}>
                  Reset form
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== TAB: EBOOKS ==================== */}
        {tab === "ebooks" && (
          <div className="mt-8">
            <div className="rounded-2xl border" style={{ borderColor: "var(--border)" }}>
              <div className="px-4 py-3 font-semibold">eBooks</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-2 border-b" style={{ borderColor: "var(--border)" }}>
                      <th>Title</th><th>Slug</th><th>Price</th><th>Date</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ebooks.map(e => (
                      <tr key={e.slug} className="[&>td]:px-4 [&>td]:py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                        <td>{e.title}</td>
                        <td className="text-muted">{e.slug}</td>
                        <td>{Number(e.price ?? 0).toFixed(2)}</td>
                        <td>{fmtDate(e.date)}</td>
                        <td className="text-right">
                          <button className="btn btn-ghost" onClick={() => removeEbook(e.slug)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {ebooks.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-6 text-center text-muted">No eBooks yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <form
              onSubmit={saveEbook}
              className="mt-4 grid gap-4 rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <h2 className="text-xl font-semibold">Create / Edit eBook</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Title *</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={ebookForm.title || ""}
                    onChange={e => onEbookChange("title", e.target.value as any)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-muted">Slug *</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={ebookForm.slug || ""}
                    onChange={e => onEbookChange("slug", e.target.value as any)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted">Excerpt</label>
                <input
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: "var(--border)" }}
                  value={ebookForm.excerpt || ""}
                  onChange={e => onEbookChange("excerpt", e.target.value as any)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Cover image URL</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={ebookForm.cover_image || ""}
                    onChange={e => onEbookChange("cover_image", e.target.value as any)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted">File URL (PDF/ePub)</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={ebookForm.file_url || ""}
                    onChange={e => onEbookChange("file_url", e.target.value as any)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={ebookForm.price ?? 0}
                    onChange={e => onEbookChange("price", Number(e.target.value) as any)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted">Author</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    style={{ borderColor: "var(--border)" }}
                    value={ebookForm.author || ""}
                    onChange={e => onEbookChange("author", e.target.value as any)}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button className="btn btn-primary" type="submit">Save eBook</button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEbookForm({ ...emptyEbook })}
                >
                  Reset form
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==================== TAB: NEWSLETTER ==================== */}
        {tab === "newsletter" && (
          <AdminNewsletterBlock />
        )}
      </section>
    </main>
  )
}
