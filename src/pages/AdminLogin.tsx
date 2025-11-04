// src/pages/AdminLogin.tsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AdminLogin() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // ✅ Efface toute session précédente à chaque ouverture de la page
  useEffect(() => {
    sessionStorage.removeItem("admin_ok")
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      sessionStorage.setItem("admin_ok", "1")
      nav("/admin/dashboard")
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <main className="flex h-screen items-center justify-center bg-[var(--bg)]">
      <form
        onSubmit={handleLogin}
        className="w-[320px] p-6 rounded-xl border bg-[var(--surface)]"
        style={{ borderColor: "var(--border)" }}
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Admin Login</h1>

        <label className="text-sm text-muted">Email</label>
        <input
          type="email"
          required
          className="w-full mb-3 rounded-xl border px-3 py-2"
          style={{ borderColor: "var(--border)" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm text-muted">Password</label>
        <input
          type="password"
          required
          className="w-full mb-4 rounded-xl border px-3 py-2"
          style={{ borderColor: "var(--border)" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full">
          Sign in
        </button>
      </form>
    </main>
  )
}
