import type {
  TaskPressTaskRepository,
  TaskPressTemplateRepository,
} from '../documents/repositories'
import type { TaskPressTaskWrite } from '../documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../documents/task-press-template-document'

export const createNewTaskPressTask = async (
  taskRepo: TaskPressTaskRepository,
  templateRepo: TaskPressTemplateRepository,
  uid: string,
  task: TaskPressTaskWrite,
  template: TaskPressTemplateWrite
): Promise<void> => {
  const templateExists =
    task.templateId && (await isExistTemplate(uid, templateRepo))

  if (templateExists) {
    await taskRepo.create(task, [uid])
  } else {
    const createdTemplate = await templateRepo.create(template, [uid])
    if (!createdTemplate?.id) {
      throw new Error('テンプレートの作成に失敗しました')
    }
    await taskRepo.create({ ...task, templateId: createdTemplate.id }, [uid])
  }
}

const isExistTemplate = async (
  uid: string,
  templateRepo: TaskPressTemplateRepository
): Promise<boolean> => {
  const data = await templateRepo.read([uid])
  return Boolean(data && data.isActive)
}

export const taskPressUpdateProblemSetPages = async (
  taskRepo: TaskPressTaskRepository,
  uid: string,
  taskId: string,
  pagesToComplete: number[] = [],
  pagesToUncomplete: number[] = [] // New parameter for pages to uncomplete
): Promise<boolean> => {
  const task = await taskRepo.read([uid, taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません: uid=${uid}, taskId=${taskId}`)
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

  await taskRepo.update({ completedPages: newCompletedPages }, [uid, taskId])

  return true
}

export const taskPressUpdateReportStepOrders = async (
  taskRepo: TaskPressTaskRepository,
  uid: string,
  taskId: string,
  stepOrdersToComplete: number[] = [],
  stepOrdersToUncomplete: number[] = [] // New parameter for step orders to uncomplete
): Promise<boolean> => {
  const task = await taskRepo.read([uid, taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません: uid=${uid}, taskId=${taskId}`)
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
    uid,
    taskId,
  ])

  return true
}

export const updateTaskPressTask = async (
  taskRepo: TaskPressTaskRepository,
  uid: string,
  taskId: string,
  data: Partial<TaskPressTaskWrite>
) => {
  await taskRepo.update(data, [uid, taskId])
}

export const updateTaskPressTemplate = async (
  templateRepo: TaskPressTemplateRepository,
  uid: string,
  taskId: string,
  data: Partial<TaskPressTemplateWrite>
) => {
  await templateRepo.update(data, [uid, taskId])
}
