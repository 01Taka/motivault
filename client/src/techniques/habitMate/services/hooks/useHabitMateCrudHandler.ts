import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { HabitMateCreateHabitFormState } from '../../types/form/habit-create-form'
import type { HabitMateHabitLevel } from '../../types/habit-level-types'
import type { HabitMateHabitWrite } from '../documents/habit-mate-habit-document'
import { createHabitMateHabit } from '../functions/habit-mate-habit-crud'
import { useHabitMateDataStore } from '../stores/useHabitMateDataStore'

const useHabitMateCrudHandler = () => {
  const { uid } = useCurrentUserStore()
  const { idbHabit } = useHabitMateDataStore()
  const asyncKeys = ['createSubmit'] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  const submitCreateHabit = (
    level: HabitMateHabitLevel,
    formState: HabitMateCreateHabitFormState,
    startedAt = Date.now()
  ) => {
    if (!idbHabit || !uid) {
      console.error('初期化未完了')
      return
    }

    const data: HabitMateHabitWrite = {
      level,
      ...formState,
      startedAt,
      workedDate: [],
      isFailed: false,
      status: 'active',
      resetCount: 0,
    }
    callAsyncFunction('createSubmit', createHabitMateHabit, [
      idbHabit,
      uid,
      data,
    ])
  }

  return { asyncStates, submitCreateHabit }
}

export default useHabitMateCrudHandler
