import React from 'react'
import CreateTaskForm from './createTaskForm/CreateTaskForm'
import { useCreateTaskPressForm } from '../../hooks/useCreateTaskPressForm'
import { useTaskPressSubmission } from '../../hooks/useTaskPressSubmission'

interface CreateTaskPressProps {}

const CreateTaskPress: React.FC<CreateTaskPressProps> = ({}) => {
  const {
    formState,
    createInputProps,
    createInputPropsInArray,
    hasEmptyInput,
    templateChoicesMap,
    onAddStep,
    onRemoveStep,
    onSetPages,
    onSelectTemplate,
    onClearSelectedTemplate,
  } = useCreateTaskPressForm()

  const { onSubmit } = useTaskPressSubmission(formState)

  return (
    <CreateTaskForm
      formState={formState}
      templateChoicesMap={templateChoicesMap}
      createInputProps={createInputProps}
      createInputPropsInArray={createInputPropsInArray}
      onSubmit={onSubmit}
      onAddStep={onAddStep}
      onRemoveStep={onRemoveStep}
      onSetPages={onSetPages}
      onSelectTemplate={onSelectTemplate}
      onClearSelectedTemplate={onClearSelectedTemplate}
      hasEmptyInput={hasEmptyInput}
      isUsingTemplate={!!formState.templateId}
    />
  )
}

export default CreateTaskPress
