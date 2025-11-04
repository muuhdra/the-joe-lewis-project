// src/components/admin/AdminNewsletterBlock.tsx
import { useEffect, useMemo, useRef, useState } from "react"
import { supabase } from "../../lib/supabase"
import {
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
  type Subscriber,
} from "../../data/newsletterStore"

type Status = { kind: "idle" | "saving" | "error" | "ok"; msg?: string }

const emailRe =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AdminNewsletterBlock() {
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [query, setQuery] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [loading, setLoading] = useState(true)
  const debounce = useRef<number | null>(null)

  // Load + realtime
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const list = await getSubscribers()
        if (!alive) return
        setSubs(list)
      } finally {
        setLoading(false)
      }
    })()
    // Supabase realtime (INSERT/DELETE)
    const channel = supabase
      .channel("newsletter-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "newsletter" },
        (payload) => {
          setSubs((prev) => {
            if (payload.eventType === "INSERT") {
              const row = payload.new as any
              // include id to satisfy Subscriber type
              if (prev.some((s) => s.email === row.email)) return prev
              return [
                ...prev,
                { id: row.id, email: row.email, created_at: row.created_at },
              ].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
            }
            if (payload.eventType === "DELETE") {
              const row = payload.old as any
              // filter by id if present, else fallback to email
              if (row?.id) return prev.filter((s) => s.id !== row.id)
              return prev.filter((s) => s.email !== row.email)
            }
            return prev
          })
        }
      )
      .subscribe()
    return () => {
      alive = false
      supabase.removeChannel(channel)
    }
  }, [])

  // Helpers
  const exists = (e: string) =>
    subs.some((s) => s.email.toLowerCase() === e.toLowerCase())

  async function addNow(raw: string) {
    const e = raw.trim().toLowerCase()
    if (!e || !emailRe.test(e)) {
      setStatus({ kind: "error", msg: "Invalid email address." })
      return
    }
    if (exists(e)) {
      setStatus({ kind: "error", msg: "Email already in the list." })
      return
    }
    try {
      setStatus({ kind: "saving", msg: "Adding…" })
      await addSubscriber(e)
      setStatus({ kind: "ok", msg: "Subscriber added." })
      setEmail("")
    } catch (err: any) {
      setStatus({ kind: "error", msg: err?.message ?? "Failed to add." })
    } finally {
      // clear toast after a moment
      window.setTimeout(() => setStatus({ kind: "idle" }), 2000)
    }
  }

  // Auto-add on valid email (700 ms pause)
  useEffect(() => {
    if (debounce.current) window.clearTimeout(debounce.current)
    if (!email.trim()) return
    if (!emailRe.test(email.trim())) return
    debounce.current = window.setTimeout(() => addNow(email), 700) as any
    return () => {
      if (debounce.current) window.clearTimeout(debounce.current)
    }
  }, [email])

  // Manual add (Enter / blur / button, pour accessibilité)
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addNow(email)
    }
  }
  function onBlur() {
    if (emailRe.test(email.trim())) addNow(email)
  }

  async function remove(email: string) {
    if (!confirm(`Delete subscriber "${email}" ?`)) return
    try {
      await deleteSubscriber(email)
      // La liste se mettra à jour via realtime.
    } catch (err: any) {
      setStatus({ kind: "error", msg: err?.message ?? "Delete failed." })
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = [...subs].sort((a, b) =>
      a.created_at < b.created_at ? 1 : -1
    )
    if (!q) return base
    return base.filter((s) => s.email.toLowerCase().includes(q))
  }, [subs, query])

  function toCSV(rows: Subscriber[]) {
    const header = "email,created_at\n"
    const body = rows
      .map((r) => `${r.email},${r.created_at}`)
      .join("\n")
    return header + body
  }

  function exportCSV() {
    const blob = new Blob([toCSV(filtered)], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "newsletter.csv"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  async function copyAll() {
    const text = filtered.map((s) => s.email).join(", ")
    await navigator.clipboard.writeText(text)
    setStatus({ kind: "ok", msg: "Emails copied to clipboard." })
    window.setTimeout(() => setStatus({ kind: "idle" }), 1500)
  }

  return (
    <div className="rounded-2xl border" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
           style={{ borderBottom: `1px solid var(--border)`, background: "var(--surface)" }}>
        <div className="font-semibold">
          Newsletter subscribers
          <span className="ml-2 text-muted text-sm">
            ({filtered.length}/{subs.length})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="rounded-xl border px-3 py-1.5 text-sm"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            placeholder="Search email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-ghost" onClick={copyAll}>Copy emails</button>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-2 border-b"
                style={{ borderColor: "var(--border)" }}>
              <th>Email</th>
              <th>Created</th>
              <th className="w-24 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted">
                  No subscribers yet.
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.email}
                  className="[&>td]:px-4 [&>td]:py-2 border-b last:border-b-0"
                  style={{ borderColor: "var(--border)" }}>
                <td className="font-medium">{s.email}</td>
                <td>{new Date(s.created_at).toLocaleString()}</td>
                <td className="text-right">
                  <button className="btn btn-ghost" onClick={() => remove(s.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auto-add input row */}
      <div className="px-4 py-3"
           style={{ borderTop: `1px solid var(--border)`, background: "var(--surface)" }}>
        <div className="flex items-center gap-2">
          <input
            className="w-full rounded-xl border px-3 py-2"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            placeholder="Type an email — it will be added automatically…"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setStatus({ kind: "idle" })
            }}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            inputMode="email"
          />
          <button className="btn btn-primary" onClick={() => addNow(email)}>
            Add
          </button>
        </div>

        {/* status / toast */}
        {status.kind !== "idle" && (
          <div className="mt-2 text-sm">
            {status.kind === "saving" && <span className="text-muted">{status.msg}</span>}
            {status.kind === "ok" && <span style={{ color: "var(--accent)" }}>{status.msg}</span>}
            {status.kind === "error" && <span className="text-red-600">{status.msg}</span>}
          </div>
        )}

        <p className="mt-2 text-xs text-muted">
          Tip: Paste a list like <i>a@x.com, b@y.com</i> — each valid address will be added one by one (auto-add).
        </p>
      </div>
    </div>
  )
}
