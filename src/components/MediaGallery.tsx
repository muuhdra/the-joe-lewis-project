// src/components/MediaGallery.tsx
import { Media } from "../data/posts" // doit exporter le type Media (voir note plus bas)

type Props = { media?: Media[] }

/**
 * Galerie qui n'affiche QUE des images.
 * - Ignore les médias non "image" (ex: video)
 * - lazy-loading + decoding async
 * - figure + figcaption optionnelle
 */
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
