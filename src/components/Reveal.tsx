import { useEffect, useRef, useState, PropsWithChildren } from "react"

type Props = PropsWithChildren<{ delay?: number; y?: number; once?: boolean }>


export default function Reveal({ children, delay = 0, y = 24, once = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay * 1000)
            if (once) io.disconnect()
          } else if (!once) {
            setShown(false)
          }
        })
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [delay, once])

  return (
    <div
      ref={ref}
      style={{
        transition: "opacity .6s ease, transform .6s ease",
        transform: shown ? "translateY(0px)" : `translateY(${y}px)`,
        opacity: shown ? 1 : 0,
      }}
    >
      {children}
    </div>
  )
}
