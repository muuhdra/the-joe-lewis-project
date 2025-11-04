// src/data/ebookStore.ts
import { supabase } from "../lib/supabase"

export type Ebook = {
  id?: string
  slug: string
  title: string
  excerpt?: string
  cover_image?: string
  file_url?: string
  price?: number
  author?: string
  date: string

  // UI-only (non persistés tant que les colonnes n'existent pas côté DB)
  release_date?: string
  status?: "coming_soon" | "available"
}

function mapRow(r: any): Ebook {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    cover_image: r.cover_image ?? "",
    file_url: r.file_url ?? "",
    price: Number(r.price ?? 0),
    author: r.author ?? "Joe Lewis",
    date: r.date,
  }
}

/** PUBLIC */
export async function getEbooks(): Promise<Ebook[]> {
  const { data, error } = await supabase
    .from("ebooks")
    .select("*")
    .order("date", { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapRow)
}

/** ADMIN upsert/delete */
export async function upsertEbook(eb: Partial<Ebook>) {
  if (!eb.slug || !eb.title) throw new Error("Title & slug requis")
  const payload = {
    slug: eb.slug,
    title: eb.title,
    excerpt: eb.excerpt ?? "",
    cover_image: eb.cover_image ?? "",
    file_url: eb.file_url ?? "",
    price: eb.price ?? 0,
    author: eb.author ?? "Joe Lewis",
    date: eb.date ?? new Date().toISOString(),
  }
  const { error } = await supabase.from("ebooks").upsert(payload, {
    onConflict: "slug",
  })
  if (error) throw error
}

export async function deleteEbook(slug: string) {
  const { error } = await supabase.from("ebooks").delete().eq("slug", slug)
  if (error) throw error
}
