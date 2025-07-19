import type { TaskPressTaskRead } from '../services/documents/task-press-task-document'
import type { TaskPressTemplateRead } from '../services/documents/task-press-template-document'
import type { TaskPressMergedTask } from '../types/task-press-merge-task-types'

function validateTaskAndTemplate(
  task: TaskPressTaskRead,
  template: TaskPressTemplateRead
) {
  if (task.type !== template.type) {
    throw new Error(`Type mismatch: ${task.type} !== ${template.type}`)
  }
  if (task.createdById !== template.createdById) {
    throw new Error(
      `CreatedById mismatch: ${task.createdById} !== ${template.createdById}`
    )
  }
  if (task.templateId !== template.docId) {
    throw new Error(
      `Template ID mismatch: ${task.templateId} !== ${template.docId}`
    )
  }
}

export function mergeTaskWithTemplate(
  task: TaskPressTaskRead,
  template: TaskPressTemplateRead
): TaskPressMergedTask {
  validateTaskAndTemplate(task, template)

  if (task.type === 'problemSet' && template.type === 'problemSet') {
    return {
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
    }
  }

  if (task.type === 'report' && template.type === 'report') {
    return {
      type: 'report',
      title: template.title,
      subject: template.subject,
      deadline: task.deadline,
      steps: template.steps.map((step) => ({
        ...step,
        completed: task.completedStepOrders.includes(step.order),
      })),
      createdById: task.createdById,
      taskDocId: task.docId,
      templateDocId: template.docId,
    }
  }

  // ここまで来るのは型チェックが甘いときだけ
  throw new Error('Unsupported task/template type combination')
}

export const mergeTasksWithTemplates = (
  tasks: TaskPressTaskRead[],
  templates: TaskPressTemplateRead[]
) => {
  const templatesMap = Object.fromEntries(
    templates.map((template) => [template.docId, template])
  )

  return tasks.map((task) => {
    const template = templatesMap[task.templateId]
    if (!template) {
      throw new Error(
        `Template not found for task.templateId: ${task.templateId}`
      )
    }
    return mergeTaskWithTemplate(task, template)
  })
}
