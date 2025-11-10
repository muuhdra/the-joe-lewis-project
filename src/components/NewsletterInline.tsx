// src/components/NewsletterInline.tsx
export default function NewsletterInline() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value
    if (!email) return
    window.open(
      `https://thejoelewisproject.beehiiv.com/?email=${encodeURIComponent(email)}`,
      "_blank"
    )
  }

  return (
    <section className="py-2 text-center" style={{ background: "#0b2d42" }}>
      <div className="mx-auto max-w-3xl px-4 text-white">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide">
          Stay Connected to our Newsletter
        </h2>
        <p className="mt-2 text-base text-white/80">
          Subscribe to <strong>The Samurai Dispatch</strong> - weekly notes on
          <em> discipline, purpose, and lightness.</em>
        </p>

        {/* BEEHIIV SECTION */}
        <div className="mt-3 bg-white rounded-2xl py-10 px-6 sm:px-12 text-gray-900 shadow-lg max-w-2xl mx-auto">
          <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            The Samurai Dispatch
          </h3>
          <p className="mt-2 text-lg sm:text-xl text-gray-500">
            Discipline. Purpose. Lightness
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full sm:w-2/3 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b2d42]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-[#0b2d42] text-white font-medium px-6 py-3 hover:bg-[#143d56] transition"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-400">
            Powered by Beehiiv · No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
