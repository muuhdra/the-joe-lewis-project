import Reveal from "./Reveal"
import { Link } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { getBlogPosts, type Post } from "../data/postStore"

export default function Blog() {
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

  const latest = useMemo(() => {
    if (!items) return []
    return [...items].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)
  }, [items])

  return (
    <section id="blog" className="py-2" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre + bouton à droite */}
        <div className="flex items-center justify-between gap-4">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Blog
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <Link to="/blog" className="btn btn-ghost shrink-0">
              Browse all articles
            </Link>
          </Reveal>
        </div>

        {err && <p className="mt-6 text-sm text-red-600">{err}</p>}
        {!items && !err && <p className="mt-6 text-muted">Loading…</p>}

        {/* Grille (3 derniers) */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: "var(--bg-alt)" }}
                aria-label={`Read article: ${post.title}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover sm:h-52"
                  loading="lazy"
                  decoding="async"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>

                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)]">
                    Read article <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
