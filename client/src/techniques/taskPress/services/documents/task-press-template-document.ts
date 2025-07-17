import type {
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { TaskPressTaskType } from './task-press-shared-types'

/** 共通テンプレート */
interface BaseTemplate {
  title: string
  subject: string
  type: TaskPressTaskType
}

/* -------------------- ProblemSet -------------------- */

export interface TaskPressProblemSetTemplate extends BaseTemplate {
  type: 'problemSet'
  timePerPage: number
}

/* -------------------- Report -------------------- */

export interface TaskPressReportStepTemplate {
  order: number
  text: string
  estimatedTime: number
}

export interface TaskPressReportTemplate extends BaseTemplate {
  type: 'report'
  steps: TaskPressReportStepTemplate[]
}

type TaskPressTemplate = TaskPressProblemSetTemplate | TaskPressReportTemplate

export type TaskPressTemplateRead = MakeDocumentRead<TaskPressTemplate>
export type TaskPressTemplateWrite = MakeDocumentWrite<TaskPressTemplate>
