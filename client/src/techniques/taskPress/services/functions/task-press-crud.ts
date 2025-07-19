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

export const taskPressPushCompletedPages = async (
  taskRepo: TaskPressTaskRepository,
  uid: string,
  taskId: string,
  completedPages: number[]
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

  const newCompletedPages = Array.from(
    new Set([...task.completedPages, ...completedPages])
  ).sort((a, b) => a - b)

  await taskRepo.update({ completedPages: newCompletedPages }, [uid, taskId])

  return true
}

export const taskPressPushCompletedStepOrders = async (
  taskRepo: TaskPressTaskRepository,
  uid: string,
  taskId: string,
  completedStepOrders: number[]
): Promise<boolean> => {
  const task = await taskRepo.read([uid, taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません: uid=${uid}, taskId=${taskId}`)
  }

  if (task.type !== 'report') {
    throw new Error(`不正なタスクタイプ: expected 'report', got '${task.type}'`)
  }

  const newCompletedStepOrders = Array.from(
    new Set([...task.completedStepOrders, ...completedStepOrders])
  ).sort((a, b) => a - b)

  await taskRepo.update({ completedStepOrders: newCompletedStepOrders }, [
    uid,
    taskId,
  ])

  return true
}
