
import { Media } from "../data/posts"

type Props = { media?: Media[] }


export default function MediaGallery({ media }: Props) {
  if (!media || media.length === 0) return null

  const images = media.filter(m => m.kind === "image")
  if (images.length === 0) return null

  return (
    <section className="mt-10 grid gap-6 sm:grid-cols-2">
      {images.map((m, i) => (
        <figure
          key={i}
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--border)" }}
        >
          <img
            src={m.url}
            alt={m.caption || `image-${i}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {m.caption && (
            <figcaption className="px-3 py-2 text-xs text-muted">
              {m.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </section>
  )
}
