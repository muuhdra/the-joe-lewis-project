const BUY_URL = "https://your-store-link.example.com/joe-lewis-ebook" // ← On remplace par Stripe une fois prêt

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="font-display text-4xl sm:text-5xl font-bold">Buy the eBook</h1>
      <p className="mt-3 text-muted">
        Instant download (PDF). Lifetime updates included.
      </p>

      <div className="mt-8 rounded-2xl border p-6 bg-[var(--surface)]" style={{borderColor:"var(--border)"}}>
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">The Samurai Who Traveled Light</h2>
            <p className="text-muted mt-1">By Joe Lewis • 160+ pages • PDF</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">$19</div>
            <div className="text-xs text-muted">one-time</div>
          </div>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-muted">
          <li>• Practical frameworks for simple, durable habits</li>
          <li>• Strength, mobility, recovery, and travel kits</li>
          <li>• Appendix: packing lists, prompts, weekly plans</li>
          <li>• Free updates forever</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={BUY_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Proceed to purchase
          </a>
          <a href="/ebook/preview" className="btn btn-ghost">Read an excerpt</a>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        Secure payment handled by your store provider (Gumroad, Payhip, Stripe Checkout, etc.).
      </p>
    </main>
  )
}
