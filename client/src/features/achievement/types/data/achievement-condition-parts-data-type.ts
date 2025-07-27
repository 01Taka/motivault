import type { StatusForAchievements } from './status/status-for-achievements'

/**
 * 条件比較に使用する演算子
 */
export type ComparisonOperator = 'eq' | 'gte' | 'lte' | 'lt' | 'gt' | 'ne'

export type ConditionDataSource = 'client' | 'server'

/**
 * クライアントサイドで判定される時間ベースの条件
 * ユーザーデバイスのローカル時刻や、特定タイムスタンプの日中時刻部分を比較
 */
interface TimeCondition {
  field: 'currentTimeOfDay' // 今後現在の時間以外の時間フィールドにアクセスする場合に追加
  targetTimeMs: number // 0〜86399999 (0時0分0秒0ミリ秒から23時59分59秒999ミリ秒)
  operator: ComparisonOperator
}

/**
 * サーバーサイド（Firestore）の数値データで判定される条件
 */
interface NumberCondition {
  field: keyof StatusForAchievements // Firestoreドキュメント内のフィールドパス（例: 'status.totalCompletedSessions'）
  borderValue: number // 比較する境界値
  operator: ComparisonOperator
}

/**
 * サーバーサイド（Firestore）の真偽値データで判定される条件
 */
interface BooleanCondition {
  field: keyof StatusForAchievements // Firestoreドキュメント内のフィールドパス（例: 'isVisible'）
  expectedValue: boolean // 期待する真偽値
}

export type AchievementConditionParts =
  | TimeCondition
  | NumberCondition
  | BooleanCondition
