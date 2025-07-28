// src/components/modals/UnlockedAchievementModalContent.tsx
import React from 'react'
import { Box } from '@mui/material'
import type { UnlockedAchievementModalInfo } from '../types/info-modal-store-types'
import UnlockAchievementAnimations from '../../achievement/components/UnlockAchievementAnimations'

interface UnlockedAchievementModalContentProps {
  info: UnlockedAchievementModalInfo
  timestamp: number
}

export const UnlockedAchievementModalContent: React.FC<
  UnlockedAchievementModalContentProps
> = ({ info }) => {
  return (
    <Box>
      <UnlockAchievementAnimations
        title={info.techniqueData.officialName}
        inPossessionAchievements={info.inPossessionAchievements}
        unlockedNewAchievements={info.unlockedNewAchievements}
      />
    </Box>
  )
}
