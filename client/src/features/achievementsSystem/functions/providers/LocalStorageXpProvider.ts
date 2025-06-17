import type { XpProvider } from '../../types/provider-interfaces'

const STORAGE_KEY = 'xp_data'

interface StoredEntry {
  xp: number
  badgeIds: string[]
}

type StoredData = Record<string, StoredEntry>

function loadData(): StoredData {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? (JSON.parse(raw) as StoredData) : {}
}

function saveData(data: StoredData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export class LocalStorageXpProvider implements XpProvider {
  async incrementXp(id: string, amount: number): Promise<void> {
    const data = loadData()
    const current = data[id] || { xp: 0, badgeIds: [] }
    current.xp += amount
    data[id] = current
    saveData(data)
    console.log(`[LocalStorageXpProvider] [${id}] XP updated to ${current.xp}`)
  }

  async addAchievementBadges(id: string, badgeIds: string[]): Promise<void> {
    const data = loadData()
    const current = data[id] || { xp: 0, badgeIds: [] }
    current.badgeIds = Array.from(new Set([...current.badgeIds, ...badgeIds]))
    data[id] = current
    saveData(data)
    console.log(
      `[LocalStorageXpProvider] [${id}] Badges updated:`,
      current.badgeIds
    )
  }

  getCurrentXp(id: string): number {
    const data = loadData()
    return data[id]?.xp ?? 0
  }

  getBadgeIds(id: string): string[] {
    const data = loadData()
    return data[id]?.badgeIds ?? []
  }

  clear(id: string): void {
    const data = loadData()
    delete data[id]
    saveData(data)
    console.log(`[LocalStorageXpProvider] [${id}] data cleared`)
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY)
    console.log('[LocalStorageXpProvider] All data cleared')
  }
}
