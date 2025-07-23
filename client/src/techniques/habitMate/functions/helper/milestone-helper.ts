import type { HabitMateHabit } from '../../services/documents/habit-mate-habit-document'
import type { HabitMateLevelInfo } from '../../types/data/habit-level-types'

interface MilestoneCalculations {
  nextMilestoneCount: number
  nextMilestoneAbsoluteCount: number
  milestonesAchieved: number
  milestonesTotal: number
}

export function calculateMilestoneProgress(
  levelInfo: HabitMateLevelInfo,
  habit: HabitMateHabit
): MilestoneCalculations {
  const workedDaysCount = habit.workedDate.length

  let milestonesTotal: number
  let targetFixedCount: number | undefined

  if (levelInfo.targetCount.type === 'fixed') {
    targetFixedCount = levelInfo.targetCount.count
    milestonesTotal = Math.ceil(
      targetFixedCount / levelInfo.milestoneIntervalCount
    )
  } else {
    milestonesTotal = 0 // unlimited
  }

  const milestonesAchieved = Math.floor(
    workedDaysCount / levelInfo.milestoneIntervalCount
  )

  const daysIntoCurrentMilestone =
    workedDaysCount % levelInfo.milestoneIntervalCount

  let nextMilestoneCount: number
  let nextMilestoneAbsoluteCount: number

  if (levelInfo.targetCount.type === 'unlimited') {
    nextMilestoneCount =
      levelInfo.milestoneIntervalCount - daysIntoCurrentMilestone
    if (nextMilestoneCount === 0 && workedDaysCount > 0) {
      nextMilestoneCount = levelInfo.milestoneIntervalCount
    }
    nextMilestoneAbsoluteCount = workedDaysCount + nextMilestoneCount
  } else {
    if (workedDaysCount >= targetFixedCount!) {
      nextMilestoneCount = 0
      nextMilestoneAbsoluteCount = workedDaysCount
    } else {
      nextMilestoneCount =
        levelInfo.milestoneIntervalCount - daysIntoCurrentMilestone
      if (nextMilestoneCount === 0 && workedDaysCount > 0) {
        nextMilestoneCount = levelInfo.milestoneIntervalCount
      }

      nextMilestoneAbsoluteCount = Math.min(
        workedDaysCount + nextMilestoneCount,
        targetFixedCount!
      )
    }
  }

  return {
    nextMilestoneCount,
    nextMilestoneAbsoluteCount,
    milestonesAchieved,
    milestonesTotal,
  }
}
