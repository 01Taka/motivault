// src/achievements/constants/rank-icons.tsx
import React from 'react'
import {
  EmojiEvents,
  MilitaryTech,
  Shield,
  Diamond,
  WorkspacePremium,
  AutoAwesome,
  EmojiEmotions,
  TipsAndUpdates,
} from '@mui/icons-material'
import type { TechniqueRank } from '../types/achievement-types'
import type { SxProps } from '@mui/material'

export const rankIcons: Record<TechniqueRank, React.ReactElement> = {
  iron: <Shield />,
  bronze: <MilitaryTech />,
  silver: <EmojiEvents />,
  gold: <WorkspacePremium />,
  platinum: <Diamond />,
  diamond: <AutoAwesome />,
  master: <EmojiEmotions />,
  sage: <TipsAndUpdates />,
}

export const getRankIcon = (rank: TechniqueRank, sx?: SxProps) => {
  switch (rank) {
    case 'iron':
      return <Shield sx={sx} />
    case 'bronze':
      return <MilitaryTech sx={sx} />
    case 'silver':
      return <EmojiEvents sx={sx} />
    case 'gold':
      return <WorkspacePremium sx={sx} />
    case 'platinum':
      return <Diamond sx={sx} />
    case 'diamond':
      return <AutoAwesome sx={sx} />
    case 'master':
      return <EmojiEmotions sx={sx} />
    case 'sage':
      return <TipsAndUpdates sx={sx} />
    default:
      return null // Exhaustiveness fallback
  }
}
