import { supabase } from "../lib/supabase"

/** nettoie un morceau de chemin pour éviter les erreurs de clé (espaces, apostrophes, etc.) */
function cleanPart(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9/_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Upload une image dans le bucket `images` et renvoie l’URL publique.
 * @param file  Fichier image
 * @param folder  'posts' | 'ebooks' | 'newsletter'…
 * @param slug   slug de l’élément (sera nettoyé)
 */
export async function uploadImageAndGetUrl(
  file: File,
  folder: string,
  slug: string
): Promise<string> {
  const folderSafe = cleanPart(folder || "misc")
  const slugSafe = cleanPart(slug || "item")
  const ts = Date.now()
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const path = `${folderSafe}/${slugSafe}-${ts}.${ext}`

  const { error } = await supabase.storage.from("images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (error) throw error

  const { data: pub } = supabase.storage.from("images").getPublicUrl(path)
  return pub.publicUrl
}
