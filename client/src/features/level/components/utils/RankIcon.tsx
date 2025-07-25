// components/RankIcon.tsx
import React from 'react'
import type { SxProps } from '@mui/material'
import type { TechniqueRank } from '../../types/data/level-rank-types'
import { RANK_ICON_MAP } from '../../constants/components/rank-icons'

interface RankIconProps {
  rank: TechniqueRank
  sx?: SxProps
}

const RankIcon: React.FC<RankIconProps> = ({ rank, sx }) => {
  const IconComponent = RANK_ICON_MAP[rank]

  if (!IconComponent) {
    return null
  }

  return <IconComponent sx={sx} />
}

export default RankIcon
