import type { TechniqueRank } from './data/level-rank-types'

export interface TechniqueLevelInfo {
  currentLevel: number
  currentLevelXp: number
  nextLevelXp: number
  nextLevelTotalXp: number
  rank: TechniqueRank
}

export interface XPAnimationSegment {
  startXP?: number
  endXP?: number
  nextLevelXP: number
  level: number
  rank: TechniqueRank
}
