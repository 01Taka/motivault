import type { TaskPressTaskWrite } from '../documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../documents/task-press-template-document'
import type { TaskPressRepo } from '../hooks/useTaskPressRepo'

export const createNewTaskPressTask = async (
  uid: string,
  repo: TaskPressRepo,
  task: TaskPressTaskWrite,
  template: TaskPressTemplateWrite
): Promise<void> => {
  if (!repo) {
    throw new Error('Repository not available')
  }

  try {
    const templateExists = task.templateId && (await isExistTemplate(uid, repo))

    if (templateExists) {
      await repo.idbTask.create(task, [uid])
    } else {
      const createdTemplate = await repo.idbTemplate.create(template, [uid])
      if (!createdTemplate?.id) {
        throw new Error('Failed to create template')
      }
      await repo.idbTask.create({ ...task, templateId: createdTemplate.id }, [
        uid,
      ])
    }
  } catch (error) {
    console.error('Failed to create task:', error)
    throw error
  }
}

const isExistTemplate = async (
  uid: string,
  repo: TaskPressRepo
): Promise<boolean> => {
  if (!repo) {
    throw new Error('Repository not available in isExistTemplate')
  }

  try {
    const data = await repo.idbTemplate.read([uid])
    return Boolean(data && data.isActive)
  } catch (error) {
    console.error('Failed to check if template exists:', error)
    throw error
  }
}
