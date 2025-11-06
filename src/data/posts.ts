// src/data/posts.ts

// --- Types ---
export type Media = {
  kind: "image"
  url: string
  caption?: string
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  image: string
  category: "Blog"
  author: string
  readingTime: string
  media?: Media[]
}

// --- Seed data (vide au départ) ---
/**
 * Le tableau est volontairement vide.
 * Tous les articles du blog sont désormais gérés dynamiquement via Supabase
 * et l’Admin Dashboard, donc aucun contenu statique n’est nécessaire ici.
 */
export const blogPosts: BlogPost[] = []
