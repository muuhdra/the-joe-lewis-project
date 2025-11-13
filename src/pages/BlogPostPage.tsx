
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getBlogPostBySlug, type Post } from "../data/postStore"
import SafeHtml from "../components/SafeHtml"

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let alive = true
    ;(async () => {
      try {
        const p = await getBlogPostBySlug(slug)
        if (!alive) return
        if (!p) setErr("This blog post doesn’t exist.")
        else setPost(p)
      } catch (e: any) {
        setErr(e?.message || "Failed to load post")
      }
    })()
    return () => { alive = false }
  }, [slug])

  if (err) {
    return (
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="font-display text-3xl font-bold">Not found</h1>
        <p className="text-muted mt-2">{err}</p>
        <Link to="/blog" className="btn btn-secondary mt-6">Back to Blog</Link>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-muted">
        Loading…
      </main>
    )
  }

  return (
    <main style={{ background: "var(--bg)" }}>
      {/* Hero image */}
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="rounded-2xl bg-black/35 backdrop-blur px-5 py-4 text-white shadow-lg">
            <p className="text-xs opacity-90">
              {post.category ?? "Blog"} • {new Date(post.date).toLocaleDateString()}
            </p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-bold">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10 py-14">
        <article
          className="bg-white text-[var(--ink)] border border-black p-8 sm:p-10 md:p-12 leading-relaxed"
          style={{
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Rendu HTML collé depuis l’éditeur (images, iframes, etc.) */}
          <SafeHtml html={post.content || ""} />
        </article>


        <div className="mt-12 flex items-center gap-3">
          <Link to="/blog" className="btn btn-secondary">Back to Blog</Link>
          <Link to="/" className="btn">Home</Link>
        </div>
      </section>
    </main>
  )
}
