import { parseISO, differenceInCalendarDays } from 'date-fns'
import type {
  MergedProblemSetTask,
  MergedReportStep,
  MergedReportTask,
  TaskPressMergedTask,
} from '../types/task-press-merge-task-types'

// ---
// ヘルパー関数
// ---

/**
 * 未完了のページから指定された数の次のページを取得します。
 *
 * @param pages すべてのページ番号の配列
 * @param completedPages 完了済みのページ番号の配列
 * @param length 取得するページの最大数
 * @returns 次のページの配列
 */
export const getNextPages = (
  pages: number[],
  completedPages: number[],
  length: number
): number[] => {
  return pages.filter((page) => !completedPages.includes(page)).slice(0, length)
}

export const getNextStep = (
  steps: MergedReportStep[],
  completedStepOrders: number[] = []
) => {
  const completedSteps = steps.filter(
    (step) => !step.completed && !completedStepOrders.includes(step.order)
  )
  return completedSteps.length > 0 ? completedSteps[0] : null
}

/**
 * 期限日までの残り日数を計算します。
 *
 * @param deadline 期限日のISO形式文字列
 * @returns 残り日数
 */
export const getRemainingDays = (deadline: string): number => {
  const today = new Date()
  const deadlineDate = parseISO(deadline)
  return differenceInCalendarDays(deadlineDate, today)
}

/**
 * 問題集タスクの残りページ数を計算します。
 *
 * @param task 問題集タスク
 * @returns 残りページ数
 */
const getRemainingProblemSetPages = (task: MergedProblemSetTask): number[] => {
  return task.pages.filter((page) => !task.completedPages.includes(page))
}

const getRemainingReportSteps = (
  task: MergedReportTask
): MergedReportStep[] => {
  return task.steps.filter((step) => !step.completed)
}

/**
 * ステップベースのタスクの残りステップの推定合計時間を計算します。
 *
 * @param task ステップベースのタスク
 * @returns 残りステップの推定合計時間
 */
const getRemainingStepEstimatedTime = (task: MergedReportTask): number => {
  return task.steps.reduce((totalTime, step) => {
    return step.completed ? totalTime : totalTime + step.estimatedTime
  }, 0)
}

/**
 * タスクの1日あたりの推定時間を計算します。
 *
 * @param task 計算対象のタスク
 * @param remainingDays タスクの残り日数
 * @returns 1日あたりの推定時間
 * @throws remainingDaysが0以下の場合にエラーをスローします。
 */
export const getDailyEstimatedTime = (
  task: TaskPressMergedTask,
  remainingDays: number
): number => {
  if (remainingDays <= 0) {
    // 0で割ることを避けるため、または期限切れのタスクの場合の処理
    console.warn(
      'Remaining days are zero or negative. Cannot calculate daily estimated time.'
    )
    return 0 // またはエラーをスローすることも検討してください
  }

  if (task.type === 'problemSet') {
    const remainingPages = getRemainingProblemSetPages(task).length
    return (remainingPages * task.timePerPage) / remainingDays
  } else {
    const totalEstimatedTime = getRemainingStepEstimatedTime(task)
    return totalEstimatedTime / remainingDays
  }
}

export const getRemainingItemCount = (task: TaskPressMergedTask) => {
  return task.type === 'problemSet'
    ? getRemainingProblemSetPages(task).length
    : getRemainingReportSteps(task).length
}
