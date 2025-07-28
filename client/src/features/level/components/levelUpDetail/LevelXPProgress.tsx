import React from 'react'
import { Box, Typography, Stack, LinearProgress } from '@mui/material'

interface LevelXPProgressProps {
  backgroundColor: string
  boxShadowColor: string
  xp: number
  nextLevelXP: number
  isAnimating?: boolean
  staticNextLevelXP?: number
  staticXP?: number
}

const LevelXPProgress: React.FC<LevelXPProgressProps> = ({
  backgroundColor,
  boxShadowColor,
  xp,
  nextLevelXP,
  isAnimating,
  staticNextLevelXP,
  staticXP,
}) => {
  const displayXP = isAnimating ? xp : (staticXP ?? xp)
  const levelUpXP = isAnimating
    ? nextLevelXP
    : (staticNextLevelXP ?? nextLevelXP)
  const progress = Math.min((displayXP / levelUpXP) * 100, 100)
  const remaining = levelUpXP - displayXP

  return (
    <Stack width="100%">
      <Typography variant="body2">
        XP: {Math.floor(displayXP)} / {levelUpXP}
      </Typography>

      <Box
        width="100%"
        position="relative"
        mt={0.5}
        height={8}
        borderRadius={4}
        overflow="hidden"
      >
        {/* ベースバー */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: '100%',
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: backgroundColor,
              boxShadow: boxShadowColor
                ? `0 0 4px ${boxShadowColor}`
                : undefined,
              transition: 'width 0.4s ease-out',
            },
          }}
        />
      </Box>

      <Typography variant="caption" color="text.secondary">
        あと {Math.max(0, Math.floor(remaining))} XP
      </Typography>
    </Stack>
  )
}

export default LevelXPProgress
