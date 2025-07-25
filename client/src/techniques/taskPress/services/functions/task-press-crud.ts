import type {
  TaskPressTaskRepository,
  TaskPressTemplateRepository,
} from '../repositories/repositories'
import type { TaskPressTaskWrite } from '../documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../documents/task-press-template-document'

export const createNewTaskPressTask = async (
  taskRepo: TaskPressTaskRepository,
  templateRepo: TaskPressTemplateRepository,
  task: TaskPressTaskWrite,
  template: TaskPressTemplateWrite
): Promise<void> => {
  const templateExists =
    task.templateId && (await isExistTemplate(templateRepo))

  if (templateExists) {
    await taskRepo.create(task, [])
  } else {
    const createdTemplate = await templateRepo.create(template, [])
    if (!createdTemplate?.id) {
      throw new Error('テンプレートの作成に失敗しました')
    }
    await taskRepo.create({ ...task, templateId: createdTemplate.id }, [])
  }
}

const isExistTemplate = async (
  templateRepo: TaskPressTemplateRepository
): Promise<boolean> => {
  const data = await templateRepo.read([])
  return Boolean(data && data.isActive)
}

export const taskPressUpdateProblemSetPages = async (
  taskRepo: TaskPressTaskRepository,
  taskId: string,
  pagesToComplete: number[] = [],
  pagesToUncomplete: number[] = [] // New parameter for pages to uncomplete
): Promise<boolean> => {
  const task = await taskRepo.read([taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません, taskId=${taskId}`)
  }

  if (task.type !== 'problemSet') {
    throw new Error(
      `不正なタスクタイプ: expected 'problemSet', got '${task.type}'`
    )
  }

  // Start with current completed pages
  let currentCompletedPages = new Set(task.completedPages)

  // Add pages to complete
  pagesToComplete.forEach((page) => currentCompletedPages.add(page))

  // Remove pages to uncomplete
  pagesToUncomplete.forEach((page) => currentCompletedPages.delete(page))

  const newCompletedPages = Array.from(currentCompletedPages).sort(
    (a, b) => a - b
  )

  await taskRepo.update({ completedPages: newCompletedPages }, [taskId])

  return true
}

export const taskPressUpdateReportStepOrders = async (
  taskRepo: TaskPressTaskRepository,
  taskId: string,
  stepOrdersToComplete: number[] = [],
  stepOrdersToUncomplete: number[] = [] // New parameter for step orders to uncomplete
): Promise<boolean> => {
  const task = await taskRepo.read([taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません: taskId=${taskId}`)
  }

  if (task.type !== 'report') {
    throw new Error(`不正なタスクタイプ: expected 'report', got '${task.type}'`)
  }

  // Start with current completed step orders
  let currentCompletedStepOrders = new Set(task.completedStepOrders)

  // Add step orders to complete
  stepOrdersToComplete.forEach((step) => currentCompletedStepOrders.add(step))

  // Remove step orders to uncomplete
  stepOrdersToUncomplete.forEach((step) =>
    currentCompletedStepOrders.delete(step)
  )

  const newCompletedStepOrders = Array.from(currentCompletedStepOrders).sort(
    (a, b) => a - b
  )

  await taskRepo.update({ completedStepOrders: newCompletedStepOrders }, [
    taskId,
  ])

  return true
}

export const updateTaskPressTask = async (
  taskRepo: TaskPressTaskRepository,
  taskId: string,
  data: Partial<TaskPressTaskWrite>
) => {
  await taskRepo.update(data, [taskId])
}

export const updateTaskPressTemplate = async (
  templateRepo: TaskPressTemplateRepository,
  taskId: string,
  data: Partial<TaskPressTemplateWrite>
) => {
  await templateRepo.update(data, [taskId])
}
