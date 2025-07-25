// constants/rankIcons.ts
import {
  Shield,
  MilitaryTech,
  AutoAwesome,
  Diamond,
  EmojiEmotions,
  EmojiEvents,
  TipsAndUpdates,
  WorkspacePremium,
} from '@mui/icons-material'
import type { TechniqueRank } from '../../types/data/level-rank-types'
import type { ElementType } from 'react'

export const RANK_ICON_MAP: Record<TechniqueRank, ElementType> = {
  iron: Shield,
  bronze: MilitaryTech,
  silver: EmojiEvents,
  gold: WorkspacePremium,
  platinum: Diamond,
  diamond: AutoAwesome,
  master: EmojiEmotions,
  sage: TipsAndUpdates,
} as const
