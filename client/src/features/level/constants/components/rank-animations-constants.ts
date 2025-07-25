import type { RankAnimationSetting } from '../../types/components/rank-animation-types'
import type { TechniqueRank } from '../../types/data/level-rank-types'

export const rankAnimations: Partial<
  Record<TechniqueRank, RankAnimationSetting>
> = {
  platinum: {
    animate: { opacity: [0.9, 1, 0.9], scale: [1, 1.04, 1] },
    transition: { duration: 2, repeat: Infinity },
  },
  diamond: {
    animate: { rotate: [0, 2, -2, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  master: {
    animate: { scale: [1, 1.08, 1], opacity: [1, 0.8, 1] },
    transition: { duration: 1.5, repeat: Infinity },
  },
  sage: {
    animate: {
      y: [0, -2, -1],
      scale: [1, 1.1, 1],
      rotate: [-0.5, -4, -2],
      filter: [
        'drop-shadow(0 0 2px rgba(255, 80, 80, 0.8))',
        'drop-shadow(0 0 4px rgba(255, 100, 100, 1))',
        'drop-shadow(0 0 3px rgba(255, 60, 60, 0.9))',
      ],
    },
    transition: {
      duration: 1.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
} as const
