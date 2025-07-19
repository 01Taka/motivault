/** ProblemSet 合成済み型 */
export interface MergedProblemSetTask {
  createdById: string
  taskDocId: string
  templateDocId: string
  type: 'problemSet'
  title: string
  subject: string
  deadline: string
  pages: number[]
  timePerPage: number
  completedPages: number[]
}

/** Report 合成済み型 */
export interface MergedReportStep {
  order: number
  text: string
  estimatedTime: number
  completed: boolean
}

export interface MergedReportTask {
  createdById: string
  taskDocId: string
  templateDocId: string
  type: 'report'
  title: string
  subject: string
  deadline: string
  steps: MergedReportStep[]
  completedStepOrders: number[]
}

/** 共通合成済みタスク */
export type TaskPressMergedTask = MergedProblemSetTask | MergedReportTask
