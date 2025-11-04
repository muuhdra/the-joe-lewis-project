import Reveal from "../components/Reveal"
import ContactForm from "../components/ContactForm"

export default function LetsChatPage() {
  return (
    <main style={{ background: "var(--bg)" }}>
      {/* Hero compact */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Let’s Chat</h1>
            <p className="mt-3 text-[var(--ink)]/80 max-w-2xl">
              Have questions about wellness, travel, or the project? I’d love to hear from you.
              Send me a note and I’ll get back to you soon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Corps identique à la section, avec le formulaire mis en avant */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <div>
              <h2 className="font-semibold text-xl">How I can help</h2>
              <ul className="mt-4 space-y-3 text-[var(--ink)]/75">
                <li>• Typical reply within 24h</li>
                <li>• Consulting available for wellness concepts & gym design</li>
                <li>• Collaboration & partnerships welcome</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border shadow-sm bg-white"
                 style={{ borderColor: "var(--border)" }}>
              <div className="border-b px-5 lg:px-6 py-4" style={{ borderColor: "var(--border)" }}>
                <h3 className="font-semibold text-[var(--ink)]">Send me a message</h3>
                <p className="text-sm text-[var(--ink)]/60">I usually answer within a day.</p>
              </div>
              <div className="p-5 lg:p-6">
                {/* le composant existant, avec aspect renforcé */}
                <ContactForm emphasize />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
