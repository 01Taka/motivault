import type { IDBService } from '../../../../types/db/db-service-interface'
import type {
  HabitMateHabitRead,
  HabitMateHabitWrite,
} from '../documents/habit-mate-habit-document'

export type HabitMateHabitRepository = IDBService<
  HabitMateHabitRead,
  HabitMateHabitWrite
>
