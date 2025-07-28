import type { TechniqueRank } from '../types/data/level-rank-types'

export const INITIAL_XP = 40

export const RANK_XP_INCREMENT: Record<TechniqueRank, number> = {
  iron: 3,
  bronze: 4,
  silver: 3,
  gold: 2,
  platinum: 1,
  diamond: 1,
  master: 1,
  sage: 1,
}

export const RANK_LEVEL_THRESHOLDS = [1, 10, 20, 35, 50, 70, 90, 110]

export const RANK_ORDER: TechniqueRank[] = [
  'iron',
  'bronze',
  'silver',
  'gold',
  'platinum',
  'diamond',
  'master',
  'sage',
]
