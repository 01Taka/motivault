import { useXpAchievementStore } from '../../../stores/achievement/xpAchievementStore'
import type { XpProvider } from '../types/provider-interfaces'

export const useXpAchievement = (provider: XpProvider) => {
  const { entries, clearXpCache, clearBadgeCache, clearEntry } =
    useXpAchievementStore()

  const applyCache = async (id: string) => {
    try {
      if (entries[id].xp > 0) {
        await provider.incrementXp(id, entries[id].xp)
      }

      const badges = entries[id].badges
      if (badges.length > 0) {
        await provider.addAchievementBadges(
          id,
          badges.map((b) => b.id)
        )
      }

      clearEntry(id)
    } catch (err) {
      console.error('applyCache failed:', err)
    }
  }

  // XPだけ適用
  const applyXpOnly = async (id: string) => {
    try {
      if (entries[id].xp > 0) {
        await provider.incrementXp(id, entries[id].xp)
        clearXpCache(id)
      }
    } catch (err) {
      console.error('applyXpOnly failed:', err)
    }
  }

  // Badgeだけ適用
  const applyBadgesOnly = async (id: string) => {
    try {
      const badges = entries[id].badges
      if (badges.length > 0) {
        await provider.addAchievementBadges(
          id,
          badges.map((b) => b.id)
        )
        clearBadgeCache(id)
      }
    } catch (err) {
      console.error('applyBadgesOnly failed:', err)
    }
  }

  return {
    entries,
    applyCache,
    applyXpOnly,
    applyBadgesOnly,
  }
}
