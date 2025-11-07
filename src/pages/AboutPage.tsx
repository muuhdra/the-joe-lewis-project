export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Portrait */}
        <div>
          <img
            src="/image/joe.png"
            alt="Joe Lewis"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Texte */}
        <div>
          <h1 className="font-display text-2xl font-bold mb-4">
            Hightlights & Philosophy
          </h1>
          <ul className="space-y-3 text-muted">
            <li>✦ Has traveled to more than 20+ countries</li>
            <li>✦ Passionate about Ikigai and Bushido</li>
            <li>✦ Wellness and minimalist travel coach</li>
          </ul>
          <p className="mt-4 text-muted">
            Joe Lewis - Writer. Explorer. Wellness Warrior. U.S. Marine Corps Force Recon Warrior.
          </p>

          <div className="mt-6">
            <a href="/chat" className="btn btn-primary">
              Contact Joe
            </a>
          </div>
        </div>
      </div>

      {/* Timeline / philosophie */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-24 reading-prose">
        <h2 className="font-display text-2xl font-bold mb-6">About Joe Lewis</h2>

        <div className="space-y-6 text-lg text-muted leading-relaxed">
          <p className="dropcap">
            A Hawaii surfer boy, with salt water in my veins and a love for freedom in my heart.
            At eight years old, I survived the devastating 1957 Ruskin Heights, Missouri tornado
            an early reminder of both the fragility of life and the resilience within us.
          </p>

          <p>
            In my late teens, I worked for Kaiser Hawaii Kai Development Company in Honolulu for two
            years while attending the University of Hawaii, before joining the United States Marine
            Corps Force Recon. Those years forged in me the discipline, courage, and clarity that would
            guide every step of my journey forward.
          </p>

          <p>
            After the Marines, I returned briefly to Honolulu and Kaiser Hawaii Kai Development Co.,
            until 1978 when I set my sights across the Pacific and into Asia. For more than 40 years I
            lived, worked, and built fitness and sports clubs from Jakarta to Singapore, Kuala Lumpur to
            Macau, Bangkok to Seoul, and finally Manila.
          </p>

          <p>
            Along the way, I explored the mountains of Nepal, the temples of Kyoto, and countless
            cultures, stories, and lessons that shaped both my personal and professional path.
          </p>

          <p>
            But my journey didn’t stop there. As a writer and storyteller, I created{" "}
            <span className="italic">"The Samurai Who Traveled Light"</span>, an eBook that blends Bushido values with
            modern wellness and simplicity. It is part memoir, part guide, and part philosophy for
            living with less weight, more clarity and deeper meaning.
          </p>

          <p>I continue to explore new frontiers:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Photography - capturing untold stories across Asia.</li>
            <li>
              AI Tools &amp; Affiliates - curating resources like Entrepedia to help entrepreneurs and
              creators thrive in today’s digital world.
            </li>
          </ul>

          <p>
            Through it all, I remain committed to a life guided by three values:
            <span className="font-semibold"> Discipline. Purpose. Lightness.</span>
          </p>
        </div>
      </article>
      <div className="mt-2 text-center">
            <a href="/chat" className="btn btn-primary">
              Contact Joe
            </a>
          </div>
    </main>
  )
}
