// components/RankIcon.tsx
import React from 'react'
import { useTheme, type SxProps } from '@mui/material'
import type { TechniqueRank } from '../../types/data/level-rank-types'
import { RANK_ICON_MAP } from '../../constants/components/rank-icons'
import { getRankColor } from '../../../../functions/theme/rank-color-utils'

interface RankIconProps {
  rank: TechniqueRank
  sx?: SxProps
}

const RankIcon: React.FC<RankIconProps> = ({ rank, sx }) => {
  const IconComponent = RANK_ICON_MAP[rank]

  const { palette } = useTheme()
  const rankColor = getRankColor(rank, palette)

  if (!IconComponent) {
    return null
  }

  return <IconComponent sx={{ color: rankColor?.light, ...sx }} />
}

export default RankIcon
