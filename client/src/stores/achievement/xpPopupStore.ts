import { create } from 'zustand'
import type { AchievementBadge } from '../../features/achievements/types/achievement-types'

interface XpPopupData {
  id: string
  title: string
  startXp: number
  endXp: number
  badges: AchievementBadge[]
}

interface XpPopupStore {
  isOpen: boolean
  popupData: XpPopupData | null

  lastShowedXp: number
  showedBadgeIds: string[]

  openModal: (data: XpPopupData) => void
  closeModal: () => void
  reset: () => void

  setLastShowedXp: (xp: number) => void
  addShowedBadgeId: (id: string) => void
  setShowedBadgeIds: (ids: string[]) => void
}

export const useXpPopupStore = create<XpPopupStore>((set) => ({
  isOpen: false,
  popupData: null,

  lastShowedXp: 0,
  showedBadgeIds: [],

  openModal: (data) =>
    set({
      popupData: data,
      isOpen: true,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      popupData: null,
    }),

  reset: () =>
    set({
      lastShowedXp: 0,
      showedBadgeIds: [],
    }),

  setLastShowedXp: (xp) => set({ lastShowedXp: xp }),

  addShowedBadgeId: (id) =>
    set((state) => ({
      showedBadgeIds: Array.from(new Set([...state.showedBadgeIds, id])),
    })),

  setShowedBadgeIds: (ids) => set({ showedBadgeIds: Array.from(new Set(ids)) }),
}))
