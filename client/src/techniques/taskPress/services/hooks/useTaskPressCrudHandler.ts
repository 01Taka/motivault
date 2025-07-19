import {
  createNewTaskPressTask,
  taskPressPushCompletedPages,
  taskPressPushCompletedStepOrders,
} from '../functions/task-press-crud'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { TaskPressCreateFormState } from '../../types/formState/task-press-create-form-state'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import {
  formatTaskFromFormState,
  formatTemplateFromFormState,
} from '../../functions/task-press-format-form-state'
import { useTaskPressStore } from '../stores/useTaskPressStore'

const useTaskPressCrudHandler = () => {
  const { uid } = useCurrentUserStore()
  const { idbTask, idbTemplate } = useTaskPressStore()

  const {
    asyncStates,
    allMatchStates,
    globalError,
    logError,
    callAsyncFunction,
  } = useMultipleAsyncHandler([
    'submit',
    'pushCompletedPages',
    'pushCompletedStepOrders',
  ])

  const handleSubmit = async (formState: TaskPressCreateFormState) => {
    if (!uid) {
      logError('submit', 'ユーザーID（uid）が未定義です')
      return
    }

    if (!idbTask || !idbTemplate) {
      logError('submit', 'IndexedDB の初期化が完了していません')
      return
    }

    const task = formatTaskFromFormState(formState)
    const template = formatTemplateFromFormState(formState)

    await callAsyncFunction('submit', createNewTaskPressTask, [
      idbTask,
      idbTemplate,
      uid,
      task,
      template,
    ])
  }

  const pushCompletedPages = async (
    taskId: string,
    completedPages: number[]
  ) => {
    if (!uid || !idbTask) {
      logError('pushCompletedPages', 'ユーザーIDまたはIndexedDBが未定義です')
      return
    }

    await callAsyncFunction('pushCompletedPages', taskPressPushCompletedPages, [
      idbTask,
      uid,
      taskId,
      completedPages,
    ])
  }

  const pushCompletedStepOrders = async (
    taskId: string,
    completedStepOrders: number[]
  ) => {
    if (!uid || !idbTask) {
      logError(
        'pushCompletedStepOrders',
        'ユーザーIDまたはIndexedDBが未定義です'
      )
      return
    }

    await callAsyncFunction(
      'pushCompletedStepOrders',
      taskPressPushCompletedStepOrders,
      [idbTask, uid, taskId, completedStepOrders]
    )
  }

  return {
    asyncStates,
    allMatchStates,
    globalError,
    handleSubmit,
    pushCompletedPages,
    pushCompletedStepOrders,
  }
}

export default useTaskPressCrudHandler
