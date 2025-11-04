// src/pages/EbookPreviewPage.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// 🔧 Remplace si besoin
const SUBSTACK_URL = "https://joelewis.substack.com"
const RELEASE_LABEL = "Coming January 2026"
const PDF_URL = "/downloads/samurai-ch1.pdf" // même chemin que /downloads/

export default function EbookPreviewPage() {
  const [progress, setProgress] = useState(0)

  // Barre de progression basée sur le scroll
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const current = el.scrollTop
      const pct = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0
      setProgress(pct)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Barre de progression */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[60] h-1 bg-[var(--accent)]"
        style={{ width: `${progress}%`, transition: "width .2s ease" }}
      />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div
          className="rounded-3xl border bg-[var(--bg-alt)]/80 backdrop-blur p-6 md:p-10"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            {RELEASE_LABEL}
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-tight">
            The Samurai Who Traveled Light — Free Preview
          </h1>
          <p className="mt-3 text-muted">
            Two sample chapters (Manila opening). ~8–10 min read.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {/* Bouton Beehiiv retiré */}
            <a href={PDF_URL} className="btn btn-outline" target="_blank" rel="noreferrer">
              Download Free PDF
            </a>
            <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Get notified on Substack
            </a>
            <Link to="/ebook" className="btn btn-ghost">
              Go to eBook page
            </Link>
          </div>
        </div>
      </section>

      {/* Corps de lecture */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24 reading-prose">
        {/* CHAPTER 1 — Manila Opening */}
        <h2 id="ch1">Chapter 1 — The Way of Lightness (Manila Edition)</h2>
        <p className="dropcap">
          The plane dipped over Manila at golden hour. The city unrolled in grids and glints,
          jeepneys like beetles, laundry lines like festival flags. My bag sat under the seat:
          one shirt, one notebook, one pair of sandals, a toothbrush in a soft case. I had left
          behind everything that tugged like a small anchor. The air through the jetway wrapped
          around me — warm, busy, alive. Traveling light isn’t about austerity; it’s about removing
          what slows your attention.
        </p>
        <p>
          In the taxi, the driver’s playlist dissolved into traffic horns, vendors calling,
          and the metronome of lights. I noticed that with less to carry, my eyes carried more.
          Decisions got simpler: walk or wait; water or coffee; write or rest. The kit was small,
          but the day felt wide. Lightness is not emptiness; it is room — room to notice, to pivot,
          to say yes without negotiating with a suitcase.
        </p>
        <p>
          I wrote three lines in a notebook at a street stall table:
          “Pack for clarity. Move for breath. Keep one promise today.”
          That promise was a walk at sunrise. The first step of a rhythm is the shape of the whole.
          If you begin with weight, you carry it. If you begin with space, space follows.
        </p>

        <h3>Rituals That Reduce Friction</h3>
        <ul>
          <li>Morning pages — three lines to clear the channel.</li>
          <li>Five-minute mobility — oil the hinges before the day.</li>
          <li>Short zone-2 walk — the simplest engine you’ll ever own.</li>
        </ul>

        <blockquote>
          “Simplicity is a force multiplier. Remove what weakens your attention,
          and what remains becomes brighter.”
        </blockquote>

        {/* CHAPTER 2 — Stillness in Motion */}
        <h2 id="ch2">Chapter 2 — Stillness in Motion</h2>
        <p>
          Strength and softness are not enemies. Like water, you can hold form without hardening.
          Practice the basics with patience; mastery is repetition with awareness. Change arrives
          slowly, then all at once. The mind follows the body: move gently, consistently, and clarity
          tends to meet you halfway.
        </p>
        <p>
          There is a kind of discipline that feels like force, and a kind that feels like tide.
          Choose the tide. Set a small weight you can repeat, a distance you can return to, a breath
          you can count tonight. Lightness in motion is not the absence of effort; it is effort that
          fits your life so well it invites you back tomorrow.
        </p>

        <h3>Simple Training Framework</h3>
        <ol>
          <li>20–30 min strength basics, 3× / week.</li>
          <li>Zone-2 walks or rides for easy endurance.</li>
          <li>Evening breathwork (4–7–8) to close the loop.</li>
        </ol>

        <p className="leadout">
          Want the formatted version? Get the A5 PDF of Chapter 1 (Manila Edition), or subscribe to be
          notified when the full eBook launches in January 2026.
        </p>

        {/* CTA bas de page */}
        <div className="mt-10 flex flex-wrap gap-3">
          {/* Bouton Beehiiv retiré */}
          <a href={PDF_URL} className="btn btn-outline" target="_blank" rel="noreferrer">
            Download Free PDF
          </a>
          <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Get notified on Substack
          </a>
          <Link to="/ebook" className="btn btn-ghost">
            Go to eBook page
          </Link>
          <Link to="/" className="btn btn-ghost">
            Back to Home
          </Link>
        </div>
      </article>
    </main>
  )
}
