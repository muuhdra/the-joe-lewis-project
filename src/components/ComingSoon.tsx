// src/components/ComingSoon.tsx
import { useMemo, useState } from "react"
import Reveal from "./Reveal"
import { Mail, Brain, Compass, Sparkles, Newspaper } from "lucide-react"
import { getComing } from "../data/comingSoonStore"
import { addSubscriber } from "../data/newsletterStore"

export default function ComingSoon() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle")

  // 1) Pull items from the local store
  const items = getComing()

  // 2) Map icons + sanitize fields, and HIDE the newsletter card here
  //    (if you also want it gone from the data source, remove it there too)
  const itemsWithIcons = useMemo(() => {
    const pickIcon = (id?: string) => {
      if (!id) return <Sparkles className="h-5 w-5" aria-hidden="true" />
      if (id.includes("medit")) return <Brain className="h-5 w-5" aria-hidden="true" />
      if (id.includes("ai")) return <Compass className="h-5 w-5" aria-hidden="true" />
      if (id.includes("news")) return <Newspaper className="h-5 w-5" aria-hidden="true" />
      return <Sparkles className="h-5 w-5" aria-hidden="true" />
    }
    return items
      .filter(it => !(it.id || "").toLowerCase().includes("news")) // ← hide newsletter card
      .map(it => ({
        ...it,
        icon: pickIcon(it.id),
        progress: typeof it.progress === "number"
          ? Math.max(0, Math.min(100, it.progress))
          : 0,
        eta: it.eta || "ETA: Soon™",
      }))
  }, [items])

  // 3) Subscribe handler (wired to Supabase via addSubscriber)
  async function onNotify(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    try {
      setStatus("loading")
      await addSubscriber(email.trim())
      setStatus("ok")
      setEmail("")
    } catch (err) {
      console.error(err)
      setStatus("err")
    } finally {
      // soft reset of the banner after a short delay
      setTimeout(() => setStatus("idle"), 2500)
    }
  }

  return (
    <section id="coming-soon" className="py-9" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Title + tagline + notify box */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Coming soon
              </h2>
              <p className="mt-2 text-muted">
                Be the first to know when new features go live.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={onNotify} className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1 sm:w-72">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email to get notified"
                  className="w-full rounded-xl border pl-9 pr-3 py-2.5 bg-[var(--surface)] outline-none"
                  style={{ borderColor: "var(--border)" }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-primary whitespace-nowrap"
                aria-label="Notify me when features launch"
              >
                {status === "loading" ? "Sending…" : status === "ok" ? "Thanks! 🎉" : "Notify me"}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Empty state */}
        {itemsWithIcons.length === 0 ? (
          <Reveal delay={0.08}>
            <div
              className="mt-10 rounded-2xl border p-6 text-center text-muted"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              Nothing to show yet. Check back soon!
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {itemsWithIcons.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.06}>
                <article
                  className="relative overflow-hidden rounded-2xl border bg-[var(--surface)] hover:shadow-lg transition-shadow flex flex-col"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[var(--ink)]">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--chip)]">
                        {it.icon}
                      </div>
                      <h3 className="text-base font-semibold">{it.title}</h3>
                    </div>

                    {it.desc && <p className="mt-3 text-sm text-muted flex-1">{it.desc}</p>}

                    {/* ETA + progress */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs text-muted mb-1">
                        <span>{it.eta}</span>
                        <span>{it.progress}%</span>
                      </div>
                      <div
                        className="h-2 w-full rounded-full bg-black/5"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={it.progress}
                        aria-label={`${it.title} progress`}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${it.progress}%`,
                            background: "var(--accent)",
                            transition: "width 600ms cubic-bezier(.2,.8,.2,1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <span
                    className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium text-white"
                    style={{ background: "var(--accent)" }}
                    aria-label="Coming soon badge"
                  >
                    Soon
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.08}>
          <p className="mt-8 text-xs text-muted">
            *Dates are estimates and may shift based on feedback and prioritization.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
