import type { TaskPressTaskRead } from '../services/documents/task-press-task-document'
import type { TaskPressTemplateRead } from '../services/documents/task-press-template-document'
import type { TaskPressMergedTask } from '../types/task-press-merge-task-types'

/**
 * Represents the result of an individual task and template merge operation.
 * If successful, 'mergedTask' will contain the result.
 * If unsuccessful, 'error' will describe why the merge failed.
 */
export type MergeTaskResult =
  | { success: true; mergedTask: TaskPressMergedTask }
  | {
      success: false
      error: string
      task: TaskPressTaskRead
      template?: TaskPressTemplateRead
    }

/**
 * Validates a task and template for merging.
 * @param task The task to validate.
 * @param template The template to validate against.
 * @returns An error message string if validation fails, otherwise null.
 */
function validateTaskAndTemplate(
  task: TaskPressTaskRead,
  template: TaskPressTemplateRead
): string | null {
  if (task.type !== template.type) {
    return `Type mismatch: task type '${task.type}' !== template type '${template.type}'`
  }
  if (task.createdById !== template.createdById) {
    return `CreatedById mismatch: task createdById '${task.createdById}' !== template createdById '${template.createdById}'`
  }
  if (task.templateId !== template.docId) {
    return `Template ID mismatch: task templateId '${task.templateId}' !== template docId '${template.docId}'`
  }
  return null // No validation errors
}

/**
 * Attempts to merge a single task with its corresponding template.
 * Instead of throwing errors, it returns a MergeTaskResult indicating success or failure.
 * @param task The task to merge.
 * @param template The template to merge with.
 * @returns A MergeTaskResult object.
 */
export function mergeTaskWithTemplate(
  task: TaskPressTaskRead,
  template: TaskPressTemplateRead
): MergeTaskResult {
  const validationError = validateTaskAndTemplate(task, template)
  if (validationError) {
    return { success: false, error: validationError, task, template }
  }

  if (task.type === 'problemSet' && template.type === 'problemSet') {
    return {
      success: true,
      mergedTask: {
        type: 'problemSet',
        title: template.title,
        subject: template.subject,
        deadline: task.deadline,
        pages: task.pages,
        timePerPage: template.timePerPage,
        completedPages: task.completedPages,
        // DBデータ
        createdById: task.createdById,
        taskDocId: task.docId,
        templateDocId: template.docId,
      },
    }
  }

  if (task.type === 'report' && template.type === 'report') {
    return {
      success: true,
      mergedTask: {
        type: 'report',
        title: template.title,
        subject: template.subject,
        deadline: task.deadline,
        steps: template.steps.map((step) => ({
          ...step,
          completed: task.completedStepOrders.includes(step.order),
        })),
        completedStepOrders: task.completedStepOrders,
        createdById: task.createdById,
        taskDocId: task.docId,
        templateDocId: template.docId,
      },
    }
  }

  // This should ideally not be reached if validation is comprehensive,
  // but acts as a fallback for unsupported combinations.
  return {
    success: false,
    error: `Unsupported task/template type combination: task type '${task.type}', template type '${template.type}'`,
    task,
    template,
  }
}

/**
 * Represents the comprehensive result of merging multiple tasks with templates.
 * Contains both an array of all merge results (success or failure) and a separate array
 * of only the successfully merged tasks.
 */
export type AllMergeResults = {
  allResults: MergeTaskResult[]
  successfulMerges: TaskPressMergedTask[]
}

/**
 * Merges a list of tasks with a list of templates.
 * It attempts to merge all tasks and returns an object containing:
 * - `allResults`: an array of MergeTaskResult objects, one for each task (success or failure).
 * - `successfulMerges`: an array containing only the successfully merged TaskPressMergedTask objects.
 * @param tasks An array of tasks to merge.
 * @param templates An array of templates available for merging.
 * @returns An AllMergeResults object.
 */
export const mergeTasksWithTemplates = (
  tasks: TaskPressTaskRead[],
  templates: TaskPressTemplateRead[]
): AllMergeResults => {
  const templatesMap = new Map(
    templates.map((template) => [template.docId, template])
  )

  const allResults: MergeTaskResult[] = []
  const successfulMerges: TaskPressMergedTask[] = []

  tasks.forEach((task) => {
    const template = templatesMap.get(task.templateId)
    let result: MergeTaskResult

    if (!template) {
      result = {
        success: false,
        error: `Template not found for task.templateId: '${task.templateId}'`,
        task,
      }
    } else {
      result = mergeTaskWithTemplate(task, template)
    }

    allResults.push(result)

    if (result.success) {
      successfulMerges.push(result.mergedTask)
    }
  })

  return {
    allResults,
    successfulMerges,
  }
}
