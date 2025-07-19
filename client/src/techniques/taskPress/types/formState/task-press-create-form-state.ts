import type { TaskPressTaskType } from '../../services/documents/task-press-shared-types'

interface FormStateCreate {
  type: TaskPressTaskType
  templateId: string | '' // 明示的に空文字を許容
}

interface FormStateBase {
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

export type TaskPressCreateFormState = FormStateCreate &
  ProblemSetFormState &
  ReportFormState

export type TaskPressUpdateFormState = ProblemSetFormState & ReportFormState
