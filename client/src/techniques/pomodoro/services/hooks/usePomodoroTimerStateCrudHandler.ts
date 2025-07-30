import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import type { PomodoroTimerStateWrite } from '../documents/pomodoro-timer-state-document'
import { updateOrCreateTimerState } from '../functions/pomodoro-timer-state-crud'
import { usePomodoroDataStore } from '../stores/usePomodoroDataStore'

const usePomodoroTimerStateCrudHandler = () => {
  const { idbTimerState } = usePomodoroDataStore()

  const asyncKeys = ['updateTimer'] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  const updateTimer = async (
    timerState: Partial<PomodoroTimerStateWrite>,
    defaultState: PomodoroTimerStateWrite
  ) => {
    if (!idbTimerState) {
      return
    }
    return await callAsyncFunction('updateTimer', updateOrCreateTimerState, [
      idbTimerState,
      timerState,
      defaultState,
    ])
  }

  return { asyncStates, updateTimer }
}

export default usePomodoroTimerStateCrudHandler
