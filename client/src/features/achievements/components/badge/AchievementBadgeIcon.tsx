import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

interface AchievementBadgeIconProps {
  icon: React.ReactNode
  isUnlocked: boolean
}

export const AchievementBadgeIcon: React.FC<AchievementBadgeIconProps> = ({
  icon,
  isUnlocked,
}) => (
  <Box
    component={motion.div}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    sx={{
      width: 64,
      height: 64,
      borderRadius: '50%',
      overflow: 'hidden',
      filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {icon}
  </Box>
)
