import type { SxProps } from '@mui/material'
import type { TechniqueAchievementBadge } from '../types/achievement-types'

export const rarityStyles: Record<
  TechniqueAchievementBadge['rarity'],
  SxProps
> = {
  common: {
    bgcolor: '#e0e0e0',
    color: '#5f6368',
  },
  uncommon: {
    bgcolor: '#a5d6a7',
    color: '#1b5e20',
  },
  rare: {
    bgcolor: '#90caf9',
    color: '#0d47a1',
  },
  epic: {
    bgcolor: '#ce93d8',
    color: '#6a1b9a',
  },
  legendary: {
    background: 'linear-gradient(135deg, #fafa50, #ffd600)',
    color: '#c79202',
    boxShadow: '0 0 8px 2px rgba(255, 215, 0, 0.7)',
    animation: 'pulse 2s infinite',
  },
}
