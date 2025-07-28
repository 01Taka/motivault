// src/components/modals/UnlockedAchievementModalContent.tsx
import React from 'react'
import { Typography } from '@mui/material'
import type { UnlockedAchievementInfo } from '../types/info-modal-store-types'

interface UnlockedAchievementModalContentProps {
  info: UnlockedAchievementInfo
  timestamp: number
}

export const UnlockedAchievementModalContent: React.FC<
  UnlockedAchievementModalContentProps
> = ({ info }) => {
  return (
    <>
      <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
        実績解除！
      </Typography>
      <Typography id="modal-description" sx={{ mt: 2 }}>
        **{info.techniqueId}** に関する新しい実績を解除しました！
        <br />
        解除した実績: **{info.unlockedAchievementIds.join(', ')}**
      </Typography>
    </>
  )
}
