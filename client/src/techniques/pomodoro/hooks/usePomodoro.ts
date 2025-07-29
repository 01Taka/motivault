import { useCallback, useEffect, useMemo } from 'react'
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
import { MINUTES_IN_MS } from '../../../constants/datetime-constants'

interface TimerSettings {
  studyDuration: number
  breakDuration: number
}

const usePomodoro = (
  settings: TimerSettings = {
    studyDuration: 25 * 60 * 1000,
    breakDuration: 5 * 60 * 1000,
  }
) => {
  const { timerState, progressSession } = usePomodoroDataStore()
  const { updateTimer } = usePomodoroTimerStateCrudHandler()
  const {
    asyncStates,
    listenerStatus,
    initializeSession,
    toggleCycle,
    saveSession,
  } = usePomodoroSessionCrudHandler()

  const { handleGainExp } = useGamificationSystem()

  const { studyDuration, breakDuration } = settings

  const currentType =
    progressSession?.progressCycle && progressSession?.state === 'progress'
      ? progressSession.progressCycle.type
      : 'study'

  const isProgressSession = progressSession?.state === 'progress'
  const isListenedSession = asyncStates.initializeSession?.status === 'success'
  const needInitialize = !isProgressSession && isListenedSession

  useEffect(() => {
    if (
      !isListenedSession &&
      !isProgressSession &&
      listenerStatus.progressSession === 'listening'
    ) {
      initializeSession('testSubject In init', currentType)
    }
  }, [
    currentType,
    isProgressSession,
    isListenedSession,
    listenerStatus.progressSession,
  ])

  // defaultStateは、timerStateが初期ロード時に存在しない場合のフォールバックとして使用
  const defaultState: PomodoroTimerStateWrite = useMemo(
    () => ({
      status: 'idle',
      startTime: 0,
      stoppedAt: 0,
      duration: studyDuration,
    }),
    [studyDuration]
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
          ? studyDuration
          : breakDuration

    return {
      ...baseState,
      stoppedAt: safeStoppedAt,
      duration: adjustedDuration,
    }
  }, [timerState, defaultState, currentType, studyDuration, breakDuration])

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
    async (nextType?: PomodoroCycleType) => {
      const result = await toggleCycle('testSubject')
      if (!result?.success) {
        return
      }

      const actualNextType =
        nextType || (currentType === 'study' ? 'break' : 'study')

      const nextDuration =
        actualNextType === 'study' ? studyDuration : breakDuration

      const newTimerStateForSwitch: PomodoroTimerStateWrite = {
        status: 'running',
        startTime: Date.now(),
        stoppedAt: null,
        duration: nextDuration,
      }

      updateTimer(newTimerStateForSwitch, defaultState)
    },
    [
      studyDuration,
      breakDuration,
      updateTimer,
      defaultState,
      currentType,
      toggleCycle,
    ]
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
      sessionSummary.totalStudyDuration / MINUTES_IN_MS
    )

    const result = await saveSession()
    if (result?.success) {
      timer.reset()
      handleGainExp(expAmount, 'completeSession')
    }
  }, [sessionSummary.totalStudyDuration, handleGainExp, saveSession])

  return {
    ...timer, // useTimerからのプロパティ
    isProgressSession,
    isListenedSession,
    needInitialize,
    currentType, // 現在のポモドーロサイクルタイプ
    switchMode, // モード切り替え関数
    status: currentState.status,
    sessionSummary,
    handleCompleteSession,
  }
}

export default usePomodoro
