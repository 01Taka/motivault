import type { PomodoroTimerState } from '../types/pomodoro-types'

export const getNow = () => Date.now()

export const isSerializable = (value: any): boolean => {
  try {
    JSON.stringify(value)
    return true
  } catch {
    return false
  }
}

export const filterValidStateFields = (
  obj: Partial<PomodoroTimerState>,
  base: PomodoroTimerState
): Partial<PomodoroTimerState> => {
  const keys = Object.keys(base) as (keyof PomodoroTimerState)[]
  const filtered: Record<string, any> = {}

  for (const key of keys) {
    if (key in obj) {
      filtered[key] = obj[key]
    }
  }

  return filtered
}

export const shouldSaveStats = (
  prev: PomodoroTimerState,
  next: Partial<PomodoroTimerState>
): boolean => {
  return (
    ['running', 'paused'].includes(prev.status) &&
    !!next.status &&
    ['finished', 'idle'].includes(next.status)
  )
}

export const calcRunningTime = (
  prev: PomodoroTimerState,
  next: Partial<PomodoroTimerState>
): number => {
  const startAt = prev.expectedEndAt - prev.duration
  const endAt = next.stoppedAt ?? getNow()
  return Math.max(0, endAt - startAt)
}
