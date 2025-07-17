import type { TaskPressTaskType } from '../../services/documents/task-press-shared-types'

interface FormStateBase {
  type: TaskPressTaskType
  templateId: string | '' // 明示的に空文字を許容
  deadline: string
  title: string
  subject: string
}

interface ProblemSetFormState extends FormStateBase {
  timePerPage: number
  pages: number[]
}

export interface TaskPressFormStateStep {
  text: string
  estimatedTime: number
}

interface ReportFormState extends FormStateBase {
  steps: TaskPressFormStateStep[]
}

export type TaskPressCreateFormState = ProblemSetFormState & ReportFormState
