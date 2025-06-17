import React, { useEffect, useState } from 'react'
import { Stack, Typography, alpha } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { grey } from '@mui/material/colors'
import { AchievementBadgeIcon } from './AchievementBadgeIcon'
import { AchievementBadgeRarityDisplay } from './AchievementBadgeRarityDisplay'
import { badgeStyleMap } from '../../constants/badge-style'
import type { AchievementBadgeRarity } from '../../types/achievement-types'

interface AchievementBadgeProps {
  title: string
  icon: React.ReactNode
  rarity: AchievementBadgeRarity
  condition: string
  isUnlocked: boolean
}

export const AchievementBadgeCard: React.FC<AchievementBadgeProps> = ({
  title,
  icon,
  rarity,
  condition,
  isUnlocked,
}) => {
  const [wasUnlocked, setWasUnlocked] = useState(isUnlocked)
  const [showFlash, setShowFlash] = useState(false)
  const styles = badgeStyleMap[rarity]

  useEffect(() => {
    if (isUnlocked && !wasUnlocked) {
      setWasUnlocked(true)
      setShowFlash(true)
      const timer = setTimeout(() => setShowFlash(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isUnlocked, wasUnlocked])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: showFlash ? 1.05 : 1,
        boxShadow: isUnlocked
          ? `0 0 20px ${styles.glow}`
          : '0 2px 4px rgba(0,0,0,0.1)',
      }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }} // 'easeOutBack'
      style={{
        borderRadius: 16,
        border: `2px solid ${isUnlocked ? styles.border : alpha(grey[200], 0.5)}`,
        background: isUnlocked ? styles.background : alpha(grey[200], 1),
        padding: '1.5rem',
        width: '70vw',
        height: '40vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {showFlash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
            animate={{ opacity: 0.4, scale: 1.1, filter: 'blur(2px)' }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(6px)' }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: styles.glow,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <Stack spacing={2} alignItems="center" zIndex={1} position="relative">
        <Typography
          variant="h6"
          fontWeight="bold"
          color={isUnlocked ? styles.color : 'text.disabled'}
        >
          {title}
        </Typography>

        <AchievementBadgeIcon icon={icon} isUnlocked={isUnlocked} />

        <AchievementBadgeRarityDisplay
          rarity={rarity}
          isUnlocked={isUnlocked}
        />

        <Typography
          variant="body2"
          color={isUnlocked ? 'text.secondary' : 'text.disabled'}
          textAlign="center"
          sx={{ mt: 1 }}
        >
          {condition}
        </Typography>
      </Stack>
    </motion.div>
  )
}
