import type { PomodoroTimerStateWrite } from '../documents/pomodoro-timer-state-document'
import type { PomodoroTimerStateIDBRepository } from '../repositories/indexedDB/pomodoro-timer-state-idb-repository'

export const updateOrCreateTimerState = async (
  timerStateRepo: PomodoroTimerStateIDBRepository,
  updatedTimerState: Partial<PomodoroTimerStateWrite>,
  defaultTimerState: PomodoroTimerStateWrite
) => {
  const timerState = await timerStateRepo.read([])
  if (!timerState) {
    timerStateRepo.create({ ...defaultTimerState, ...updatedTimerState }, [])
  } else {
    timerStateRepo.update(updatedTimerState, [])
  }
}
