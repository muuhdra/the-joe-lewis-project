import Reveal from "./Reveal"
import { Link } from "react-router-dom"

export default function Wellness() {
  return (
    <section id="wellness" className="py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-9">

        {/* Titre */}
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Wellness / Fit &amp; Well
          </h2>
        </Reveal>

        {/* Carte de contenu */}
        <div
          className="mt-5 grid gap-4 lg:grid-cols-2 items-center rounded-3xl border p-6 md:p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* Texte */}
          <Reveal>
            <div className="text-muted">
              <h3 className="text-2xl md:text-[26px] font-semibold italic leading-snug"
                  style={{ color: "var(--text)" }}>
                “Wellness / Fit &amp; Well — Redefining the Modern Wellness Gym”
              </h3>

              <p className="mt-4 leading-relaxed">
                A unique ecosystem blending 12 proprietary modalities that address fitness, recovery,
                brain health, and longevity. Available only through consulting, this concept has been
                reshaped by over 40 years of experience in Asia’s wellness and fitness industry.
              </p>

              {/* Bullets */}
              <ul className="mt-6 space-y-3">
                {[
                  "Mind & Brain Optimization",
                  "Strength & Longevity Training",
                  "Rest & Recovery Experiences",
                  "Nutrition & Lifestyle Integration",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full"
                          style={{ background: "var(--accent)" }} />
                    <span className="font-semibold" style={{ color: "var(--text)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/wellness"
                  aria-label="Read the full Wellness / Fit & Well concept"
                  className="btn btn-primary"
                >
                  Read The Full Concept
                </Link>
                <Link to="/chat" className="btn btn-ghost" aria-label="Contact Joe about the concept">
                  Let’s Talk
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Image cliquable avec overlay */}
          <Reveal delay={0.08}>
            <Link
              to="/wellness"
              aria-label="Open Wellness / Fit & Well details"
              className="group relative block overflow-hidden rounded-2xl shadow-xl ring-1"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <img
                src="/image/wellness.png"
                alt="Strength and longevity training session"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Overlay subtil + badge */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-90" />
              <span className="pointer-events-none absolute bottom-4 left-4 rounded-xl bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur">
                Concept preview
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
