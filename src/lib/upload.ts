import { supabase } from "../lib/supabase"

async function uploadImageAndGetUrl(file: File, section: "blog"|"travel"|"newsletter", slug: string) {
  const ext = file.name.split(".").pop() || "jpg"
  const path = `${section}/${slug}/${Date.now()}.${ext}`

  const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (upErr) throw upErr

  const { data } = supabase.storage.from("media").getPublicUrl(path)
  return data.publicUrl
}
