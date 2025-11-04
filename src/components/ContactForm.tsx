// src/components/ContactForm.tsx
import { useState } from "react"

type Props = {
  compact?: boolean
  /** Make fields highly visible (white bg, stronger borders, clear focus) */
  emphasize?: boolean
}

export default function ContactForm({ compact, emphasize }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    try {
      setSending(true)
      // TODO: plug your API/Supabase function here
      await new Promise(r => setTimeout(r, 800))
      setDone(true)
      setName(""); setEmail(""); setMessage("")
      setTimeout(() => setDone(false), 2500)
    } finally {
      setSending(false)
    }
  }

  const baseInput =
    "w-full rounded-xl border px-3 py-2.5 transition outline-none placeholder-opacity-70"
  const subtle =
    "bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
  const strong =
    "bg-white text-[var(--ink)] border-[color:var(--border)] focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:var(--accent)]/18"

  const inputClass = `${baseInput} ${emphasize ? strong : subtle}`
  const labelClass = "block text-sm font-medium mb-1 text-[var(--ink)]"
  const row = compact ? "grid grid-cols-1 gap-3" : "grid grid-cols-1 md:grid-cols-2 gap-4"

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={row}>
        <div>
          <label className={labelClass}>Name *</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Your email"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          className={`${inputClass} min-h-[140px]`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me a bit about your project…"
          aria-label="Your message"
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={sending}
          className={`btn btn-primary ${sending ? "opacity-80" : ""}`}
          aria-label="Send message"
        >
          {sending ? "Sending…" : done ? "Sent ✓" : "Send message"}
        </button>

        <a
          className="btn"
          href={`mailto:joe@thejoelewisproject.com?subject=${encodeURIComponent("From – The Joe Lewis Project")}&body=${encodeURIComponent(message ? message : "")}`}
        >
          Use email app
        </a>

        {!emphasize && (
          <span className="text-xs text-[var(--ink)]/60">
            Tip: you can also write directly by email.
          </span>
        )}
      </div>
    </form>
  )
}
