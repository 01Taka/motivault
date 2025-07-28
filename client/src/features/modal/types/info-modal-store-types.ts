import type { TechniqueId } from '../../technique/types/data/technique-id-types'

export interface LevelUpInfo {
  type: 'levelUp'
  techniqueId: TechniqueId
  levelUpAt: number // これはレベルアップが発生した時間
  prevExp: number
  newExp: number
}

export interface UnlockedAchievementInfo {
  type: 'unlockedAchievement'
  techniqueId: TechniqueId
  inPossessionAchievementIds: string[]
  unlockedAchievementIds: string[]
}

export type ModalInfo = LevelUpInfo | UnlockedAchievementInfo

export type FullModalInfo = ModalInfo & { timestamp: number }

export interface InfoModalStore {
  infoQueue: FullModalInfo[]
  addInfo: (info: ModalInfo) => void // timestamp は関数内で自動設定
  removeInfo: () => void
  clearQueue: () => void
}

export type OpenModalCallback = (modalInfo: ModalInfo) => void
