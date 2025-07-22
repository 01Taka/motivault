import type { IDBService } from '../../../../types/db/db-service-interface'
import type {
  TaskPressTaskRead,
  TaskPressTaskWrite,
} from '../documents/task-press-task-document'
import type {
  TaskPressTemplateRead,
  TaskPressTemplateWrite,
} from '../documents/task-press-template-document'

export type TaskPressTaskRepository = IDBService<
  TaskPressTaskRead,
  TaskPressTaskWrite
>

export type TaskPressTemplateRepository = IDBService<
  TaskPressTemplateRead,
  TaskPressTemplateWrite
>
