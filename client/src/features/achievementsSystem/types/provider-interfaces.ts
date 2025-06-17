export interface TechniqueXPProvider {
  incrementXP: (techniqueId: string, value: number) => void
  getXP: (techniqueId: string) => number
  getAllXP: () => Record<string, number>
}

export interface XpProvider {
  incrementXp: (id: string, amount: number) => Promise<void>
  addAchievementBadges: (id: string, badgeIds: string[]) => Promise<void>
}
