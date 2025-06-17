import type { AchievementBadgeRarity } from '../types/achievement-types'

export const badgeStyleMap: Record<
  AchievementBadgeRarity,
  {
    border: string
    background: string
    glow: string
    color: string
  }
> = {
  common: {
    border: '#B0BEC5', // Blue Grey 200
    background: '#ECEFF1', // Blue Grey 50
    glow: 'rgba(176, 190, 197, 0.3)',
    color: '#455A64', // Blue Grey 700
  },
  uncommon: {
    border: '#4CAF50', // Green 500
    background: '#E8F5E9', // Green 50
    glow: 'rgba(76, 175, 80, 0.3)',
    color: '#2E7D32', // Green 800
  },
  rare: {
    border: '#2196F3', // Blue 500
    background: '#E3F2FD', // Blue 50
    glow: 'rgba(33, 150, 243, 0.3)',
    color: '#1565C0', // Blue 800
  },
  epic: {
    border: '#9C27B0', // Purple 500
    background: '#F3E5F5', // Purple 50
    glow: 'rgba(156, 39, 176, 0.35)',
    color: '#6A1B9A', // Purple 800
  },
  legendary: {
    border: '#FFC107', // Amber 500
    background: '#FFF8E1', // Amber 50
    glow: 'rgba(255, 193, 7, 0.4)',
    color: '#FF6F00', // Amber 800
  },
}
