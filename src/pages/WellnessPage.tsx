import { Link } from "react-router-dom"
import Reveal from "../components/Reveal"

export default function WellnessPage() {
  return (
    <main style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[300px] w-full overflow-hidden">
        <img
          src="/image/coverWellness.png"
          alt="Wellness hero banner with calm fitness atmosphere"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Wellness / Fit &amp; Well
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <h2 className="text-2xl font-semibold italic" style={{ color: "var(--text)" }}>
            “Wellness / Fit &amp; Well — Redefining the Modern Wellness Gym”
          </h2>
          <p className="mt-3 text-lg leading-7 text-muted">
            A unique ecosystem blending 12 proprietary modalities that address fitness, recovery,
            brain health, and longevity. Available only through consulting, this concept has been
            shaped by over 40 years of experience in Asia’s wellness and fitness industry.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-5 space-y-4">
            <ul className="mt-3 space-y-2">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                <span><strong style={{ color: "var(--text)" }}>Mind &amp; Brain Optimization</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                <span><strong style={{ color: "var(--text)" }}>Strength &amp; Longevity Training</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                <span><strong style={{ color: "var(--text)" }}>Rest &amp; Recovery Experiences</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                <span><strong style={{ color: "var(--text)" }}>Nutrition &amp; Lifestyle Integration</strong></span>
              </li>
            </ul>

            <blockquote className="border-l-4 pl-4 text-muted/90">
              Full details of the 12 modalities are shared exclusively with consulting clients.
            </blockquote>

            <p className="mt-3 text-lg leading-7 text-muted italic">
              “Wellness / Fit &amp; Well is not just a gym — it’s a holistic approach to health. A space
              where fitness, recovery, and mindful living come together under one roof.”
            </p>
          </ul>

          {/* Deux visuels côte à côte */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src="/image/image1.png"
              alt="Concept diagram: mind & brain, strength and recovery integration"
              loading="lazy"
              decoding="async"
              className="w-full h-[300px] object-contain rounded-lg shadow-md bg-white/80 p-2"
            />
            <img
              src="/image/image2.png"
              alt="Concept diagram: nutrition & lifestyle integration"
              loading="lazy"
              decoding="async"
              className="w-full h-[300px] object-contain rounded-lg shadow-md bg-white/80 p-2"
            />
          </div>

          <ul className="mt-5 space-y-2">
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
              <span><span style={{ color: "var(--text)" }}>Combines</span><strong> fitness + wellness</strong><span> therapies in one package.</span></span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
              <span><span style={{ color: "var(--text)" }}>Adaptable model for</span><strong> urban spaces, resorts, and boutique studios.</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
              <span><span style={{ color: "var(--text)" }}>Focus on</span><strong> longevity and holistic health.</strong></span>
            </li>
          </ul>

          <p className="mt-3 text-lg leading-7 text-muted italic">
            "When you partner with Joe Lewis, you’ll receive tailored consulting on layout, program
            design, and business strategy to bring this vision to life."
          </p>

          <img
            src="/image/image3.png"
            alt="Program layout sketch illustrating spaces for strength, recovery and mindfulness"
            loading="lazy"
            decoding="async"
            className="w-full h-[280px] object-contain rounded-lg p-4"
          />
        </Reveal>

        <div className="mt-12 flex gap-3">
          <Link to="/" className="btn btn-ghost" aria-label="Back to homepage">
            Back Home
          </Link>
          <Link to="/chat" className="btn btn-primary" aria-label="Discuss the Wellness concept with us">
            Let’s Talk
          </Link>
        </div>
      </section>
    </main>
  )
}
