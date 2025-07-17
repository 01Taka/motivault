import type {
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { TaskPressTaskType } from './task-press-shared-types'

/** 共通タスク */
interface BaseTask {
  templateId: string
  deadline: string
  type: TaskPressTaskType
}

export interface TaskPressProblemSetTask extends BaseTask {
  type: 'problemSet'
  pages: number[]
  completedPages: number[]
}

export interface TaskPressReportTask extends BaseTask {
  type: 'report'
  completedStepOrders: number[]
}

type TaskPressTask = TaskPressProblemSetTask | TaskPressReportTask

export type ReadTaskPressTask = MakeDocumentRead<TaskPressTask>
export type WriteTaskPressTask = MakeDocumentWrite<TaskPressTask>
