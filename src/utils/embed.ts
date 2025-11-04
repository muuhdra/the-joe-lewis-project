// src/utils/embed.ts
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    // YouTube
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v")
      if (v) return `https://www.youtube.com/embed/${v}`
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}`
    }
    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
    return null
  } catch {
    return null
  }
}
