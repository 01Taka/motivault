import type { TaskPressTaskRead } from '../services/documents/task-press-task-document'
import type { TaskPressTemplateRead } from '../services/documents/task-press-template-document'
import type { TaskPressMergedTask } from '../types/task-press-merge-task-types'

export function mergeTaskWithTemplate(
  task: TaskPressTaskRead,
  template: TaskPressTemplateRead
): TaskPressMergedTask {
  if (task.type !== template.type) {
    throw new Error('Task and Template types do not match')
  }

  if (task.createdById !== template.createdById) {
    throw new Error(
      'Task and Template have different owners (createdById mismatch)'
    )
  }

  if (task.templateId !== template.docId) {
    throw new Error(
      'Task references a different template (templateId mismatch)'
    )
  }

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
