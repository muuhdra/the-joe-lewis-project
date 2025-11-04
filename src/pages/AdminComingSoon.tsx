import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ComingItem, getAllComing, upsertComing, removeComing } from "../data/comingSoonStore"

export default function AdminComingSoon() {
  const nav = useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem("admin_ok") !== "1" && localStorage.getItem("admin") !== "true") {
      nav("/admin")
    }
  }, [nav])

  const [items, setItems] = useState<ComingItem[]>(getAllComing())
  const [draft, setDraft] = useState<ComingItem>({ id: "", title: "", desc: "" })

  function saveDraft(e: React.FormEvent) {
    e.preventDefault()
    if (!draft.id || !draft.title) return
    upsertComing(draft)
    setItems(getAllComing())
    setDraft({ id: "", title: "", desc: "" })
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-3xl font-bold">Manage “Coming soon”</h1>

        <div className="mt-6 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-2 border-b" style={{ borderColor: "var(--border)" }}>
                <th>ID</th><th>Title</th><th>ETA</th><th>Progress</th><th>Active</th><th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id} className="[&>td]:px-4 [&>td]:py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                  <td>{it.id}</td>
                  <td>{it.title}</td>
                  <td>{it.eta}</td>
                  <td>{it.progress ?? 0}%</td>
                  <td>{it.active === false ? "No" : "Yes"}</td>
                  <td className="text-right">
                    <button className="btn btn-ghost" onClick={() => { removeComing(it.id); setItems(getAllComing()) }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted">No items.</td></tr>}
            </tbody>
          </table>
        </div>

        <form onSubmit={saveDraft} className="mt-8 grid gap-3 rounded-2xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <h2 className="text-lg font-semibold">Create / Edit item</h2>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted">ID *</label>
              <input className="w-full rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)" }}
                     value={draft.id} onChange={e => setDraft({ ...draft, id: e.target.value })} placeholder="newsletter" required />
            </div>
            <div>
              <label className="text-sm text-muted">Title *</label>
              <input className="w-full rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)" }}
                     value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted">Description</label>
            <input className="w-full rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)" }}
                   value={draft.desc} onChange={e => setDraft({ ...draft, desc: e.target.value })} />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-muted">ETA</label>
              <input className="w-full rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)" }}
                     value={draft.eta || ""} onChange={e => setDraft({ ...draft, eta: e.target.value })} placeholder="ETA: December" />
            </div>
            <div>
              <label className="text-sm text-muted">Progress (%)</label>
              <input type="number" min={0} max={100} className="w-full rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)" }}
                     value={draft.progress ?? 0} onChange={e => setDraft({ ...draft, progress: Number(e.target.value) })} />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" checked={draft.active !== false} onChange={e => setDraft({ ...draft, active: e.target.checked })} />
                Active
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn btn-ghost" type="button" onClick={() => setDraft({ id: "", title: "", desc: "" })}>Reset</button>
          </div>
        </form>
      </section>
    </main>
  )
}
