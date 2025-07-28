import { useEffect, useMemo, useState } from 'react'
import { useInfoModalStore } from '../../modal/store/useInfoModalStore'
import useTechniqueCrudHandler from '../../technique/services/hooks/useTechniqueCrudHandler'
import type {
  LevelUpModalInfo,
  UnlockedAchievementModalInfo,
} from '../../modal/types/info-modal-store-types'
import { useUserDataStore } from '../../user/services/stores/useUserDataStore'
import useFullTechniqueData from '../../technique/hooks/useFullTechniqueData'
import { getAchievementsStaticInfoByIds } from '../../achievement/functions/constantsHelper/data/achievement-static-info-helper'

const useGamificationSystem = () => {
  const { user } = useUserDataStore()
  const techniqueData = useFullTechniqueData()
  const { asyncStates, gainExp, unlockAchievement } = useTechniqueCrudHandler()
  const { addInfo } = useInfoModalStore()

  const [pendingModalInfo, setPendingModalInfo] = useState<
    LevelUpModalInfo | UnlockedAchievementModalInfo | null
  >(null)

  const currentTechniqueData = useMemo(() => {
    const activeSession = user?.activeSessionInfo
    if (!activeSession || !techniqueData) {
      return null
    }

    return (
      techniqueData.find(
        (data) => data.techniqueId === activeSession.techniqueId
      ) ?? null
    )
  }, [user?.activeSessionInfo, techniqueData])

  const handleGainExp = (expGained: number, gainedReason: string) => {
    console.log(user, currentTechniqueData)

    if (!user || !currentTechniqueData) {
      console.warn('User or current technique metadata not available.')
      return
    }

    gainExp(expGained, gainedReason)

    const modalInfo: LevelUpModalInfo = {
      type: 'levelUp',
      techniqueData: currentTechniqueData,
      prevExp: currentTechniqueData.totalGainedExp,
      newExp: currentTechniqueData.totalGainedExp + expGained,
    }
    setPendingModalInfo(modalInfo)
  }

  const handleUnlockAchievements = (unlockedAchievementIds: string[]) => {
    if (!user || !currentTechniqueData) {
      console.warn('User or current technique metadata not available.')
      return
    }

    unlockAchievement(unlockedAchievementIds)

    const unlockedNewAchievements = getAchievementsStaticInfoByIds(
      unlockedAchievementIds.filter(
        (id) => !currentTechniqueData.unlockedAchievementIds.includes(id)
      )
    )

    const modalInfo: UnlockedAchievementModalInfo = {
      type: 'unlockedAchievement',
      techniqueData: currentTechniqueData,
      inPossessionAchievements:
        currentTechniqueData.unlockedAchievementsStaticInfo,
      unlockedNewAchievements,
    }
    setPendingModalInfo(modalInfo)
  }

  useEffect(() => {
    if (
      (asyncStates.gainExp?.status === 'success' ||
        asyncStates.unlockAchievement?.status === 'success') &&
      pendingModalInfo
    ) {
      addInfo(pendingModalInfo)
      setPendingModalInfo(null)
    }
  }, [
    asyncStates.gainExp?.status,
    asyncStates.unlockAchievement?.status,
    pendingModalInfo,
    addInfo,
  ])

  return { handleGainExp, handleUnlockAchievements }
}

export default useGamificationSystem
