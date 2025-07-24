export type ProgressComponentId = 'circularWithMilestoneChips'

export interface HabitMateProgressDataProps {
  taskName: string
  currentCount: number
  nextMilestoneCount: number
  nextMilestoneAbsoluteCount: number
  targetCount: number | 'unlimited'
  isCompletedToday: boolean
  milestonesAchieved: number
  milestonesTotal: number
}

export interface HabitMateProgressActionProps {
  onToggleCompletion: () => void
  onCompleted: () => void
  onCancelComplete: () => void
}

export type HabitMateProgressProps = HabitMateProgressDataProps &
  HabitMateProgressActionProps

export interface HabitMateNewHabitProps {
  text: string
  onCreate: () => void
}
