// src/pages/FreeChapterLanding.tsx
import { Link } from "react-router-dom"
import cover from "/image/LeSamurai.png"

// 🔧 A remplir :
const BEEHIIV_EMBED = "https://embeds.beehiiv.com/xxxxxxxx?slim=true" // ton embed Beehiiv
const PDF_URL = "/downloads/samurai-ch1.pdf" // endroit où tu déposeras le PDF final
const RELEASE_LABEL = "Full eBook • Coming January 2026"

export default function FreeChapterLanding() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
      {/* HERO */}
      <header className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            {RELEASE_LABEL}
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold leading-tight">
            Free Chapter 1 — The Way of Lightness <span className="text-muted">(Manila Edition)</span>
          </h1>
          <p className="mt-3 text-muted">
            Get the formatted PDF of Chapter 1 while the full eBook is being finalized.
            You can subscribe on Beehiiv to be redirected to the download,
            or grab the PDF directly below.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#beehiiv"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById("beehiiv")
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
            >
              Unlock via Beehiiv
            </a>
            <a href={PDF_URL} className="btn btn-ghost" target="_blank" rel="noreferrer">
              Download PDF directly
            </a>
            <Link to="/ebook" className="btn btn-ghost">Back to eBook page</Link>
          </div>
        </div>

        <div className="order-first md:order-last">
          <img
            src={cover}
            alt="eBook cover"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>
      </header>

      {/* 2 cartes : Beehiiv + Infos PDF */}
      <section className="mt-14 grid md:grid-cols-2 gap-8">
        {/* Beehiiv */}
        <div id="beehiiv" className="rounded-2xl border p-6 bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-semibold">Subscribe on Beehiiv</h2>
          <p className="mt-2 text-sm text-muted">
            Join Joe’s newsletter for launches & updates. After subscribing, you’ll be redirected to the PDF.
          </p>
          <div className="mt-4">
            <iframe
              src={BEEHIIV_EMBED}
              width="100%"
              height="160"
              style={{ border: "1px solid #ccc", background: "white", borderRadius: "12px" }}
              frameBorder="0"
              scrolling="no"
              title="Beehiiv subscribe"
            ></iframe>
            <p className="text-xs text-muted mt-2">Make sure your Beehiiv “After signup” redirect points to {PDF_URL}</p>
          </div>
        </div>

        {/* PDF direct + notes */}
        <div className="rounded-2xl border p-6 bg-[var(--surface)]" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-semibold">Download the PDF</h2>
          <p className="mt-2 text-sm text-muted">
            A5, mobile-first layout, centered headers, subtle bronze watermark, and clickable links.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={PDF_URL} className="btn btn-ghost" target="_blank" rel="noreferrer">
              Download PDF
            </a>
            <Link to="/ebook/preview#ch1" className="btn btn-ghost">
              Read Chapter 1 online
            </Link>
          </div>
          <ul className="mt-5 space-y-1 text-sm text-muted">
            <li>• Edition: <em>Manila Opening</em></li>
            <li>• Footer: © 2025 Joe Lewis — The Joe Lewis Project</li>
            <li>• Links: website & Beehiiv included in PDF</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
