import { MINUTES_IN_MS } from '../../../constants/datetime-constants'

type PomodoroTimerMode = 'quick' | 'focus' | 'deep'

export const TIMER_MODE_SETTINGS = {
  quick: {
    study: 10 * MINUTES_IN_MS,
    breakChoices: [0.5 * MINUTES_IN_MS, 2 * MINUTES_IN_MS, 5 * MINUTES_IN_MS],
  },
  focus: {
    study: 25 * MINUTES_IN_MS,
    breakChoices: [1 * MINUTES_IN_MS, 5 * MINUTES_IN_MS, 10 * MINUTES_IN_MS],
  },
  deep: {
    study: 45 * MINUTES_IN_MS,
    breakChoices: [5 * MINUTES_IN_MS, 10 * MINUTES_IN_MS, 15 * MINUTES_IN_MS],
  },
}
