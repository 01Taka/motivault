import type { TechniqueXPProvider } from '../../types/provider-interfaces'

const STORAGE_KEY = 'technique_xp'

const load = (): Record<string, number> => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}

const save = (data: Record<string, number>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const LocalStorageTechniqueXPProvider: TechniqueXPProvider = {
  incrementXP: (techniqueId, value) => {
    const xpData = load()
    xpData[techniqueId] = (xpData[techniqueId] || 0) + value
    save(xpData)
  },
  getXP: (techniqueId) => {
    const xpData = load()
    return xpData[techniqueId] || 0
  },
  getAllXP: () => load(),
}
