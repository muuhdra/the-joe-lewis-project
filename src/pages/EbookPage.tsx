import { Link } from "react-router-dom"

const SUBSTACK_URL = "https://joelewis274.substack.com"
const RELEASE_LABEL = "Coming January 2026"
const PDF_URL = "/downloads/samurai-ch1.pdf" // dépose le PDF dans /public/downloads/

export default function EbookPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
      {/* HERO */}
      <header className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            {RELEASE_LABEL}
          </div>

          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
            The Samurai Who Traveled Light
          </h1>
          <p className="mt-2 text-lg italic text-muted">By Joe Lewis</p>
          <p className="mt-6 text-base leading-relaxed text-muted">
            A journey into modern Bushido, stillness, and the way of walking free.
            This book blends timeless principles with practical frameworks for living
            lighter — in body, mind, and schedule.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Link to="/ebook/preview" className="btn btn-ghost">
              Read Free Preview
            </Link>

            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Download Free PDF
            </a>

            <button
              type="button"
              aria-disabled
              className="btn btn-primary opacity-60 cursor-not-allowed"
              title={RELEASE_LABEL}
            >
              Full eBook • {RELEASE_LABEL}
            </button>

            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Get notified on Substack
            </a>
          </div>
        </div>

        <div className="order-first md:order-last relative">
          <img
            src="/image/LeSamurai.png"
            alt="eBook cover"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
          <span className="absolute top-3 right-3 rounded-full bg-[var(--accent)] text-[var(--bg)] px-3 py-1 text-xs font-semibold shadow">
            {RELEASE_LABEL}
          </span>
        </div>
      </header>

      {/* SOMMAIRE + PREVIEW LINKS */}
      <section className="mt-16 grid md:grid-cols-2 gap-8">
        <div
          className="rounded-2xl border p-6 bg-[var(--surface)]"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 className="text-xl font-semibold">Table of Contents</h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-muted">
            <li>Part I — The Way of Simplicity</li>
            <li>Part II — Traveling Light in Body &amp; Mind</li>
            <li>Part III — Stillness in Movement</li>
            <li>Part IV — A Modern Bushido</li>
            <li>Appendix — Minimal kits, rituals, and prompts</li>
          </ul>
        </div>

        <div
          className="rounded-2xl border p-6 bg-[var(--surface)]"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 className="text-xl font-semibold">Free Preview (1 chapter)</h2>
          <p className="mt-2 text-sm text-muted">
            Enjoy one chapter while the full eBook is being finalized.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/ebook/preview#ch1"
              className="rounded-xl border p-4 hover:bg-white/5 transition"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="text-sm font-semibold">Chapter 1</div>
              <div className="text-muted text-sm">The Way of Less</div>
            </Link>

            {/* Free PDF card — Beehiiv unlock retiré, on garde le download direct */}
            <div
              className="rounded-xl border p-4 hover:bg-white/5 transition text-left"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="text-sm font-semibold">Free PDF</div>
              <div className="text-muted text-sm">Chapter 1 (The Way of Lightness)</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={PDF_URL}
                  className="btn btn-ghost btn-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted">
            Prefer a downloadable version? Get the formatted PDF of Chapter 1 (A5 mobile-first).
          </div>
        </div>
      </section>

      {/* EXCERPT */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold">Excerpt</h2>
        <div
          className="mt-4 rounded-2xl border p-6 bg-[var(--surface)]"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-muted leading-relaxed">
            “To travel light is to choose what carries you forward. Tools become fewer, 
            but each has a greater purpose. You don’t chase more; you refine what matters.”
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/ebook/preview" className="btn btn-ghost">
            Read the excerpt
          </Link>

          <a
            href={PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Download Free PDF
          </a>

          <button
            type="button"
            aria-disabled
            className="btn btn-primary opacity-60 cursor-not-allowed"
            title={RELEASE_LABEL}
          >
            Full eBook • {RELEASE_LABEL}
          </button>

          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Get notified on Substack
          </a>
        </div>
      </section>
    </main>
  )
}
