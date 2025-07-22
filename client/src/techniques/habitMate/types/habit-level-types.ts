export type HabitMateHabitLevel = 1 | 2 | 3 | 4 | 5

export interface HabitMateLevelInfo {
  level: HabitMateHabitLevel
  name: string // レベル名
  milestoneIntervalDays: number // 中間地点間隔（日数）
  maxDays: number | 'unlimited' // 最大継続日数（無期限は文字列）
  startHabitBgSrc: string // 背景画像URL（後で設定する）
}
