import type { AchievementStaticInfo } from '../../achievement/types/data/achievement-data-types'
import type { FullTechniqueData } from '../../technique/types/technique-types'

export interface LevelUpModalInfo {
  type: 'levelUp'
  techniqueData: FullTechniqueData
  prevExp: number
  newExp: number
}

export interface UnlockedAchievementModalInfo {
  type: 'unlockedAchievement'
  techniqueData: FullTechniqueData
  inPossessionAchievements: AchievementStaticInfo[]
  unlockedNewAchievements: AchievementStaticInfo[]
}

export type ModalInfo = LevelUpModalInfo | UnlockedAchievementModalInfo

export type FullModalInfo = ModalInfo & { timestamp: number }

export interface InfoModalStore {
  infoQueue: FullModalInfo[]
  addInfo: (info: ModalInfo) => void // timestamp は関数内で自動設定
  removeInfo: () => void
  clearQueue: () => void
}

export type OpenModalCallback = (modalInfo: ModalInfo) => void
