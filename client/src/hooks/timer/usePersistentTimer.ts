import { useCallback, useEffect, useState } from 'react'
import useRemainingTime from './useRemainingTime'

type TimerStorage = {
  startTime: number
  stoppedAt: number
  isRunning: boolean
}

const getNow = () => Date.now()

const usePersistentTimer = (key: string, expectedDuration: number) => {
  const [startTime, setStartTime] = useState<number>(0)
  const [stoppedAt, setStoppedAt] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const expectedEndAt = startTime + expectedDuration

  const { remainingTime, elapsedTime, remainingTimeRef } = useRemainingTime({
    isRunning,
    stoppedAt,
    expectedEndAt,
    expectedDuration,
    getNow,
  })

  // 状態の保存（引数で受け取る形式に変更）
  const saveState = useCallback(
    (state: TimerStorage) => {
      setStartTime(state.startTime)
      setStoppedAt(state.stoppedAt)
      setIsRunning(state.isRunning)
      localStorage.setItem(key, JSON.stringify(state))
    },
    [key]
  )

  // 状態の復元
  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        const { startTime, stoppedAt, isRunning } = JSON.parse(
          saved
        ) as TimerStorage
        setStartTime(startTime)
        setStoppedAt(stoppedAt)
        setIsRunning(isRunning)
      } catch (e) {
        console.error('Failed to parse timer state', e)
      }
    }
  }, [key])

  const start = useCallback(() => {
    const now = getNow()
    const newStartTime = isRunning
      ? startTime
      : stoppedAt > 0
        ? now - (stoppedAt - startTime)
        : now

    saveState({
      startTime: newStartTime,
      stoppedAt: 0,
      isRunning: true,
    })
  }, [isRunning, startTime, stoppedAt, saveState])

  const stop = useCallback(() => {
    const now = getNow()
    saveState({
      startTime,
      stoppedAt: now,
      isRunning: false,
    })
  }, [startTime, saveState])

  const reset = useCallback(() => {
    saveState({
      startTime: 0,
      stoppedAt: 0,
      isRunning: false,
    })
  }, [saveState])

  return {
    remainingTime,
    elapsedTime,
    isRunning,
    start,
    stop,
    reset,
    remainingTimeRef,
  }
}

export default usePersistentTimer
