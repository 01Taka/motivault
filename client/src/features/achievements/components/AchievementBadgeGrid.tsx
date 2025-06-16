import React from 'react'
import { Tooltip, Box, Typography, Grid2 } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { rarityStyles } from '../constants/rarity-styles-constants'
import { epicBadgeMotion } from '../constants/rarity-motion-constants'
import type { TechniqueAchievementBadge } from '../types/achievement-types'

interface AchievementBadgeGridProps {
  badges: TechniqueAchievementBadge[]
}

export const AchievementBadgeGrid: React.FC<AchievementBadgeGridProps> = ({
  badges,
}) => (
  <Box width="100%" mt={4}>
    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
      バッジ一覧
    </Typography>
    <Grid2 container spacing={1}>
      {badges.map((badge) => {
        const badgeStyle = rarityStyles[badge.rarity]
        const isEpic = badge.rarity === 'epic'
        const isLegendary = badge.rarity === 'legendary'

        const avatar = (
          <Box
            key={badge.id}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              ...badgeStyle,
              animation: isLegendary ? 'pulse 2s infinite' : undefined,
            }}
          >
            <EmojiEvents fontSize="inherit" />
          </Box>
        )

        return (
          <Grid2 key={badge.id}>
            <Tooltip
              title={
                <Box>
                  <Typography variant="subtitle2">{badge.title}</Typography>
                  <Typography variant="caption">{badge.description}</Typography>
                </Box>
              }
            >
              {isEpic ? (
                <motion.div {...epicBadgeMotion}>{avatar}</motion.div>
              ) : (
                avatar
              )}
            </Tooltip>
          </Grid2>
        )
      })}
    </Grid2>
    <style>
      {`
        @keyframes pulse {
          0% { box-shadow: 0 0 4px 1px rgba(255, 215, 0, 0.5); }
          50% { box-shadow: 0 0 8px 3px rgba(255, 215, 0, 0.8); }
          100% { box-shadow: 0 0 4px 1px rgba(255, 215, 0, 0.5); }
        }
      `}
    </style>
  </Box>
)
