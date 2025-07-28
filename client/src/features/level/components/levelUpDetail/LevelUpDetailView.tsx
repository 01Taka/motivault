import React from 'react'
import { Paper, useTheme } from '@mui/material'
import type { TechniqueRank } from '../../types/data/level-rank-types'
import { getRankColor } from '../../../../functions/theme/rank-color-utils'
import LevelUpDetailHeader from './LevelUpDetailHeader'
import LevelXPProgress from './LevelXPProgress'

interface LevelUpDetailViewProps {
  currentLevel: number
  currentRank: TechniqueRank
  currentXP: number
  nextLevelXp: number
  title: string
  isAnimating?: boolean
}

const LevelUpDetailView: React.FC<LevelUpDetailViewProps> = ({
  currentLevel,
  currentRank,
  currentXP,
  nextLevelXp,
  title,
  isAnimating,
}) => {
  const { palette } = useTheme()
  const newRankColor = getRankColor(currentRank, palette)

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
        bgcolor: newRankColor?.background,
      }}
    >
      <LevelUpDetailHeader
        title={title}
        level={currentLevel}
        rank={currentRank}
        textColor={newRankColor?.light ?? ''}
        dividerColor={newRankColor?.border ?? ''}
      />
      <LevelXPProgress
        xp={currentXP}
        nextLevelXP={nextLevelXp}
        backgroundColor={newRankColor?.border ?? ''}
        boxShadowColor={newRankColor?.glow ?? ''}
        isAnimating={isAnimating}
      />
    </Paper>
  )
}

export default LevelUpDetailView
