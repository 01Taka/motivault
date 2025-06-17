import React from 'react'
import { useXpPopupStore } from '../../../stores/achievement/xpPopupStore'
import Popup from '../../../components/utils/Popup'
import AchievementAnimationsScreen from '../../achievements/components/AchievementAnimationsScreen'

interface AchievementModalProps {}

const AchievementModal: React.FC<AchievementModalProps> = ({}) => {
  const { isOpen, popupData, closeModal } = useXpPopupStore()

  return (
    <Popup open={isOpen} onClose={() => closeModal()}>
      <AchievementAnimationsScreen
        title={popupData?.title ?? ''}
        previousTotalXP={popupData?.startXp ?? 0}
        currentTotalXP={popupData?.endXp ?? 0}
        badges={[]} //popupData?.badges ?? []
      />
    </Popup>
  )
}

export default AchievementModal
