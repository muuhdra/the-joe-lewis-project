import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function scrollToId(hash: string) {
  const id = hash.replace("#", "")
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function isActive(href: string, pathname: string) {
  if (href === "/blog") return pathname.startsWith("/blog")
  if (href === "/wellness") return pathname.startsWith("/wellness")
  if (href === "/travel") return pathname.startsWith("/travel")
  if (href === "/ebook") return pathname.startsWith("/ebook")
  if (href === "/about") return pathname.startsWith("/about")
  if (href === "/chat") return pathname.startsWith("/chat")
  if (href.startsWith("#")) return false
  return pathname === href
}

const socials = [
  { name: "Bluesky",   href: "https://bsky.app/profile/thejoelewisproject.bsky.social", icon: "/image/bluesky.png" },
  { name: "Pinterest", href: "https://www.pinterest.com/1bulinb3rolefxsjc097171lep9ybz/?actingBusinessId=1044624213476167398", icon: "/image/pinterest-logo.png" },
  { name: "Facebook",  href: "https://www.facebook.com/profile.php?id=61581964299844", icon: "/image/facebook.png" },
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/joefitasia/", icon: "/image/linkedin.png" },
  { name: "Twitter",   href: "https://x.com/lewis1393497", icon: "/image/x.png" },
  { name: "Threads",   href: "https://www.threads.com/@joefitasia", icon: "/image/threads.png" },
  { name: "Instagram", href: "https://instagram.com/joelewis134", icon: "/image/instagram.png" },
] as const

export default function Navbar() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/ebook", label: "eBook" },
    { href: "/blog", label: "Blog" },
    { href: "/wellness", label: "Wellness" },
    { href: "/travel", label: "Travel" },
    { href: "/chat", label: "Let’s Chat" },
  ]

  function handleNav(href: string) {
    const isHash = href.startsWith("#")

    if (href === "/" && pathname === "/") {
      scrollToTop()
      setOpen(false)
      return
    }

    if (isHash) {
      if (pathname !== "/") {
        nav("/", { replace: false })
        setTimeout(() => scrollToId(href), 50)
      } else {
        scrollToId(href)
      }
    } else {
      nav(href)
    }
    setOpen(false)
  }

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const linkClass = (href: string) =>
    isActive(href, pathname)
      ? "rounded-full bg-[var(--accent)] text-white px-3 py-1 font-medium"
      : "px-3 py-1 text-muted hover:text-[var(--ink)]"

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--bg-alt)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 py-2">
          {/* Burger */}
          <button
            className="md:hidden rounded-xl border p-2 hover:bg-black/5 transition-colors"
            style={{ borderColor: "var(--border)" }}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>

          {/* Logo + title */}
          <button
            onClick={() => handleNav("/")}
            className="mx-auto flex flex-col items-center text-center"
            aria-label="Go to home"
          >
            <img
              src="/image/logo.png"
              alt="logo"
              className="h-14 md:h-16 object-contain mb-0.5"
              width={64} height={64}
              decoding="async" fetchPriority="high"
            />
            <span className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
              The Joe Lewis Project
            </span>
          </button>

          {/* Socials (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-3">
            {socials.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.name}
                aria-label={s.name}
                className="inline-flex"
              >
                <img
                  src={s.icon}
                  alt={s.name}
                  className="h-5 w-5 object-contain hover:opacity-80 transition"
                  width={20} height={20}
                  loading="lazy" decoding="async"
                />
                <span className="sr-only">{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center justify-center gap-4 pb-2">
          {links.map((l, i) => (
            <div key={l.href} className="flex items-center">
              <button onClick={() => handleNav(l.href)} className={linkClass(l.href)}>
                {l.label}
              </button>
              {i < links.length - 1 && (
                <span className="mx-3 h-5 w-px" style={{ background: "var(--border)" }} />
              )}
            </div>
          ))}
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t" style={{ borderColor: "var(--border)" }}>
            <div className="px-4 py-3 space-y-3">
              {/* Socials (mobile) */}
              <div className="flex items-center gap-4">
                {socials.map(s => (
                  <a
                    key={`m-${s.name}`}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.name}
                    aria-label={s.name}
                    className="inline-flex"
                  >
                    <img
                      src={s.icon}
                      alt={s.name}
                      className="h-5 w-5 object-contain hover:opacity-80 transition"
                      width={20} height={20}
                      loading="lazy" decoding="async"
                    />
                    <span className="sr-only">{s.name}</span>
                  </a>
                ))}
              </div>

              {/* Links */}
              <div className="grid gap-1">
                {links.map(l => (
                  <button
                    key={l.href}
                    onClick={() => handleNav(l.href)}
                    className={`${linkClass(l.href)} text-left`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
