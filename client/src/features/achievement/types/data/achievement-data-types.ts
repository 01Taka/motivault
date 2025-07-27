import type { TechniqueId } from '../../../technique/types/data/technique-id-types'
import type { AchievementUnlockConditions } from './achievement-unlock-conditions-data-type'

/**
 * アチーブメントのレアリティ
 */
export type AchievementRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'

/**
 * 各アチーブメントの静的な情報
 */
export interface AchievementStaticInfo {
  docId: string // FirestoreのドキュメントIDとして使用される、アチーブメントの一意な識別子（例: Firestoreの自動生成ID）
  order: number // アチーブメントの表示順序を決定する数値（小数点可、間隔を空けて設定推奨）
  techniqueId: TechniqueId // このアチーブメントが関連するテクニックのID
  rarity: AchievementRarity // アチーブメントのレアリティ
  iconId: string // アチーブメント表示に使用するアイコンのID
  name: string // アチーブメントの名称
  unlockConditions: AchievementUnlockConditions // アチーブメントの解放条件を定義する構造
  unlockConditionsExplanation: string // ユーザーに表示される解放条件の説明文（例: 'ポモドーロを10回完了する'）
  description: string // アチーブメントの詳細な説明
}
