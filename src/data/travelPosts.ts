// src/data/TravelPosts.ts

/**
 * Type pour un post de voyage (Travel)
 */
export type TravelPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  image: string
  category: "Travel"
  author: string
  readingTime: string
}

/**
 * Tableau vide — le contenu réel sera chargé depuis Supabase via l'Admin Dashboard.
 * Cette structure reste ici uniquement pour référence ou tests unitaires.
 */
export const travelPosts: TravelPost[] = []
