import type {
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { ISODate } from '../../../../types/utils/datetime-types'
import type { HabitMateHabitLevel } from '../../types/habit-level-types'

export interface HabitMateHabit {
  level: HabitMateHabitLevel // 1 ~ 5
  habit: string
  isExecutable: boolean // セルフチェックで達成可能にチェックを入れたか
  timing: string
  startedAt: number
  workedDate: ISODate[]
  isFailed: boolean
  status: 'active' | 'paused' | 'completed'
  resetCount: number
}

export type HabitMateHabitRead = MakeDocumentRead<HabitMateHabit>
export type HabitMateHabitWrite = MakeDocumentWrite<HabitMateHabit>
