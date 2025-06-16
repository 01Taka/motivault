import { useCallback, useEffect, useRef } from 'react'
import useRemainingTime from '../../../../hooks/timer/useRemainingTime'
import type { PomodoroTimerState, TimerType } from '../types/pomodoro-types'

interface TimerSettings {
  studyDuration: number
  breakDuration: number
}

interface UsePomodoroTimerOptions {
  state: PomodoroTimerState
  settings?: TimerSettings
  autoSwitchToStudy?: boolean
  autoSwitchToBreak?: boolean
  updateState: (state: Partial<PomodoroTimerState>) => void
  getNow?: () => number
}

const usePomodoroTimer = ({
  state,
  settings = {
    studyDuration: 25 * 60 * 1000, // 25分
    breakDuration: 5 * 60 * 1000, // 5分
  },
  autoSwitchToStudy = true,
  autoSwitchToBreak = true,
  updateState,
  getNow = () => Date.now(),
}: UsePomodoroTimerOptions) => {
  const { status, type, duration, stoppedAt, expectedEndAt } = state

  const { studyDuration, breakDuration } = settings

  const hasMounted = useRef(false)

  // 開始
  const start = useCallback(() => {
    const now = getNow()
    updateState({
      status: 'running',
      expectedEndAt: now + duration,
      stoppedAt: null,
    })
  }, [duration, getNow, updateState])

  // 一時停止
  const pause = useCallback(() => {
    if (status === 'running') {
      updateState({
        status: 'paused',
        stoppedAt: getNow(),
      })
    }
  }, [status, getNow, updateState])

  // 再開
  const resume = useCallback(() => {
    if (status === 'paused' && stoppedAt && expectedEndAt) {
      const pauseDuration = getNow() - stoppedAt
      updateState({
        status: 'running',
        expectedEndAt: expectedEndAt + pauseDuration,
        stoppedAt: null,
      })
    }
  }, [status, stoppedAt, expectedEndAt, getNow, updateState])

  // リセット
  const reset = useCallback(() => {
    updateState({
      status: 'idle',
      expectedEndAt: 0,
      stoppedAt: null,
    })
  }, [updateState])

  const refresh = useCallback(
    (studyDuration: number) => {
      const now = getNow()
      updateState({
        status: 'idle',
        type: 'study',
        duration: studyDuration,
        expectedEndAt: now + studyDuration,
        stoppedAt: now,
      })
    },
    [getNow, updateState]
  )

  // モード切り替え（手動）
  const switchMode = useCallback(
    (nextType?: TimerType) => {
      const nextT = nextType || (type === 'study' ? 'break' : 'study')
      const now = getNow()
      const nextDuration = nextT === 'study' ? studyDuration : breakDuration
      updateState({
        type: nextT,
        status: 'running',
        expectedEndAt: now + nextDuration,
        stoppedAt: null,
      })
    },
    [getNow, studyDuration, breakDuration, updateState]
  )

  // 経過・残り時間の取得
  const { remainingTime, elapsedTime } = useRemainingTime({
    isRunning: status === 'running',
    stoppedAt: stoppedAt ?? 0,
    expectedEndAt,
    expectedDuration: duration,
    getNow,
  })

  // タイマー終了時の自動切替処理
  useEffect(() => {
    if (!hasMounted.current) {
      if (remainingTime > 0) {
        hasMounted.current = true
      }
      return
    }

    if (status === 'running' && remainingTime <= 0) {
      const now = getNow()
      const shouldSwitchTo =
        type === 'study' && autoSwitchToBreak
          ? 'break'
          : type === 'break' && autoSwitchToStudy
            ? 'study'
            : null

      if (shouldSwitchTo) {
        const nextDuration =
          shouldSwitchTo === 'study' ? studyDuration : breakDuration
        updateState({
          type: shouldSwitchTo,
          status: 'running',
          expectedEndAt: now + nextDuration,
          stoppedAt: null,
        })
      } else {
        updateState({ status: 'finished' })
      }
    }
  }, [
    status,
    remainingTime,
    type,
    autoSwitchToBreak,
    autoSwitchToStudy,
    studyDuration,
    breakDuration,
    getNow,
    updateState,
  ])

  return {
    remainingTime,
    elapsedTime,
    status,
    type,
    start,
    pause,
    resume,
    reset,
    refresh,
    switchMode,
  }
}

export default usePomodoroTimer
