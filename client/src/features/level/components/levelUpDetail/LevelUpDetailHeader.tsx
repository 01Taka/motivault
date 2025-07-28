import React from 'react'
import { Typography, Stack } from '@mui/material'
import type { TechniqueRank } from '../../types/data/level-rank-types'
import RankDisplay from '../rank/RankDisplay'
import LevelDisplay from './LevelDisplay'

interface LevelUpDetailHeaderProps {
  title: string
  rank: TechniqueRank
  level: number
  textColor: string
  dividerColor: string
}

const LevelUpDetailHeader: React.FC<LevelUpDetailHeaderProps> = ({
  title,
  rank,
  level,
  textColor,
  dividerColor,
}) => (
  <>
    <Typography variant="h5" fontWeight="bold" color={textColor}>
      {title}
    </Typography>

    <Stack alignItems="center" mt={2}>
      <RankDisplay
        rank={rank}
        textColor={textColor}
        dividerColor={dividerColor}
      />
      <LevelDisplay level={level} color={textColor} />
    </Stack>
  </>
)

export default LevelUpDetailHeader
