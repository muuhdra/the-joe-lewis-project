// src/components/Ebook.tsx
import Reveal from "./Reveal"
import { Link } from "react-router-dom"

// 🔧 Remplace si besoin
const SUBSTACK_URL = "https://joelewis.substack.com"
const RELEASE_LABEL = "Coming January 2026"
const PDF_URL = "/downloads/samurai-ch1.pdf" // dépose le PDF dans /public/downloads/

export default function Ebook() {
  return (
    <section id="ebook" className="relative py-8" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">eBook</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative flex justify-center">
              <img
                src="/image/LeSamurai.png"
                alt="eBook cover"
                className="h-[450px] w-[320px] rounded-2xl object-cover shadow-lg"
              />
              {/* Badge Coming Soon */}
              <span className="absolute -top-3 -right-3 rounded-full bg-[var(--accent)] text-[var(--bg)] px-3 py-1 text-xs font-semibold shadow">
                {RELEASE_LABEL}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="text-muted">
              <h3 className="font-display text-4xl sm:text-4xl font-bold">
                The Samurai Who Traveled Light
              </h3>
              <p className="mt-1 italic">By Joe Lewis</p>
              <p className="mt-4 max-w-xl">
                Discover the Japanese concept of ikigai and learn how to find your true purpose
                in life. This guide blends ancient wisdom with modern psychology.
              </p>

              {/* Actions (Beehiiv unlock supprimé) */}
              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <Link to="/ebook/preview" className="btn btn-ghost">
                  Read Free Preview
                </Link>


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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
