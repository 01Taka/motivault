import React from 'react'
import { Paper } from '@mui/material'
import { rankStyles } from '../constants/rank-styles-constants'
import { AchievementHeader } from './AchievementHeader'
import { AchievementXPProgress } from './AchievementXPProgress'
import { AchievementBadgeGrid } from './AchievementBadgeGrid'
import type {
  TechniqueRank,
  TechniqueAchievementBadge,
} from '../types/achievement-types'

interface AchievementDetailViewProps {
  currentLevel: number
  currentRank: TechniqueRank
  currentXP: number
  nextLevelXp: number
  title: string
  badges: TechniqueAchievementBadge[]
  isAnimating?: boolean
}

const AchievementDetailView: React.FC<AchievementDetailViewProps> = ({
  currentLevel,
  currentRank,
  currentXP,
  nextLevelXp,
  title,
  badges,
  isAnimating,
}) => {
  const style = rankStyles[currentRank]

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        maxWidth: 480,
        mx: 'auto',
        backgroundColor: '#fff',
        minWidth: '60vw',
        minHeight: '60vh',
        maxHeight: '85vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: style.background,
      }}
    >
      <AchievementHeader
        title={title}
        level={currentLevel}
        rank={currentRank}
        style={style}
      />
      <AchievementXPProgress
        xp={currentXP}
        nextLevelXP={nextLevelXp}
        rankStyle={style}
        isAnimating={isAnimating}
      />
      <AchievementBadgeGrid badges={badges} />
    </Paper>
  )
}

export default AchievementDetailView
