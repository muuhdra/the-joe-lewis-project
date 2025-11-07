import Reveal from "./Reveal"
import { Link } from "react-router-dom"

const SUBSTACK_URL = "https://joelewis274.substack.com"
const BEEHIIV_URL  = "https://thejoelewisproject.beehiiv.com"
const RELEASE_LABEL = "Coming January 2026"
const PDF_URL = "/downloads/samurai-ch1.pdf"

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
                width={320}
                height={450}
                loading="lazy"
                decoding="async"
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
                “The world keeps asking you to carry more, more plans, more noise, more weight.
                But the Samurai’s strength was never in how much he held, but in how much he could release.
                To travel light is to remember that freedom begins not on the road, but in the mind.”
              </p>

              {/* Actions */}
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

                {/* Nouveau bouton Beehiiv (jaune) */}
                <a
                  href={BEEHIIV_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold shadow
                             border hover:opacity-90 transition"
                  style={{
                    background: "#f7d31b",
                    color: "#111",
                    borderColor: "rgba(0,0,0,.1)"
                  }}
                >
                  Get notified on Beehiiv
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
