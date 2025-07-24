import CircularNewHabitButton from '../../components/progress/circularWithMilestoneChips/CircularNewHabitButton'
import CircularWithMilestoneChipsProgress from '../../components/progress/circularWithMilestoneChips/CircularWithMilestoneChipsProgress'
import type {
  ProgressComponentId,
  HabitMateProgressProps,
  HabitMateNewHabitProps,
} from '../../types/components/progress-types'

export const getProgressComponent = (
  id: ProgressComponentId
): React.FC<HabitMateProgressProps> => {
  switch (id) {
    case 'circularWithMilestoneChips':
      return CircularWithMilestoneChipsProgress
    default:
      throw Error('存在しないidです')
  }
}

export const getNewHabitButton = (
  id: ProgressComponentId
): React.FC<HabitMateNewHabitProps> => {
  switch (id) {
    case 'circularWithMilestoneChips':
      return CircularNewHabitButton
    default:
      throw Error('存在しないidです')
  }
}
