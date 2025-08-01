import { useCallback, useMemo } from 'react'
import useTimer from '../../../hooks/timer/useTimer'
import type { PomodoroCycleType } from '../services/documents/pomodoro-session-shared-data'
import usePomodoroTimerStateCrudHandler from '../services/hooks/usePomodoroTimerStateCrudHandler'
import { usePomodoroDataStore } from '../services/stores/usePomodoroDataStore'
import type { PomodoroTimerStateWrite } from '../services/documents/pomodoro-timer-state-document'
import usePomodoroSessionCrudHandler from '../services/hooks/usePomodoroSessionCrudHandler'
import {
  calculatePomodoroSessionSummary,
  type PomodoroSessionSummary,
} from '../functions/pomodoro-session-utils'
import useGamificationSystem from '../../../features/gamification/hooks/useGamificationSystem'
import { STUDY_TIME_MS_PER_EXP_RATIO } from '../constants/pomodoro-constants'

interface TimerSettings {
  studyDuration: number
  breakDuration: number
}

const usePomodoro = (
  defaultDuration: TimerSettings = {
    studyDuration: 25 * 60 * 1000,
    breakDuration: 5 * 60 * 1000,
  }
) => {
  const { timerState, progressSession, listenerStatus } = usePomodoroDataStore()
  const { asyncStates: timerStateAsyncStates, updateTimer } =
    usePomodoroTimerStateCrudHandler()
  const {
    asyncStates: sessionAsyncStates,
    initializeSession,
    toggleCycle,
    saveSession,
  } = usePomodoroSessionCrudHandler()

  const { handleGainExp } = useGamificationSystem()

  const currentType =
    progressSession?.progressCycle && progressSession?.state === 'progress'
      ? progressSession.progressCycle.type
      : 'study'

  const isProgressSession = progressSession?.state === 'progress'
  const isListenedSession =
    sessionAsyncStates.initializeSession?.status === 'success'
  const needInitialize =
    listenerStatus.progressSession === 'listening' &&
    (!progressSession || progressSession.state !== 'progress')

  const initializeTimer = useCallback(
    async (
      duration: number,
      subjectId: string | null,
      type?: PomodoroCycleType
    ) => {
      if (needInitialize) {
        const result = await initializeSession(subjectId, type)

        if (result?.success) {
          await updateTimer(
            {
              duration,
              status: 'running',
              startTime: Date.now(),
              stoppedAt: null,
            },
            defaultState
          )
        }
      }
    },
    [needInitialize, initializeSession, updateTimer]
  )

  // defaultStateは、timerStateが初期ロード時に存在しない場合のフォールバックとして使用
  const defaultState: PomodoroTimerStateWrite = useMemo(
    () => ({
      status: 'idle',
      startTime: 0,
      stoppedAt: 0,
      duration: defaultDuration.studyDuration,
    }),
    [defaultDuration.studyDuration]
  )

  // タイマーの現在の状態を決定
  // timerStateがnullの場合でもdefaultStateにフォールバックすることで、常に有効な状態を保証
  const currentState: PomodoroTimerStateWrite = useMemo(() => {
    const baseState = timerState ?? defaultState

    // stoppedAtがnullの場合に0にフォールバック
    const safeStoppedAt = baseState.stoppedAt ?? 0

    // durationが現在のサイクルタイプと一致しない場合、適切な期間に調整
    // progressSession?.progressCycle?.type を使用して、現在のサイクルに合った duration を提供
    const adjustedDuration =
      (baseState.status === 'running' || baseState.status === 'paused') &&
      baseState.duration
        ? baseState.duration // 実行中または一時停止中は現在のdurationを維持
        : currentType === 'study'
          ? defaultDuration.studyDuration
          : defaultDuration.breakDuration

    return {
      ...baseState,
      stoppedAt: safeStoppedAt,
      duration: adjustedDuration,
    }
  }, [timerState, defaultState, currentType, defaultDuration])

  const handleTimerStateChange = useCallback(
    (stateFromUseTimer: {
      startTime: number
      stoppedAt: number
      isRunning: boolean
    }) => {
      const newPomodoroTimerState: PomodoroTimerStateWrite = {
        startTime: stateFromUseTimer.startTime,
        stoppedAt: stateFromUseTimer.stoppedAt,
        status: stateFromUseTimer.isRunning
          ? 'running'
          : stateFromUseTimer.stoppedAt > 0
            ? 'paused'
            : 'idle',
        duration: currentState.duration,
      }
      updateTimer(newPomodoroTimerState, defaultState)
    },
    [updateTimer, defaultState, currentState.duration]
  )

  const timer = useTimer({
    startTime: currentState.startTime,
    stoppedAt: currentState.stoppedAt!,
    isRunning: currentState.status === 'running',
    expectedDuration: currentState.duration,
    onStateChange: handleTimerStateChange,
  })

  const switchMode = useCallback(
    async (
      nextDuration: number,
      subjectId: string | null,
      nextType?: PomodoroCycleType
    ) => {
      const result = await toggleCycle(subjectId, nextType)
      if (!result?.success) {
        return
      }

      const newTimerStateForSwitch: PomodoroTimerStateWrite = {
        status: 'running',
        startTime: Date.now(),
        stoppedAt: null,
        duration: nextDuration,
      }

      updateTimer(newTimerStateForSwitch, defaultState)
    },
    [updateTimer, defaultState, currentType, toggleCycle]
  )

  const sessionSummary: PomodoroSessionSummary = useMemo(() => {
    // progressSession が存在しない場合は初期値を使用
    const baseSummary = progressSession
      ? calculatePomodoroSessionSummary(progressSession)
      : { totalStudyDuration: 0, totalBreakDuration: 0, totalCycles: 0 }

    // 現在進行中のサイクルの経過時間を加算
    if (currentType === 'study') {
      return {
        ...baseSummary,
        totalStudyDuration: baseSummary.totalStudyDuration + timer.elapsedTime,
      }
    } else {
      return {
        ...baseSummary,
        totalBreakDuration: baseSummary.totalBreakDuration + timer.elapsedTime,
      }
    }
  }, [progressSession, currentType, timer.elapsedTime])

  const handleCompleteSession = useCallback(async () => {
    const expAmount = Math.floor(
      sessionSummary.totalStudyDuration * STUDY_TIME_MS_PER_EXP_RATIO
    )

    const result = await saveSession()
    if (result?.success) {
      timer.reset()
      if (expAmount > 0) {
        handleGainExp(expAmount, 'completeSession')
      }
    }
  }, [sessionSummary.totalStudyDuration, handleGainExp, saveSession])

  const remainingTimeByCycleStart = progressSession?.progressCycle?.startAt
    ? progressSession.progressCycle.startAt + currentState.duration - Date.now()
    : null

  return {
    ...timer, // useTimerからのプロパティ
    remainingTimeByCycleStart,
    asyncStates: { ...sessionAsyncStates, ...timerStateAsyncStates },
    isProgressSession,
    isListenedSession,
    needInitialize,
    currentType, // 現在のポモドーロサイクルタイプ
    switchMode, // モード切り替え関数
    initializeTimer,
    status: currentState.status,
    sessionSummary,
    handleCompleteSession,
  }
}

export default usePomodoro
