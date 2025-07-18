import { createNewTaskPressTask } from '../functions/task-press-crud'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { TaskPressCreateFormState } from '../../types/formState/task-press-create-form-state'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import type { TaskPressTaskWrite } from '../documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../documents/task-press-template-document'
import { useTaskPressRepo } from './useTaskPressRepo'

const useCrudTaskPress = () => {
  const { uid } = useCurrentUserStore()
  const repo = useTaskPressRepo()

  const {
    asyncStates,
    allMatchStates,
    globalError,
    logError,
    callAsyncFunction,
  } = useMultipleAsyncHandler(['submit'])

  const handleSubmit = async (formState: TaskPressCreateFormState) => {
    if (!uid) {
      logError('submit', 'ログイン情報が見つかりません')
      return
    }

    if (!repo) {
      logError('submit', 'レポジトリが初期化されていません')
      return
    }

    const task: TaskPressTaskWrite = {
      ...formState,
      completedPages: [],
      completedStepOrders: [],
    }

    const template: TaskPressTemplateWrite =
      formState.type === 'report'
        ? {
            ...formState,
            type: 'report',
            steps: formState.steps.map((step, index) => ({
              ...step,
              order: index,
            })),
          }
        : {
            ...formState,
            type: 'problemSet',
          }

    callAsyncFunction('submit', createNewTaskPressTask, [
      uid,
      repo,
      task,
      template,
    ])
  }

  return { asyncStates, allMatchStates, globalError, handleSubmit }
}

export default useCrudTaskPress
