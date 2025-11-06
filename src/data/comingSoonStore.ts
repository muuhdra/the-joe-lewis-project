
const KEY = "jlp_coming_v1"

export type ComingItem = {
  id: string
  title: string
  desc: string
  eta?: string
  progress?: number
  active?: boolean
}

const defaults: ComingItem[] = [
  { id: "newsletter", title: "Newsletter", desc: "Articles exclusifs, résumés mensuels.", eta: "ETA: October", progress: 75, active: true },
  { id: "meditation", title: "Meditation", desc: "Short audio guides.", eta: "ETA: November", progress: 50, active: true },
  { id: "ai-tools", title: "AI Tools & Affiliates", desc: "Selection of tools for creators.", eta: "ETA: Soon™", progress: 35, active: true },
]

function load(): ComingItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaults
    const arr: ComingItem[] = JSON.parse(raw)
    return Array.isArray(arr) && arr.length ? arr : defaults
  } catch {
    return defaults
  }
}

function save(list: ComingItem[]) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getComing(): ComingItem[] {
  return load().filter(x => x.active !== false)
}

export function getAllComing(): ComingItem[] {
  return load()
}

export function upsertComing(item: ComingItem) {
  const list = load()
  const idx = list.findIndex(x => x.id === item.id)
  if (idx >= 0) list[idx] = item
  else list.push(item)
  save(list)
}

export function removeComing(id: string) {
  const list = load().filter(x => x.id !== id)
  save(list)
}
