export interface TechniqueAchievementBadge {
  id: string
  title: string
  description: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
}

export type TechniqueRank =
  | 'iron'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'master'
  | 'sage'

export interface TechniqueLevelInfo {
  currentLevel: number
  currentLevelXp: number
  nextLevelXp: number
  nextLevelTotalXp: number
  rank: TechniqueRank
}

export interface TechniqueXPProvider {
  incrementXP: (techniqueId: string, value: number) => void
  getXP: (techniqueId: string) => number
  getAllXP: () => Record<string, number>
}

export interface XPAnimationSegment {
  startXP?: number
  endXP?: number
  nextLevelXP: number
  level: number
  rank: TechniqueRank
}
