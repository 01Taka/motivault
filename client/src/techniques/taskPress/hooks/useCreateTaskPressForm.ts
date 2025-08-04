// hooks/useCreateTaskPressForm.ts
import { useEffect, useMemo, useState, useCallback } from 'react'
import useFormState from '../../../hooks/forms/base/useFormState'
import { MINUTES_IN_MS } from '../../../constants/datetime-constants'
import { useTaskPressDataStore } from '../services/stores/useTaskPressDataStore'
import type {
  CreateInputProps,
  CreateInputPropsInArray,
} from '../../../types/form/formState-types'
import type {
  TaskPressCreateFormState,
  TaskPressFormStateStep,
} from '../types/formState/task-press-create-form-state'
import type { TaskPressTemplateRead } from '../services/documents/task-press-template-document'

export const useCreateTaskPressForm = () => {
  const { templates } = useTaskPressDataStore()
  const {
    formState,
    setFormState,
    createInputProps,
    createInputPropsInArray,
    onChangeArrayField,
    checkHasEmptyInput,
  } = useFormState<TaskPressCreateFormState, { steps: TaskPressFormStateStep }>(
    {
      templateId: '',
      type: 'problemSet',
      title: '',
      deadline: '',
      timePerPage: 10,
      pages: [],
      steps: [],
    }
  )

  const [selectedTemplate, setSelectedTemplate] =
    useState<TaskPressTemplateRead | null>(null)

  const hasEmptyInput = useMemo(
    () =>
      checkHasEmptyInput({
        exclude:
          formState.type === 'problemSet'
            ? ['templateId', 'steps']
            : ['templateId', 'timePerPage', 'pages'],
      }),
    [checkHasEmptyInput, formState.type]
  )

  const titleMatchTemplates = useMemo(() => {
    const searchText = formState.title
    if (!searchText) {
      return templates
    }
    const lowerCaseSearchText = searchText.toLowerCase()
    return templates.filter((template) =>
      template.title.toLowerCase().includes(lowerCaseSearchText)
    )
  }, [templates, formState.title])

  const handleClearSelectedTemplate = useCallback(() => {
    setSelectedTemplate(null)
    setFormState((prev) => ({
      ...prev,
      templateId: '',
      title: '',
    }))
  }, [setFormState])

  const handleSelectTemplate = useCallback(
    (templateId: string) => {
      const targetTemplate = templates.find(
        (template) => template.docId === templateId
      )

      if (!targetTemplate) {
        handleClearSelectedTemplate()
        return
      }

      if (targetTemplate.type === 'problemSet') {
        const template = {
          ...targetTemplate,
          timePerPage: targetTemplate.timePerPage / MINUTES_IN_MS,
        }
        setSelectedTemplate(template)
        setFormState((prev) => ({
          ...prev,
          templateId: template.docId,
          type: template.type,
          title: template.title,
          timePerPage: template.timePerPage,
        }))
      } else {
        const template = {
          ...targetTemplate,
          steps: targetTemplate.steps.map((step) => ({
            ...step,
            estimatedTime: step.estimatedTime / MINUTES_IN_MS,
          })),
        }
        setSelectedTemplate(template)
        setFormState((prev) => ({
          ...prev,
          templateId: targetTemplate.docId,
          type: targetTemplate.type,
          title: targetTemplate.title,
          steps: template.steps,
        }))
      }
    },
    [handleClearSelectedTemplate, setFormState, templates]
  )

  const isMatchFormStateSelectedTemplate = useMemo(() => {
    if (!selectedTemplate) {
      return false
    }

    const isMatch =
      (formState.type === 'problemSet'
        ? (
            ['type', 'title', 'timePerPage'] as Array<
              keyof TaskPressCreateFormState
            >
          ).every(
            (key) =>
              formState[key] ===
              selectedTemplate[key as keyof TaskPressTemplateRead]
          )
        : (
            ['type', 'title', 'steps'] as Array<keyof TaskPressCreateFormState>
          ).every(
            (key) =>
              formState[key] ===
              selectedTemplate[key as keyof TaskPressTemplateRead]
          )) && formState.templateId === selectedTemplate.docId

    return isMatch
  }, [
    selectedTemplate,
    formState.type,
    formState.title,
    formState.timePerPage,
    formState.steps,
  ])

  useEffect(() => {
    if (!isMatchFormStateSelectedTemplate && selectedTemplate) {
      handleClearSelectedTemplate()
    }
  }, [
    isMatchFormStateSelectedTemplate,
    selectedTemplate,
    handleClearSelectedTemplate,
  ])

  const templateChoicesMap = useMemo(() => {
    const targetTemplates =
      titleMatchTemplates.length === 0 ? templates : titleMatchTemplates
    const filterTemplates = targetTemplates.filter(
      (template) => template.type === formState.type
    )
    return Object.fromEntries(
      filterTemplates.map((template) => [template.docId, template])
    )
  }, [titleMatchTemplates, templates, formState.type])

  const onAddStep = useCallback(
    () =>
      onChangeArrayField('steps', {
        operation: 'push',
        value: { text: '', estimatedTime: 15 },
      }),
    [onChangeArrayField]
  )

  const onRemoveStep = useCallback(
    (index: number) =>
      onChangeArrayField('steps', { operation: 'delete', index }),
    [onChangeArrayField]
  )

  const onSetPages = useCallback(
    (pages: number[]) =>
      onChangeArrayField('pages', { operation: 'set', value: pages }),
    [onChangeArrayField]
  )

  return {
    formState,
    createInputProps: createInputProps as CreateInputProps,
    createInputPropsInArray: createInputPropsInArray as CreateInputPropsInArray,
    hasEmptyInput,
    templateChoicesMap,
    onAddStep,
    onRemoveStep,
    onSetPages,
    onSelectTemplate: handleSelectTemplate,
    onClearSelectedTemplate: handleClearSelectedTemplate,
  }
}
