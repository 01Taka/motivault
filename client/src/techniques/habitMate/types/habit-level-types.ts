export type HabitMateHabitLevel = 1 | 2 | 3 | 4 | 5

export type HabitMateTarget =
  | { type: 'fixed'; count: number }
  | { type: 'unlimited' }

export interface HabitMateLevelInfo {
  level: HabitMateHabitLevel
  name: string // レベル名
  milestoneIntervalDays: number // 中間地点間隔（日数）
  targetCount: HabitMateTarget // 最大継続日数（無期限は文字列）
  startHabitBgSrc: string // 背景画像URL（後で設定する）
}
