import {
  createNewTaskPressTask,
  taskPressUpdateProblemSetPages,
  taskPressUpdateReportStepOrders,
  updateTaskPressTask,
  updateTaskPressTemplate,
} from '../functions/task-press-crud'
import type {
  TaskPressCreateFormState,
  TaskPressUpdateFormState,
} from '../../types/formState/task-press-create-form-state'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import {
  formatTaskFromFormState,
  formatTemplateFromFormState,
} from '../../functions/task-press-format-form-state'
import { useTaskPressDataStore } from '../stores/useTaskPressDataStore'

const useTaskPressCrudHandler = () => {
  const { idbTask, idbTemplate } = useTaskPressDataStore()

  const asyncKeys = [
    'submit',
    'updateTask',
    'updateTemplate',
    'updateCompletedPages',
    'updateCompletedStepOrders',
  ] as const

  const {
    asyncStates,
    allMatchStates,
    globalError,
    logError,
    callAsyncFunction,
  } = useMultipleAsyncHandler(asyncKeys)

  /**
   * Helper function to perform common validation checks.
   * Returns true if validation passes, false otherwise (and logs an error).
   */
  const validateCrudPrerequisites = (
    operationName: (typeof asyncKeys)[number],
    requiresTemplateIdb: boolean = false
  ): boolean => {
    if (!idbTask) {
      logError(
        operationName,
        'IndexedDB のタスクストアが初期化されていません。操作を続行できません。'
      )
      return false
    }

    if (requiresTemplateIdb && !idbTemplate) {
      logError(
        operationName,
        'IndexedDB のテンプレートストアが初期化されていません。操作を続行できません。'
      )
      return false
    }

    return true
  }

  const handleSubmit = (formState: TaskPressCreateFormState) => {
    if (!validateCrudPrerequisites('submit', true)) {
      return
    }

    const task = formatTaskFromFormState(formState)
    const template = formatTemplateFromFormState(formState)

    callAsyncFunction('submit', createNewTaskPressTask, [
      idbTask!, // Assert non-null after validation
      idbTemplate!, // Assert non-null after validation
      task,
      template,
    ])
  }

  const handleUpdate = (
    taskId: string,
    templateId: string,
    updateFormState: Partial<TaskPressUpdateFormState>
  ) => {
    if (validateCrudPrerequisites('updateTask')) {
      callAsyncFunction('updateTask', updateTaskPressTask, [
        idbTask!,
        taskId,
        updateFormState,
      ])
    }

    if (validateCrudPrerequisites('updateTemplate', true)) {
      callAsyncFunction('updateTemplate', updateTaskPressTemplate, [
        idbTemplate!,
        templateId,
        updateFormState,
      ])
    }
  }

  const updateCompletedPages = (
    taskId: string,
    pagesToComplete?: number[],
    pagesToUncomplete?: number[]
  ) => {
    if (!validateCrudPrerequisites('updateCompletedPages')) {
      return
    }

    callAsyncFunction('updateCompletedPages', taskPressUpdateProblemSetPages, [
      idbTask!,
      taskId,
      pagesToComplete,
      pagesToUncomplete,
    ])
  }

  const updateCompletedStepOrders = (
    taskId: string,
    stepOrdersToComplete: number[],
    stepOrdersToUncomplete?: number[]
  ) => {
    if (!validateCrudPrerequisites('updateCompletedStepOrders')) {
      return
    }

    callAsyncFunction(
      'updateCompletedStepOrders',
      taskPressUpdateReportStepOrders,
      [idbTask!, taskId, stepOrdersToComplete, stepOrdersToUncomplete]
    )
  }

  return {
    asyncStates,
    allMatchStates,
    globalError,
    handleSubmit,
    handleUpdate, // Added handleUpdate to the return object
    updateCompletedPages,
    updateCompletedStepOrders,
  }
}

export default useTaskPressCrudHandler
