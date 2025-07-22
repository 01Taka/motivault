import type { HabitMateHabit } from '../../services/documents/habit-mate-habit-document'
import type { HabitMateLevelInfo } from '../../types/habit-level-types'

interface MilestoneCalculations {
  nextMilestoneCount: number
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

  // Determine targetFixedCount and milestonesTotal based on HabitMateTarget type
  if (levelInfo.targetCount.type === 'fixed') {
    targetFixedCount = levelInfo.targetCount.count
    milestonesTotal = Math.ceil(
      targetFixedCount / levelInfo.milestoneIntervalDays
    )
  } else {
    // If type is 'unlimited', milestonesTotal could be a very large number or
    // simply not applicable in the same way. For practical display, we'll
    // set it to 0 or a flag that indicates continuous.
    // For this calculation, we'll represent it as 0, meaning no finite total.
    milestonesTotal = 0 // Represents an undefined or infinite total
  }

  // Calculate milestones achieved
  const milestonesAchieved = Math.floor(
    workedDaysCount / levelInfo.milestoneIntervalDays
  )

  // Calculate days into the current milestone
  const daysIntoCurrentMilestone =
    workedDaysCount % levelInfo.milestoneIntervalDays

  let nextMilestoneCount: number

  if (levelInfo.targetCount.type === 'unlimited') {
    // For unlimited targets, the next milestone is always within the interval
    nextMilestoneCount =
      levelInfo.milestoneIntervalDays - daysIntoCurrentMilestone
    if (nextMilestoneCount === 0 && workedDaysCount > 0) {
      // If exactly at a milestone, the next is a full interval away
      nextMilestoneCount = levelInfo.milestoneIntervalDays
    }
  } else {
    // type is 'fixed'
    if (workedDaysCount >= targetFixedCount!) {
      // Use ! because we've checked its type
      // If the habit is completed or exceeded the fixed target
      nextMilestoneCount = 0
    } else {
      nextMilestoneCount =
        levelInfo.milestoneIntervalDays - daysIntoCurrentMilestone
      if (nextMilestoneCount === 0 && workedDaysCount > 0) {
        // If exactly at a milestone, the next is a full interval away
        nextMilestoneCount = levelInfo.milestoneIntervalDays
      }
    }
  }

  return {
    nextMilestoneCount,
    milestonesAchieved,
    milestonesTotal,
  }
}
