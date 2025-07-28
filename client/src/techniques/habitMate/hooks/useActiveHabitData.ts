import { useHabitMateDataStore } from '../services/stores/useHabitMateDataStore'
import { getHabitLevelInfo } from '../functions/constantHelpers/habit-level-data-helper'
import { calculateMilestoneProgress } from '../functions/helper/milestone-helper'
import { toISODate } from '../../../functions/dateTime-utils/time-conversion'
import type { HabitMateProgressDataProps } from '../types/components/progress-types'

export const useActiveHabitData = () => {
  const { listenerStatus, habits } = useHabitMateDataStore()
  const activeHabit = habits.find((habit) => habit.status === 'active') ?? null

  const testHabit = activeHabit
    ? activeHabit
    : // ? ({
      //     ...activeHabit,
      //     workedDate: ['2025-07-05', ...activeHabit.workedDate],
      //   } as HabitMateHabitRead)
      null

  const levelInfo = testHabit ? getHabitLevelInfo(testHabit.level) : null

  const milestoneProgress =
    testHabit && levelInfo
      ? calculateMilestoneProgress(levelInfo, testHabit)
      : {
          nextMilestoneCount: 0,
          nextMilestoneAbsoluteCount: 0,
          milestonesAchieved: 0,
          milestonesTotal: 0,
        }

  const isCompletedToday = testHabit
    ? testHabit.workedDate.includes(toISODate(new Date()))
    : false

  const targetCount = levelInfo
    ? levelInfo.targetCount.type === 'fixed'
      ? levelInfo.targetCount.count
      : 'unlimited'
    : 0

  const progressDataProps: HabitMateProgressDataProps = {
    taskName: testHabit?.habit ?? '',
    currentCount: testHabit?.workedDate.length ?? 0,
    targetCount: targetCount,
    isCompletedToday,
    ...milestoneProgress,
    nextMilestoneAbsoluteCount: activeHabit?.nextTargetCount ?? 0,
  }

  return {
    listenerStatus,
    activeHabit,
    progressDataProps,
    isCompletedToday,
  }
}
