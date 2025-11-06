
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getBlogPosts, type Post } from "../data/postStore"

const categories = ["All", "Travel", "Adventure", "Gear"] as const
type Cat = typeof categories[number]

export default function PostPage() {
  const [cat, setCat] = useState<Cat>("All")
  const [q, setQ] = useState("")
  const [items, setItems] = useState<Post[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  // Charge les articles publiés depuis Supabase
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await getBlogPosts()
        if (!alive) return
        setItems(data)
      } catch (e: any) {
        if (!alive) return
        setErr(e?.message || "Failed to load blog posts")
      }
    })()
    return () => { alive = false }
  }, [])

  const list = useMemo(() => {
    if (!items) return []
    let l = [...items]
    if (cat !== "All") l = l.filter(p => p.category === cat)
    if (q.trim()) {
      const s = q.toLowerCase()
      l = l.filter(p => (p.title + " " + (p.excerpt ?? "")).toLowerCase().includes(s))
    }
    return l.sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [items, cat, q])

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Blog</h1>
          <p className="mt-2 text-muted">Filtre par catégorie ou recherche un article.</p>
        </div>

        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full border text-sm ${
                cat === c
                  ? "bg-[var(--accent)] text-white border-transparent"
                  : "bg-[var(--surface)] text-muted"
              }`}
              style={{ borderColor: "var(--border)" }}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="mb-8">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles…"
          className="w-full sm:w-96 rounded-xl border px-3 py-2 bg-[var(--surface)]"
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      {err && <p className="text-red-600">{err}</p>}
      {!items && !err && <p className="text-muted">Loading…</p>}

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-2xl border bg-[var(--surface)] hover:shadow-lg transition-shadow"
            style={{ borderColor: "var(--border)" }}
          >
            <Link to={`/blog/${post.slug}`} className="block" aria-label={`Read article: ${post.title}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-[var(--chip)]">
                    {post.category}
                  </span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  {post.reading_time && (
                    <>
                      <span>•</span>
                      <span>{post.reading_time}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {items && list.length === 0 && (
        <p className="text-muted mt-10">Aucun article ne correspond à ta recherche.</p>
      )}
    </main>
  )
}
