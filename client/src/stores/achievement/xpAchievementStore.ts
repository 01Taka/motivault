import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AchievementBadge } from '../../features/achievements/types/achievement-types'

interface XpAchievement {
  id: string
  xp: number
  badges: AchievementBadge[]
}

type XpAchievementMap = Record<string, XpAchievement>

interface XpAchievementState {
  entries: XpAchievementMap

  incrementXp: (id: string, amount: number) => void
  clearXpCache: (id: string) => void
  addBadges: (id: string, badges: AchievementBadge[]) => void
  clearBadgeCache: (id: string) => void
  getBadges: (id: string) => AchievementBadge[]
  removeBadge: (id: string, badgeId: string) => void

  clearEntry: (id: string) => void
  resetAll: () => void
}

export const useXpAchievementStore = create(
  persist<XpAchievementState>(
    (set, get) => ({
      entries: {},

      incrementXp: (id, amount) =>
        set((state) => {
          const entry = state.entries[id] || { id, xp: 0, badges: [] }
          return {
            entries: {
              ...state.entries,
              [id]: { ...entry, xp: entry.xp + amount },
            },
          }
        }),

      clearXpCache: (id) =>
        set((state) => {
          const entry = state.entries[id] || { id, xp: 0, badges: [] }

          return {
            entries: {
              ...state.entries,
              [id]: { ...entry, xp: 0 },
            },
          }
        }),

      addBadges: (id, badges) =>
        set((state) => {
          const entry = state.entries[id] || { id, xp: 0, badges: [] }
          const badgeMap = new Map(entry.badges.map((b) => [b.id, b]))
          badges.forEach((b) => badgeMap.set(b.id, b))
          return {
            entries: {
              ...state.entries,
              [id]: { ...entry, badges: Array.from(badgeMap.values()) },
            },
          }
        }),

      clearBadgeCache: (id) =>
        set((state) => {
          const entry = state.entries[id] || { id, xp: 0, badges: [] }

          return {
            entries: {
              ...state.entries,
              [id]: { ...entry, badges: [] },
            },
          }
        }),

      getBadges: (id) => get().entries[id]?.badges || [],

      removeBadge: (id, badgeId) =>
        set((state) => {
          const entry = state.entries[id]
          if (!entry) return state
          return {
            entries: {
              ...state.entries,
              [id]: {
                ...entry,
                badges: entry.badges.filter((b) => b.id !== badgeId),
              },
            },
          }
        }),

      clearEntry: (id) =>
        set((state) => {
          const updated = { ...state.entries }
          delete updated[id]
          return { entries: updated }
        }),

      resetAll: () => set({ entries: {} }),
    }),
    {
      name: 'xp-achievement-storage',
    }
  )
)
