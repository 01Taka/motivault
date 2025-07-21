import type { HabitDisplayProps, LevelInfo } from '../types/habit-types'

export const habitLevels: LevelInfo[] = [
  {
    level: 1,
    name: 'お試しスタート',
    interval: '2日',
    maxDays: '7日',
    unlockCondition: '初期解放',
    reward: '', // No specific reward mentioned for Lv.1
    isUnlocked: true, // Assuming Lv.1 is initially unlocked
  },
  {
    level: 2,
    name: '習慣ビルダー',
    interval: '3日',
    maxDays: '15日',
    unlockCondition: 'Lv.1クリアで解放',
    reward: '', // No specific reward mentioned for Lv.2
    isUnlocked: false,
  },
  {
    level: 3,
    name: 'マスター',
    interval: '5日',
    maxDays: '30日',
    unlockCondition: 'Lv.2クリアで解放',
    reward: '並列習慣化 1 → 2',
    isUnlocked: false,
  },
  {
    level: 4,
    name: 'レジェンド',
    interval: '5日',
    maxDays: '50日',
    unlockCondition: 'Lv.3クリアで解放',
    reward: '同時習慣化 2 → 3',
    isUnlocked: false,
  },
  {
    level: 5,
    name: 'アルティメット',
    interval: '5日',
    maxDays: '無期限',
    unlockCondition: 'Lv.4クリアで解放',
    reward: '', // No specific reward mentioned for Lv.5
    isUnlocked: false,
  },
]

// Helper to calculate totalMilestones
const calculateTotalMilestones = (
  goalCount: number | 'unlimited',
  intermediateMilestones: number[]
): number => {
  if (goalCount === 'unlimited') {
    return intermediateMilestones.length
  }
  // If intermediate milestones are provided, use their count
  if (intermediateMilestones.length > 0) {
    return intermediateMilestones.length
  }
  // If no intermediate milestones but a finite goal, consider 1 milestone (the goal itself) if meaningful,
  // or 0 if intermediate milestones are strictly required. For simplicity here, we'll return 0 if no explicit milestones.
  return 0 // Or 1 if goalCount itself counts as a milestone
}

// Helper to calculate currentMilestoneIndex
const calculateCurrentMilestoneIndex = (
  currentCount: number,
  intermediateMilestones: number[]
): number => {
  if (intermediateMilestones.length === 0) {
    return 0 // No milestones, so index is 0
  }
  let index = 0
  for (let i = 0; i < intermediateMilestones.length; i++) {
    if (currentCount >= intermediateMilestones[i]) {
      index = i + 1 // Passed this milestone, so current index is the next one
    } else {
      break // Haven't reached this milestone yet
    }
  }
  // Ensure the index doesn't exceed the total number of milestones.
  // If currentCount is beyond the last milestone, it means all milestones are "passed".
  return Math.min(index, intermediateMilestones.length)
}

// 例1: 全体表示 (Lv.1 お試しスタート)
export const habitProps1: Omit<HabitDisplayProps, 'onToggleCompletion'> = {
  taskName: '朝活',
  displayType: 'overall',
  isTodayCompleted: true,
  isYesterdayCompleted: true,
  currentDate: new Date('2025-07-20T10:00:00Z'), // Consistent date for examples
  currentCount: 5,
  intermediateMilestones: [2, 4, 6],
  goalCount: 7,
  currentLevelInfo: {
    themeColor: '#4CAF50', // Green
    level: 1,
    name: 'お試しスタート',
    intermediateInterval: 2,
    levelGoalCount: 7,
  },
  // 追加情報
  totalMilestones: calculateTotalMilestones(7, [2, 4, 6]), // 3つのマイルストーン
  passedMilestoneCount: 3,
}

// 例2: 中間地点で拡張 (Lv.2 習慣ビルダー)
export const habitProps2: Omit<HabitDisplayProps, 'onToggleCompletion'> = {
  taskName: '読書',
  displayType: 'intermediateExtended',
  isTodayCompleted: false,
  isYesterdayCompleted: true,
  currentDate: new Date('2025-07-20T10:00:00Z'),
  currentCount: 8, // 5日目の中間地点を超え、次の10日目に向かっている
  intermediateMilestones: [5, 10, 15],
  goalCount: 15,
  currentLevelInfo: {
    themeColor: '#FFC107', // Amber
    level: 2,
    name: '習慣ビルダー',
    intermediateInterval: 3,
    levelGoalCount: 15,
  },
  // 追加情報
  totalMilestones: calculateTotalMilestones(15, [5, 10, 15]), // 3つのマイルストーン
  passedMilestoneCount: 5,
}

// 例3: 中間地点ごと (Lv.3 マスターチャレンジャー)
export const habitProps3: Omit<HabitDisplayProps, 'onToggleCompletion'> = {
  taskName: '筋トレ',
  displayType: 'intermediateEach',
  isTodayCompleted: true,
  isYesterdayCompleted: false,
  currentDate: new Date('2025-07-20T10:00:00Z'),
  currentCount: 7, // 5日ごとの中間地点で、2回目の区間 (7 % 5 = 2)
  intermediateMilestones: [5, 10, 15, 20, 25], // この表示タイプでは直接使われないが、データとして保持
  goalCount: 30,
  currentLevelInfo: {
    themeColor: '#2196F3', // Blue
    level: 3,
    name: 'マスターチャレンジャー',
    intermediateInterval: 5,
    levelGoalCount: 30,
  },
  // 追加情報
  totalMilestones: calculateTotalMilestones(30, [5, 10, 15, 20, 25]), // 5つのマイルストーン
  passedMilestoneCount: 2,
}

// 例4: 無期限の習慣 (Lv.5 アルティメット)
export const habitProps4: Omit<HabitDisplayProps, 'onToggleCompletion'> = {
  taskName: '日記',
  displayType: 'intermediateExtended', // 無期限の場合はoverallが適切か
  isTodayCompleted: true,
  isYesterdayCompleted: true,
  currentDate: new Date('2025-07-20T10:00:00Z'),
  currentCount: 120,
  intermediateMilestones: [], // 無期限の場合、中間地点リストは空または使わない
  goalCount: 'unlimited',
  currentLevelInfo: {
    themeColor: '#9C27B0', // Purple
    level: 5,
    name: 'アルティメット',
    intermediateInterval: 5,
    levelGoalCount: 'unlimited',
  },
  // 追加情報
  totalMilestones: calculateTotalMilestones('unlimited', []), // 無期限でマイルストーンなし
  passedMilestoneCount: 20,
}
