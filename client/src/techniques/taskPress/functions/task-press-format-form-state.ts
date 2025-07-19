// formatFormState.ts
import { MINUTES_IN_MS } from '../../../constants/datetime-constants'
import type { TaskPressTaskWrite } from '../services/documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../services/documents/task-press-template-document'
import type { TaskPressCreateFormState } from '../types/formState/task-press-create-form-state'

export const formatTaskFromFormState = (
  formState: TaskPressCreateFormState
): TaskPressTaskWrite => ({
  ...formState,
  completedPages: [],
  completedStepOrders: [],
})

export const formatTemplateFromFormState = (
  formState: TaskPressCreateFormState
): TaskPressTemplateWrite => {
  if (formState.type === 'report') {
    return {
      ...formState,
      type: 'report',
      steps: formState.steps.map((step, index) => ({
        ...step,
        order: index,
        estimatedTime: step.estimatedTime * MINUTES_IN_MS,
      })),
    }
  } else {
    return {
      ...formState,
      type: 'problemSet',
      timePerPage: formState.timePerPage * MINUTES_IN_MS,
    }
  }
}
