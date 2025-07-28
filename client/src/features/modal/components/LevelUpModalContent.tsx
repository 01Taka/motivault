// src/components/modals/LevelUpModalContent.tsx
import React from 'react'
import type { LevelUpModalInfo } from '../types/info-modal-store-types'
import GainXPAnimations from '../../level/components/GainXPAnimations'
import { Box } from '@mui/material'

interface LevelUpModalContentProps {
  info: LevelUpModalInfo
  timestamp: number
}

export const LevelUpModalContent: React.FC<LevelUpModalContentProps> = ({
  info,
}) => {
  return (
    <Box sx={{ width: '80vw', height: '60vh' }}>
      <GainXPAnimations
        title={info.techniqueData.officialName}
        previousTotalXP={info.prevExp}
        currentTotalXP={info.newExp}
      />
    </Box>
  )
}
