import type { IDBService } from '../../../../types/db/db-service-interface'
import type {
  PomodoroProgressSessionRead,
  PomodoroProgressSessionWrite,
} from '../documents/pomodoro-progress-session-document'
import type {
  PomodoroSessionRead,
  PomodoroSessionWrite,
} from '../documents/pomodoro-session-document'

export type PomodoroSessionRepository = IDBService<
  PomodoroSessionRead,
  PomodoroSessionWrite
>

export type PomodoroProgressSessionRepository = IDBService<
  PomodoroProgressSessionRead,
  PomodoroProgressSessionWrite
>
