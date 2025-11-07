// src/components/NewsletterInline.tsx
const SUBSTACK_EMBED = "https://joelewis274.substack.com/embed"
const BEEHIIV_EMBED =
  import.meta.env.VITE_BEEHIIV_EMBED ??
  "https://subscribe-forms.beehiiv.com/37eb2d7c-aec6-41e7-89d4-23859dee059a"

export default function NewsletterInline() {
  return (
    <section className="py-2 text-center" style={{ background: "#0b2d42" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-white">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide">
          Stay Connected ✉️
        </h2>
        <p className="mt-2 text-base text-white/80">
          Choose your favorite platform — Substack or Beehiiv — to follow Joe’s latest insights & updates.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* SUBSTACK */}
          <div className="relative bg-white/10 rounded-lg p-2 shadow-md backdrop-blur border border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transform hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute -top-3 left-5 bg-[#ff6719] text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow">
              SUBSTACK
            </div>

            <div className="text-left mb-2">
              <h3 className="font-semibold text-base">Essays & Personal Letters</h3>
              <p className="text-white/70 text-xs">
                Read reflections, ideas & long-form stories from Joe.
              </p>
            </div>

            <iframe
              src={SUBSTACK_EMBED}
              width="100%"
              height="160"
              style={{
                border: "1px solid #ccc",
                background: "white",
                borderRadius: "10px",
              }}
              frameBorder="0"
              scrolling="no"
              title="Substack subscribe"
            />
            <p className="text-[10px] text-white/60 mt-2">Powered by Substack</p>
          </div>

          {/* BEEHIIV */}
          <div className="relative bg-white/10 rounded-lg p-2 shadow-md backdrop-blur border border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transform hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute -top-3 left-5 bg-[#f7d31b] text-black text-[10px] font-bold px-3 py-0.5 rounded-full shadow">
              BEEHIIV
            </div>

            <div className="text-left mb-2">
              <h3 className="font-semibold text-base">News & Launch Updates</h3>
              <p className="text-white/70 text-xs">
                Get early access to launches, eBooks, and special promos.
              </p>
            </div>

            <iframe
              src={BEEHIIV_EMBED}
              width="100%"
              height="160"
              style={{
                border: "1px solid #ccc",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 0 0 #0000",
                margin: "0",
              }}
              frameBorder="0"
              scrolling="no"
              title="Beehiiv subscribe"
              className="beehiiv-embed"
              data-test-id="beehiiv-embed"
            />
            <p className="text-[10px] text-white/60 mt-2">Powered by Beehiiv</p>
          </div>
        </div>
      </div>
    </section>
  )
}
