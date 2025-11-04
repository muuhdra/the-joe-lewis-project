// src/components/NewsletterInline.tsx

const SUBSTACK_EMBED = "https://joelewis274.substack.com/embed" // 🔁 ton vrai lien Substack
const BEEHIIV_EMBED  = "https://embeds.beehiiv.com/xxxxxxxx?slim=true" // 🔁 ton vrai lien Beehiiv

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

        {/* Cartes Substack + Beehiiv */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* SUBSTACK */}
          <div
            className="relative bg-white/10 rounded-xl p-4 shadow-lg backdrop-blur hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] 
                       transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
          >
            <div className="absolute -top-4 left-6 bg-[#ff6719] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              SUBSTACK
            </div>

            <div className="text-left mb-3">
              <h3 className="font-semibold text-lg">Essays & Personal Letters</h3>
              <p className="text-white/70 text-sm">Read reflections, ideas & long-form stories from Joe.</p>
            </div>

            <iframe
              src={SUBSTACK_EMBED}
              width="100%"
              height="160"
              style={{
                border: "1px solid #ccc",
                background: "white",
                borderRadius: "14px",
              }}
              frameBorder="0"
              scrolling="no"
              title="Substack subscribe"
            ></iframe>

            <p className="text-xs text-white/60 mt-3">Powered by Substack</p>
          </div>

          {/* BEEHIIV */}
          <div
            className="relative bg-white/10 rounded-xl p-4 shadow-lg backdrop-blur hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] 
                       transform hover:-translate-y-1 transition-all duration-300 border border-white/10"
          >
            <div className="absolute -top-4 left-6 bg-[#f7d31b] text-black text-xs font-bold px-3 py-1 rounded-full shadow">
              BEEHIIV
            </div>

            <div className="text-left mb-3">
              <h3 className="font-semibold text-lg">News & Launch Updates</h3>
              <p className="text-white/70 text-sm">Get early access to launches, eBooks, and special promos.</p>
            </div>

            <iframe
              src={BEEHIIV_EMBED}
              width="100%"
              height="160"
              style={{
                border: "1px solid #ccc",
                background: "white",
                borderRadius: "14px",
              }}
              frameBorder="0"
              scrolling="no"
              title="Beehiiv subscribe"
            ></iframe>

            <p className="text-xs text-white/60 mt-3">Powered by Beehiiv</p>
          </div>
        </div>
      </div>
    </section>
  )
}
