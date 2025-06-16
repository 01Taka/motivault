import React from 'react'
import { Typography, Stack } from '@mui/material'
import type { TechniqueRank } from '../types/achievement-types'
import { LevelDisplay } from './LevelDisplay'
import { RankDisplay } from './RankDisplay'

interface AchievementHeaderProps {
  title: string
  rank: TechniqueRank
  level: number
  style: {
    color: string
    lightColor: string
  }
}

export const AchievementHeader: React.FC<AchievementHeaderProps> = ({
  title,
  rank,
  level,
  style,
}) => (
  <>
    <Typography variant="h5" fontWeight="bold" color={style.color}>
      {title}
    </Typography>

    <Stack alignItems="center" mt={2}>
      <RankDisplay rank={rank} style={style} />
      <LevelDisplay level={level} color={style.color} />
    </Stack>
  </>
)
