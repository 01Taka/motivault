import {
  concurrentHabitLevels,
  habitMateLevels,
} from '../../constants/data/habit-level-data'
import type {
  HabitMateHabitLevel,
  HabitMateLevelInfo,
} from '../../types/data/habit-level-types'

export const getLevelInfo = (
  level: HabitMateHabitLevel
): HabitMateLevelInfo => {
  const levelInfo = habitMateLevels.find(
    (levelInfo) => levelInfo.level === level
  )

  if (!levelInfo) {
    console.error(
      `レベル ${level} の情報が見つかりません。Lv1 の情報を返します。`
    )
    return habitMateLevels[0] // habitMateLevels[0] は Lv1 の情報
  }

  return levelInfo
}

export interface HabitMateHabitReward {
  hasReward: boolean
  prevSim: number
  currentSim: number
  message: string | null
}

export const getHabitRewards = (
  level: HabitMateHabitLevel
): HabitMateHabitReward => {
  const currentSim = concurrentHabitLevels[level]
  const prevSim = concurrentHabitLevels[(level - 1) as HabitMateHabitLevel]

  if (level !== 1 && currentSim !== prevSim) {
    return {
      hasReward: true,
      prevSim,
      currentSim,
      message: `同時習慣化数 ${prevSim} → ${currentSim}`,
    }
  }

  return {
    hasReward: false,
    prevSim,
    currentSim,
    message: null,
  }
}
