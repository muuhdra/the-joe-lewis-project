import Reveal from "./Reveal"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Carte légère pour mieux cadrer la zone et réduire les vides */}
        <div
          className="rounded-xl border p-6 md:p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {/* ↓ gap réduit sur grand écran */}
          <div className="grid lg:grid-cols-2 items-center gap-6 md:gap-8 lg:gap-6">
            {/* Colonne texte */}
            <Reveal>
              <div className="lg:pr-4">
                <p className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded-full"
                   style={{ background: "var(--chip)", color: "var(--text)" }}>
                  About
                </p>

                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                  Meet Joe
                </h2>

                <p className="mt-4 text-muted">
                  Joe Lewis — Writer. Explorer. Wellness Warrior. U.S. Marine Corps Force Recon Warrior.
                </p>

                <p className="mt-4 text-muted">
                  A Hawaii surfer boy, with salt water in my veins and a love for freedom in my heart.
                  At eight years old, I survived the devastating 1957 Ruskin Heights, Missouri tornado —
                  an early reminder of both the fragility of life and the resilience within us.
                </p>

                <ul className="mt-6 space-y-2 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                    <span>40+ years building wellness & fitness concepts across Asia</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                    <span>Author of <em>The Samurai Who Traveled Light</em></span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/about" className="btn btn-primary">Read about Joe</Link>
                  <Link to="/chat" className="btn btn-ghost">Let’s chat</Link>
                </div>
              </div>
            </Reveal>

            {/* Colonne image */}
            <Reveal delay={0.08}>
              {/* ↓ On retire le surplus d’espace en supprimant le wrapper centré
                     et en limitant la largeur de l’image plutôt que d’imposer un grand conteneur */}
              <div className="flex lg:justify-end">
                <img
                  src="/image/joe.png"
                  alt="Portrait of Joe Lewis"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-sm aspect-[3/4] rounded-2xl object-cover shadow-xl ring-1"
                  style={{ background: "var(--bg-alt)" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
