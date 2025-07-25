import type { IDBService } from '../../../../types/db/db-service-interface'
import type {
  HabitMateHabitRead,
  HabitMateHabitWrite,
} from '../documents/habit-mate-habit-document'
import type {
  HabitMateMetadataRead,
  HabitMateMetadataWrite,
} from '../documents/habit-mate-metadata-document'

export type HabitMateMetadataRepository = IDBService<
  HabitMateMetadataRead,
  HabitMateMetadataWrite
>

export type HabitMateHabitRepository = IDBService<
  HabitMateHabitRead,
  HabitMateHabitWrite
>
