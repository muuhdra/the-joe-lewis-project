
import { supabase } from "../lib/supabase"

export type Section = "blog" | "travel"
export type Category = string

export type Post = {
  id?: string
  section: Section
  slug: string
  title: string
  excerpt?: string
  content?: string
  image?: string
  video_url?: string
  is_draft: boolean
  date: string
  category: Category
  reading_time?: string
  author?: string
}

export type DraftPost = Omit<Post, "is_draft" | "date" | "section"> & {
  isDraft?: boolean
  date?: string
  section?: Section
}

// map DB -> UI
function mapRow(r: any): Post {
  return {
    id: r.id,
    section: r.section,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    content: r.content ?? "",
    image: r.image ?? "",
    video_url: r.video_url ?? "",
    is_draft: !!r.is_draft,
    date: r.date,
    category: r.category ?? "Travel",
    reading_time: r.reading_time ?? "",
    author: r.author ?? "Joe Lewis",
  }
}

/* ========= PUBLIC LISTS (publié = pas brouillon & date <= now) ========= */
export async function getBlogPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("section", "blog")
    .eq("is_draft", false)
    .lte("date", new Date().toISOString())
    .order("date", { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapRow)
}

export async function getTravelPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("section", "travel")
    .eq("is_draft", false)
    .lte("date", new Date().toISOString())
    .order("date", { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapRow)
}

/* ================= PUBLIC BY SLUG (wrapper générique) ================== */
export async function getPostBySlug(
  section: Section,
  slug: string
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("section", section)
    .eq("slug", slug)
    .eq("is_draft", false)
    .lte("date", new Date().toISOString())
    .limit(1)
    .maybeSingle()

  if (error && error.code !== "PGRST116") throw error
  return data ? mapRow(data) : null
}

// Helpers attendus par tes pages :
export const getBlogPostBySlug = (slug: string) => getPostBySlug("blog", slug)
export const getTravelPostBySlug = (slug: string) => getPostBySlug("travel", slug)

/* ============================ ADMIN (tout voir) ============================ */
export async function adminGetPosts(section: Section): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("section", section)
    .order("date", { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapRow)
}

/* ============================ UPSERT / DELETE ============================= */
export async function upsertPost(draft: DraftPost) {
  if (!draft.slug || !draft.title) throw new Error("Title & slug requis")

  const payload = {
    section: draft.section ?? "blog",
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt ?? "",
    content: draft.content ?? "",
    image: draft.image ?? "",
    video_url: (draft as any).videoUrl ?? draft.video_url ?? "",
    is_draft: !!draft.isDraft,
    date: draft.date || new Date().toISOString(),
    category: (draft as any).category ?? "Travel",
    reading_time: (draft as any).reading_time ?? "",
    author: draft.author ?? "Joe Lewis",
  }

  const { error } = await supabase
    .from("posts")
    .upsert(payload, { onConflict: "section,slug" })
  if (error) throw error
}

export async function deletePost(slug: string, section: Section) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("slug", slug)
    .eq("section", section)
  if (error) throw error
}
