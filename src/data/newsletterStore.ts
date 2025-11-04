import { supabase } from "../lib/supabase"

export type Subscriber = { id: string; email: string; created_at: string }

export async function getSubscribers(): Promise<Subscriber[]> {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as Subscriber[]
}

export async function addSubscriber(email: string) {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email })
  if (error) throw error
}

export async function deleteSubscriber(email: string) {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("email", email)
  if (error) throw error
}
