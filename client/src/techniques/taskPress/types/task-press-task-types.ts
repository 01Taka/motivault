export type TaskPressTaskType = 'problemSet' | 'report'

export interface TaskPressTaskBase {
  id: string
  type: TaskPressTaskType
  title: string
  deadline: string
}

export interface TaskPressProblemSetTask extends TaskPressTaskBase {
  type: 'problemSet'
  pages: number[]
  completedPages: number[]
  timePerPage: number
}

export interface TaskPressReportStep {
  order: number
  text: string
  estimatedTime: number
}

export interface TaskPressReportTask extends TaskPressTaskBase {
  type: 'report'
  steps: TaskPressReportStep[]
  completedStepOrders: number[]
}

export type TaskPressTask = TaskPressProblemSetTask | TaskPressReportTask
