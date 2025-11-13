import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTravelPosts, type Post } from "../data/postStore"

export default function TravelPage() {
  const [list, setList] = useState<Post[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await getTravelPosts()
        if (!alive) return
        setList(data)
      } catch (e: any) {
        setErr(e?.message || "Failed to load travel posts")
      }
    })()
    return () => { alive = false }
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Travel / Photography</h1>
        <p className="mt-2 text-muted">
          Journeys, landscapes and stories captured through the lens.
        </p>
      </header>

      {err && <p className="text-red-600">{err}</p>}
      {!list && !err && <p className="text-muted">Loading…</p>}

      {list && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((post) => (
            <Link
              key={post.slug}
              to={`/travel/${post.slug}`}
              className="group block overflow-hidden rounded-xl border bg-[var(--surface)] hover:shadow-lg transition"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}