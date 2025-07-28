// src/components/modals/LevelUpModalContent.tsx
import React from 'react'
import { Typography } from '@mui/material'
import type { LevelUpInfo } from '../types/info-modal-store-types'

interface LevelUpModalContentProps {
  info: LevelUpInfo
  timestamp: number
}

export const LevelUpModalContent: React.FC<LevelUpModalContentProps> = ({
  info,
}) => {
  return (
    <>
      <Typography id="modal-title" variant="h5" component="h2" gutterBottom>
        レベルアップ！
      </Typography>
      <Typography id="modal-description" sx={{ mt: 2 }}>
        **{info.techniqueId}** のレベルが上がりました！
        <br />
        経験値: **{info.prevExp}** → **{info.newExp}**
      </Typography>
    </>
  )
}
