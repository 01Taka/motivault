// store/techniqueXPStore.ts
import { create } from 'zustand'
import { getLevelInfo } from '../../features/achievementsSystem/functions/level-utils'
import type { TechniqueLevelInfo } from '../../features/achievements/types/achievement-types'

type XpMap = Record<string, number>
type LevelInfoMap = Record<string, TechniqueLevelInfo>

interface TechniqueXpStore {
  xpMap: XpMap
  levelInfoMap: LevelInfoMap
  isInitialized: boolean
  setXp: (xpMap: XpMap) => void
  updateXp: (techniqueId: string, value: number) => void
}

const convertToLevelInfoMap = (xpMap: XpMap): LevelInfoMap => {
  return Object.fromEntries(
    Object.entries(xpMap).map(([id, xp]) => [id, getLevelInfo(xp)])
  )
}

export const useTechniqueXPStore = create<TechniqueXpStore>((set, get) => ({
  xpMap: {},
  levelInfoMap: {},
  isInitialized: false,

  setXp: (xpMap) => {
    const levelInfoMap = convertToLevelInfoMap(xpMap)
    set({ xpMap, levelInfoMap })
  },
  updateXp: (techniqueId: string, value: number) => {
    const updatedXpMap = { ...get().xpMap, [techniqueId]: value }
    const levelInfoMap = convertToLevelInfoMap(updatedXpMap)
    set({ xpMap: updatedXpMap, levelInfoMap })
  },
}))

// interface LevelUpModal {
//   techniqueId: string
//   levelUpAt: number
//   prevExp: number
//   newExp: number
//   unlockedAchievementIds: string[]
// }

// interface LevelInfoMapStore {
//   modalQueue: LevelUpModal[]
// }
