import type { TechniqueRank } from '../types/achievement-types'

export const rankStyles: Record<
  TechniqueRank,
  {
    lightColor: string
    color: string
    barColor: string
    background?: string
    glow?: string
  }
> = {
  iron: {
    lightColor: '#9e9e9e',
    color: '#616161',
    barColor: '#bdbdbd',
    background: '#f5f5f5',
    glow: '#e0e0e0',
  },
  bronze: {
    lightColor: '#8d6e63',
    color: '#5d4037',
    barColor: '#a1887f',
    background: '#fdf9f7',
  },
  silver: {
    lightColor: '#90a4ae',
    color: '#607d8b',
    barColor: '#b0bec5',
    background: '#f8fbfc',
  },
  gold: {
    lightColor: '#fbc02d',
    color: '#f9a825',
    barColor: '#ffd54f',
    background: '#fffdf3',
  },
  platinum: {
    lightColor: '#4dd0e1',
    color: '#00acc1',
    barColor: '#4dd0e1',
    glow: '#b2ebf2',
    background: '#f3fcfd',
  },
  diamond: {
    lightColor: '#1565c0',
    color: '#0d47a1',
    barColor: '#1976d2',
    glow: '#90caf9',
    background: '#f1f7fd',
  },
  master: {
    lightColor: '#9c27b0',
    color: '#6a1b9a',
    barColor: '#ce93d8',
    glow: '#e1bee7',
    background: '#fbf5fc',
  },
  sage: {
    lightColor: '#f44336',
    color: '#c62828',
    barColor: '#ef9a9a',
    glow: '#ffcdd2',
    background: '#fef5f5',
  },
} as const
