import { useEffect, useRef } from "react"

type Props = {
  src: string
  alt?: string
  open: boolean
  onClose: () => void
}

export default function Lightbox({ src, alt, open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="backdrop:bg-black/70 p-0 rounded-2xl overflow-hidden"
      onClose={onClose}
      onClick={(e) => {
        // fermer si click en dehors de l’image
        const rect = (e.target as HTMLDialogElement).getBoundingClientRect()
        const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
        if (!inside) onClose()
      }}
    >
      <img src={src} alt={alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
    </dialog>
  )
}
