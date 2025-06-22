import type { PomodoroStorage } from '../types/pomodoro-types'

const STORAGE_KEYS = {
  state: 'pomodoro-timer-state',
  stats: 'pomodoro-timer-stats',
}

export const LocalStorageProvider: PomodoroStorage = {
  getState() {
    const raw = localStorage.getItem(STORAGE_KEYS.state)
    return raw ? JSON.parse(raw) : null
  },
  setState(state) {
    localStorage.setItem(STORAGE_KEYS.state, JSON.stringify(state))
  },
  getStats() {
    const raw = localStorage.getItem(STORAGE_KEYS.stats)
    return raw ? JSON.parse(raw) : null
  },
  setStats(stats) {
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(stats))
  },
}
