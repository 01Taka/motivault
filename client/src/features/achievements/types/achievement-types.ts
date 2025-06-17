export type AchievementBadgeRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'

export type TechniqueRank =
  | 'iron'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'master'
  | 'sage'

export interface TechniqueAchievementBadge {
  id: string
  title: string
  description: string
  rarity: AchievementBadgeRarity
}

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

export interface AchievementBadge {
  id: string
  getAt: string // ISO8601 日時文字列
}
