// // src/types/habit-types.ts

// /**
//  * 進行状況の表示タイプ (今回はスクリーンショットのデザインに固定されるため、この型は内部的に使用しない可能性あり)
//  * 'overall': 全体の割合を表示 (例: 5/15)
//  * 'intermediateExtended': 次の中間地点までで次々拡張 (例: 5/5 -> 5/7)
//  * 'intermediateEach': 中間地点ごと (例: 5/5 -> 0/5)
//  */
// export type HabitMateHabitDisplayType =
//   | 'overall'
//   | 'intermediateExtended'
//   | 'intermediateEach'

// export interface HabitMateLevelInfo {
//   /** レベルのテーマカラー (CSSカラーコードなど) */
//   themeColor: string
//   /** レベル番号、例: 1, 2, 3 */
//   level: number
//   /** レベル名、例: 'お試しスタート', '習慣ビルダー' */
//   name: string
//   /** 中間地点の間隔、例: 2 (2日ごと) */
//   intermediateInterval: number
//   /** このレベルでの最終目標カウント (HabitDisplayProps.goalCount と重複するが、レベル情報として含める) */
//   levelGoalCount: number | 'unlimited'
// }

// /**
//  * 習慣の表示コンポーネントに渡すデータ
//  */
// export interface HabitDisplayProps {
//   /** 習慣の名前、例: '朝活', '読書' */
//   taskName: string
//   /** 進行状況の表示タイプ (今回は特定デザインに固定されるため、実質的に利用しない可能性あり) */
//   displayType: HabitMateHabitDisplayType
//   /** 今日の目標が完了したか */
//   isTodayCompleted: boolean
//   /** 昨日の目標が完了したか (リセット判断用) */
//   isYesterdayCompleted: boolean
//   /** 現在の日付、例: new Date() */
//   currentDate: Date
//   /** 現在のカウント数、例: 5 */
//   currentCount: number
//   /**
//    * 中間地点のカウントリスト
//    * 例: Lv.1なら [2, 4, 6] (7日ゴールの場合)
//    */
//   intermediateMilestones: number[]
//   /** 最終目標となるカウント数、例: 7, 15, 30, 50, 無期限 */
//   goalCount: number | 'unlimited' // 'unlimited'は無期限の場合を想定
//   /** 現在の中間地点のインデックス (0始まり)。通過済みのマイルストーンの数 */
//   passedMilestoneCount: number // currentMilestoneIndexから名称変更し、意味を明確化
//   /** 全体の中間地点の総数 */
//   totalMilestones: number
//   /**
//    * 現在取り組んでいるレベルに関する情報
//    */
//   currentLevelInfo: HabitMateLevelInfo
//   /** 今日のタスク完了状態が変更されたときに呼び出されるコールバック */
//   onToggleCompletion: () => void
// }

// export interface HabitMateProgressProps {
//   taskName: string
//   currentCount: number
//   nextMilestoneCount: number
//   nextMilestoneAbsoluteCount: number
//   targetCount: number
//   isCompletedToday: boolean
//   milestonesAchieved: number
//   milestonesTotal: number
//   onToggleCompletion: () => void
//   onCompleted: () => void
//   onCancelComplete: () => void
// }

// export interface HabitMateNewHabitProps {
//   text: string
//   onCreate: () => void
// }

// export interface LevelInfo {
//   level: number
//   name: string
//   interval: string
//   targetCount: string
//   unlockCondition: string
//   reward: string
//   isUnlocked: boolean
//   bgSrc: string
// }
