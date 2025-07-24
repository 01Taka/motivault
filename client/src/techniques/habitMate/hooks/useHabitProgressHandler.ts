import useHabitMateCrudHandler from '../services/hooks/useHabitMateCrudHandler'
import { useHabitAudio } from './useHabitAudio'

export const useHabitProgressHandler = (
  habitId?: string,
  isCompletedToday?: boolean,
  onCompletedCallback?: (
    habitId: string,
    actionBy: 'add' | 'remove' | 'toggle'
  ) => void
) => {
  const {
    asyncStates,
    pushWorkedDate,
    removeWorkedDate,
    toggleWorkedDate,
    updateNextTargetCount,
  } = useHabitMateCrudHandler()
  const { ringSE } = useHabitAudio()

  const handleWorkDate = (action: 'add' | 'remove' | 'toggle') => {
    if (!habitId) return
    switch (action) {
      case 'add':
        ringSE()
        onCompletedCallback?.(habitId, 'add')
        pushWorkedDate(habitId)
        break
      case 'remove':
        removeWorkedDate(habitId)
        break
      case 'toggle':
        if (!isCompletedToday) {
          ringSE()
          onCompletedCallback?.(habitId, 'toggle')
        }
        toggleWorkedDate(habitId)
        break
    }
  }

  const progressActionProps = {
    onToggleCompletion: () => handleWorkDate('toggle'),
    onCompleted: () => handleWorkDate('add'),
    onCancelComplete: () => handleWorkDate('remove'),
  }

  return {
    asyncStates,
    progressActionProps,
    handleWorkDate,
    updateNextTargetCount,
  }
}
