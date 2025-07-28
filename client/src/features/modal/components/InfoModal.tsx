// src/components/InfoModal.tsx
import React from 'react'
import { Typography } from '@mui/material'
import { useInfoModal } from '../hooks/useInfoModal'
import Popup from '../../../components/utils/Popup' // Popup コンポーネントのパス
import { LevelUpModalContent } from './LevelUpModalContent'
import { UnlockedAchievementModalContent } from './UnlockedAchievementModalContent'

const InfoModal: React.FC = () => {
  const { isOpen, info, onClose } = useInfoModal()

  // モーダルが開いていない、または情報がない場合は何もレンダリングしない
  if (!isOpen || !info) {
    return null
  }

  // 表示するコンテンツコンポーネントを選択
  const renderModalContent = () => {
    switch (info.type) {
      case 'levelUp':
        return <LevelUpModalContent info={info} timestamp={info.timestamp} />
      case 'unlockedAchievement':
        return (
          <UnlockedAchievementModalContent
            info={info}
            timestamp={info.timestamp}
          />
        )
      default:
        return (
          <Typography variant="body1" color="error">
            未知のモーダルタイプ: {info}
          </Typography>
        )
    }
  }

  return (
    <Popup open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      {renderModalContent()}
    </Popup>
  )
}

export default InfoModal
