import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const SUBSTACK_URL = "https://joelewis274.substack.com"
const BEEHIIV_URL = "https://thejoelewisproject.beehiiv.com"
const RELEASE_LABEL = "Coming January 2026"
const UNLOCK_PATH = "/ebook/unlock"

export default function EbookPreviewPage() {
  const [progress, setProgress] = useState(0)

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

  const content: JSX.Element[] = useMemo(() => ([
    <h2 id="ch1" key="h2">Chapter 1 - The Way of Lightness</h2>,
    <span className="italic" key="span">
      “To move freely, one must first release what no longer serves the journey."
    </span>,
    <p className="dropcap" key="p1">
      The plane touched down in Manila just after sunset. Heat and humidity wrapped around
      me like an old memory dense, familiar, alive. As the cabin doors opened, that unmistakable
      scent of the tropics a mix of ocean air, diesel exhaust, and street food came rushing in.
      It was both chaos and comfort, a reminder that the world outside still pulsed with raw, unfiltered life.
    </p>,
    <p key="p2">
      I hadn’t returned in years. The airport had changed; I had changed even more.
      The terminal lights flickered through glass that reflected not just the city, but decades
      of motion arrivals, departures, reinventions. My single carry-on bag rolled quietly beside me.
      Traveling light wasn’t just a habit anymore; it was a declaration.
    </p>,
    <p key="p3">
      Outside, Manila hummed with rhythm jeepneys roaring, vendors calling, the scent of rain
      still clinging to the pavement. I watched people hurry past, each carrying their world on their shoulders
      some literal, some invisible. I used to be like that, mistaking motion for progress, weight for worth.
    </p>,
    <p key="p4">
      But years of movement had taught me a truth the modern world often forgets: the lighter you travel, the more you see.
    </p>,
    <p key="p5">
      The Samurai understood this centuries ago. They carried what they needed and no more. Their discipline wasn’t rooted
      in deprivation but in awareness a recognition that too much of anything possessions, pride, even certainty
      slows the blade and clouds the spirit.
    </p>,
    <p key="p6">
      Walking through the humid Manila night, I felt the same lesson stirring within me. Lightness
      was not about what I left behind, but what I carried forward: focus, integrity, purpose.
    </p>,
    <blockquote key="bq">
      The Way of Lightness begins here: not in a temple or a battlefield,
      but in the decision to strip away what dulls the edge of your attention.
    </blockquote>,
    <p key="p7">
      When you travel light, you see more clearly. You notice the pattern of raindrops on a taxi window,
      the laughter of children playing barefoot in an alley, the way the city never really sleeps.
      You also begin to notice the clutter within: the grudges, the fears, the stories that no longer fit.
    </p>,
    <p key="p8">
      I have come to believe that mastery, like travel, is an act of editing. The sword becomes sharper
      by what is removed, not by what is added. So too the spirit.
    </p>,
    <p key="p9">
      To live lightly is to live deliberately to move through the world with fewer things and fuller awareness.
      The first step is not to buy a ticket or pack a bag, but to ask a single question:
      <span className="italic">“What am I willing to release so that I can move forward with grace?”</span>
    </p>,
    <p key="p10">
      The Manila air was thick, the night alive. I smiled, adjusted the strap on my single bag,
      and stepped into the flow of traffic and humanity lighter, freer, ready for whatever came next.
    </p>,
    <p key="p11">The lighter the pack, the longer the journey. The quieter the mind, the deeper the wisdom.</p>,
    <p className="leadout" key="leadout">
      Want the formatted version? Subscribe on Substack or Beehiiv to unlock the A5 PDF of Chapter 1 (The Way of Lightness),
      and get notified when the full eBook launches in January 2026.
    </p>,
  ]), [])

  // --- Calcul : on ne montre que le premier tiers ---
  const cutoff = Math.max(1, Math.ceil(content.length / 3))
  const preview = content.slice(0, cutoff)

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
          <p className="mt-3 text-muted">One sample chapter. ~8-10 min read.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {/* 🔒 Pas de lien direct vers le PDF */}
            <Link to={UNLOCK_PATH} className="btn btn-ghost">Download Free PDF</Link>
            <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">Get notified on Substack</a>
            <a href={BEEHIIV_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">Get notified on Beehiiv</a>
            <Link to="/ebook" className="btn btn-primary">Go to eBook page</Link>
          </div>
        </div>
      </section>

      {/* Corps de lecture (prévisualisation + invitation) */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24 reading-prose">
        {/* 1) Aperçu : premier tiers */}
        {preview}

        {/* 2) Invitation fluide à continuer (funnel) */}
        <section
          className="mt-10 rounded-2xl border bg-[var(--surface)] p-6 sm:p-8 relative overflow-hidden"
          style={{ borderColor: "var(--border)" }}
          aria-labelledby="continue-title"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/60" />
          <h3 id="continue-title" className="relative font-display text-2xl sm:text-3xl font-bold">
            Continue the chapter with The Samurai Dispatch
          </h3>
          <p className="relative mt-2 text-muted">
            You’ve tasted the spirit of the book. Join the journey to keep reading and receive the formatted A5 PDF of Chapter 1.
          </p>

          <div className="relative mt-5 flex flex-wrap gap-3">
            <Link to={UNLOCK_PATH} className="btn btn-primary">Unlock the Free PDF</Link>
            <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">Subscribe on Substack</a>
            <a href={BEEHIIV_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">Subscribe on Beehiiv</a>
          </div>

          <p className="relative mt-3 text-xs text-muted">
            No spam. Unsubscribe anytime. Aligned with the Way of Lightness - give just enough, never too much.
          </p>
        </section>

        {/* 3) (Option) Garder le reste du chapitre en code mais non rendu */}
        {false && content.slice(cutoff)}
      </article>
    </main>
  )
}
