export type ProgressComponentId = 'circularWithMilestoneChips'

export interface HabitMateProgressProps {
  taskName: string
  currentCount: number
  nextMilestoneCount: number
  nextMilestoneAbsoluteCount: number
  targetCount: number | 'unlimited'
  isCompletedToday: boolean
  milestonesAchieved: number
  milestonesTotal: number
  onToggleCompletion: () => void
  onCompleted: () => void
  onCancelComplete: () => void
}

export interface HabitMateNewHabitProps {
  text: string
  onCreate: () => void
}
