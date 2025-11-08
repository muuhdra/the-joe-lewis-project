import { Link } from "react-router-dom"

const SUBSTACK_URL = "https://joelewis274.substack.com"
const BEEHIIV_URL  = "https://thejoelewisproject.beehiiv.com"

export default function UnlockPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="font-display text-3xl sm:text-4xl font-bold">
        Unlock Chapter 1
      </h1>

      <p className="mt-3 text-muted">
        Subscribe to one of Joe Lewis’ newsletters to receive a free PDF download of Chapter 1.
        You’ll get the download link directly in your inbox.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

        {/* 🔸 SUBSTACK BUTTON (orange) */}
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-5 py-2.5 text-sm font-semibold shadow border transition transform hover:-translate-y-0.5"
          style={{
            background: "#ff6719",
            color: "#fff",
            borderColor: "rgba(255,255,255,.2)",
          }}
        >
          Subscribe via Substack
        </a>

        {/* 🟡 BEEHIIV BUTTON (jaune) */}
        <a
          href={BEEHIIV_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-5 py-2.5 text-sm font-semibold shadow border transition transform hover:-translate-y-0.5"
          style={{
            background: "#f7d31b",
            color: "#111",
            borderColor: "rgba(0,0,0,.15)",
          }}
        >
          Subscribe via Beehiiv
        </a>
      </div>

      <p className="mt-5 text-xs text-muted">
        Once subscribed, check your welcome email for the download link.
      </p>

      <div className="mt-10">
        <Link to="/ebook" className="btn btn-primary">
          ← Go back to eBook page
        </Link>
      </div>
    </main>
  )
}
