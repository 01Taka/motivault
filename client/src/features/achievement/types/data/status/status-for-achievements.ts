import type { ClientStatusForAchievement } from './client-status-data-type'
import type { PomodoroStatus } from './techniques/pomodoro-status-data-type'

export type StatusForAchievements = ClientStatusForAchievement & PomodoroStatus
