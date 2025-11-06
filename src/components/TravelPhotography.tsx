
import Reveal from "./Reveal"
import { Link } from "react-router-dom"
import { useEffect, useState, useMemo } from "react"
import { getTravelPosts, type Post } from "../data/postStore"

export default function TravelPhotography() {
  const [items, setItems] = useState<Post[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const list = await getTravelPosts()
        if (!alive) return
        setItems(list)
      } catch (e: any) {
        setErr(e?.message || "Failed to load travel posts")
      }
    })()
    return () => { alive = false }
  }, [])

  const latest = useMemo(() => {
    if (!items) return []
    return [...items].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)
  }, [items])

  return (
    <section id="travel" className="py-8" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Reveal><h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Travel / Photography</h2></Reveal>
          <Reveal delay={0.05}><Link to="/travel" className="btn btn-ghost shrink-0">Discover</Link></Reveal>
        </div>

        {err && <p className="mt-6 text-sm text-red-600">{err}</p>}
        {!items && !err && <p className="mt-6 text-muted">Loading…</p>}

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                to={`/travel/${post.slug}`}
                className="block overflow-hidden rounded-2xl shadow-lg bg-[var(--bg-alt)] hover:scale-[1.02] transition-transform duration-300"
                aria-label={`Read travel story: ${post.title}`}
              >
                <div className="relative h-56 w-full sm:h-64">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-xl bg-black/35 px-4 py-3 text-white backdrop-blur">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                    </div>
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
