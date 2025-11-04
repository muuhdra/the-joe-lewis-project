// src/components/LetsChat.tsx
import Reveal from "./Reveal"
import ContactForm from "./ContactForm"

export default function LetsChat() {
  return (
    <section id="chat" className="py-2" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
        {/* Intro */}
        <Reveal>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Let’s Chat</h2>
            <p className="mt-3 text-[var(--ink)]/85 max-w-prose text-[1.05rem] leading-7">
              Have questions about wellness, travel, or the project? I’d love to hear from you.
              Send me a note and I’ll get back to you soon.
            </p>

            {/* Helpful bullets */}
            <ul className="mt-6 space-y-3 text-[var(--ink)]/70">
              <li>• Typical reply within 24h</li>
              <li>• Consulting available for wellness concepts & gym design</li>
              <li>• Collaboration & partnerships welcome</li>
            </ul>
          </div>
        </Reveal>

        {/* Form panel — stronger visual presence */}
        <Reveal delay={0.08}>
          <div
            className="rounded-2xl border shadow-sm"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            <div className="border-b px-5 lg:px-6 py-4" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-semibold text-[var(--ink)]">Send me a message</h3>
              <p className="text-sm text-[var(--ink)]/60">I usually answer within a day.</p>
            </div>

            <div className="p-5 lg:p-6">
              {/* emphasize => styles plus visibles */}
              <ContactForm emphasize />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
