import type {
  TaskPressTaskRepository,
  TaskPressTemplateRepository,
} from '../repositories/repositories'
import type { TaskPressTaskWrite } from '../documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../documents/task-press-template-document'

export const createNewTaskPressTask = async (
  taskRepo: TaskPressTaskRepository,
  templateRepo: TaskPressTemplateRepository,
  taskId: string,
  task: TaskPressTaskWrite,
  template: TaskPressTemplateWrite
): Promise<void> => {
  const existingTemplate = task.templateId
    ? await templateRepo.read([task.templateId])
    : null

  if (
    existingTemplate &&
    existingTemplate.dependsTaskIds &&
    existingTemplate.dependsTaskIds.includes(taskId)
  ) {
    throw new Error(
      `タスクのドキュメントIDがテンプレートの依存関係のIDと競合しています。taskId=${taskId}, templateId=${task.templateId}`
    )
  }

  if (existingTemplate) {
    await templateRepo.update(
      { dependsTaskIds: [...(existingTemplate.dependsTaskIds ?? []), taskId] },
      [existingTemplate.docId]
    )
    await taskRepo.createWithId(task, [taskId])
  } else {
    const createdTemplate = await templateRepo.create(template, [])
    if (!createdTemplate?.id) {
      throw new Error(
        'テンプレートの作成に失敗しました。templateIdが取得できませんでした'
      )
    }
    await taskRepo.createWithId({ ...task, templateId: createdTemplate.id }, [
      taskId,
    ])
  }
}

export const taskPressUpdateProblemSetPages = async (
  taskRepo: TaskPressTaskRepository,
  taskId: string,
  pagesToComplete: number[] = [],
  pagesToUncomplete: number[] = []
): Promise<boolean> => {
  const task = await taskRepo.read([taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません。taskId=${taskId}`)
  }

  if (task.type !== 'problemSet') {
    throw new Error(
      `不正なタスクタイプです。expected 'problemSet', got '${task.type}', taskId=${taskId}`
    )
  }

  let currentCompletedPages = new Set(task.completedPages)
  pagesToComplete.forEach((page) => currentCompletedPages.add(page))
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
  stepOrdersToUncomplete: number[] = []
): Promise<boolean> => {
  const task = await taskRepo.read([taskId])

  if (!task) {
    throw new Error(`タスクが見つかりません。taskId=${taskId}`)
  }

  if (task.type !== 'report') {
    throw new Error(
      `不正なタスクタイプです。expected 'report', got '${task.type}', taskId=${taskId}`
    )
  }

  let currentCompletedStepOrders = new Set(task.completedStepOrders)
  stepOrdersToComplete.forEach((step) => currentCompletedStepOrders.add(step))
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
  try {
    await taskRepo.update(data, [taskId])
  } catch (error) {
    throw new Error(
      `タスク更新に失敗しました。taskId=${taskId}, error=${error}`
    )
  }
}

export const updateTaskPressTemplate = async (
  templateRepo: TaskPressTemplateRepository,
  taskId: string,
  data: Partial<TaskPressTemplateWrite>
) => {
  try {
    await templateRepo.update(data, [taskId])
  } catch (error) {
    throw new Error(
      `テンプレート更新に失敗しました。taskId=${taskId}, error=${error}`
    )
  }
}

export const deleteTaskPressTask = async (
  taskRepo: TaskPressTaskRepository,
  templateRepo: TaskPressTemplateRepository,
  taskId: string,
  isDeleteNoLongerDependentTemplate: boolean = true
) => {
  const task = await taskRepo.read([taskId])
  if (!task) {
    throw new Error(`削除対象のタスクが見つかりません。taskId=${taskId}`)
  }
  const dependsTemplateId = task.templateId

  const template = await templateRepo.read([dependsTemplateId])
  if (!template) {
    throw new Error(
      `依存関係のテンプレートが見つかりませんでした。dependsTemplateId=${dependsTemplateId}`
    )
  }
  if (
    'dependsTaskIds' in template &&
    !template.dependsTaskIds.includes(taskId)
  ) {
    throw new Error(
      `対象のタスクが依存関係に含まれていません。taskId=${taskId}, dependsTemplateId=${dependsTemplateId}`
    )
  }
  await taskRepo.hardDelete([taskId])

  const newTemplateDependsTaskIds = template.dependsTaskIds
    ? template.dependsTaskIds.filter((id) => id !== taskId)
    : []

  if (
    newTemplateDependsTaskIds.length === 0 &&
    isDeleteNoLongerDependentTemplate
  ) {
    await templateRepo.hardDelete([dependsTemplateId])
  } else {
    await templateRepo.update(
      {
        dependsTaskIds: newTemplateDependsTaskIds,
      },
      [dependsTemplateId]
    )
  }
}
