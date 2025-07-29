import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { type PomodoroCycleType } from '../documents/pomodoro-session-shared-data'
import {
  initializePomodoroSession,
  savePomodoroProgressSession,
  togglePomodoroCycleInLocal,
} from '../functions/pomodoro-session-crud'
import { usePomodoroDataStore } from '../stores/usePomodoroDataStore'

const usePomodoroSessionCrudHandler = () => {
  const { listenerStatus, idbSession, idbProgressSession } =
    usePomodoroDataStore()
  const asyncKeys = ['initializeSession', 'saveSession', 'toggleCycle'] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  const saveSession = async () => {
    if (!idbSession || !idbProgressSession) {
      return
    }
    return await callAsyncFunction('saveSession', savePomodoroProgressSession, [
      idbSession,
      idbProgressSession,
    ])
  }

  const toggleCycle = async (subjectId: string) => {
    if (!idbProgressSession) {
      return
    }

    return await callAsyncFunction('toggleCycle', togglePomodoroCycleInLocal, [
      idbProgressSession,
      subjectId,
    ])
  }

  const initializeSession = async (
    initialSubjectId: string | null,
    initialCycleType: PomodoroCycleType = 'study'
  ) => {
    if (!idbProgressSession) {
      return
    }

    return callAsyncFunction('initializeSession', initializePomodoroSession, [
      idbProgressSession,
      initialSubjectId,
      initialCycleType,
    ])
  }

  return {
    asyncStates,
    listenerStatus,
    initializeSession,
    toggleCycle,
    saveSession,
  }
}

export default usePomodoroSessionCrudHandler
