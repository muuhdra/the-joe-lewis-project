import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getBlogPosts, type Post } from "../data/postStore"

const categories = ["All", "Travel", "Adventure", "Gear"] as const
type Cat = typeof categories[number]

export default function BlogPage() {
  const [cat, setCat] = useState<Cat>("All")
  const [q, setQ] = useState("")
  const [items, setItems] = useState<Post[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await getBlogPosts()
        if (!alive) return
        setItems(data)
      } catch (e: any) {
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
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles…"
          className="w-full sm:w-96 rounded-xl border px-3 py-2 bg-[var(--surface)]"
          style={{ borderColor: "var(--border)" }}
        />
        {/* (optionnel) filtres de catégories si tu veux les réactiver plus tard */}
      </div>

      {err && <p className="text-red-600">{err}</p>}
      {!items && !err && <p className="text-muted">Loading…</p>}

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((post) => {
          const hasSlug = !!post.slug
          const to = hasSlug ? `/blog/${encodeURIComponent(post.slug)}` : undefined
          const imgSrc = post.image || "/image/placeholder.jpg"

          const CardInner = (
            <>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={imgSrc}
                  alt={post.title || "Blog cover"}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-[var(--chip)]">
                    {post.category ?? "Blog"}
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
                {hasSlug && (
                  <span className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
                    Read more →
                  </span>
                )}
              </div>
            </>
          )

          return (
            <article
              key={post.slug || post.title}
              className="group overflow-hidden rounded-2xl border bg-[var(--surface)] hover:shadow-lg transition-shadow"
              style={{ borderColor: "var(--border)" }}
            >
              {hasSlug ? (
                <Link to={to!} className="block" aria-label={`Read article: ${post.title}`}>
                  {CardInner}
                </Link>
              ) : (
                <div className="opacity-80 cursor-not-allowed" title="Missing slug">
                  {CardInner}
                </div>
              )}
            </article>
          )
        })}
      </section>

      {items && list.length === 0 && (
        <p className="text-muted mt-10">No article matches your search.</p>
      )}
    </main>
  )
}
