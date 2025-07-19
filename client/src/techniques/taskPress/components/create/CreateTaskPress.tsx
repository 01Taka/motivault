import React from 'react'
import CreateTaskForm from './createTaskForm/CreateTaskForm'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type {
  CreateInputProps,
  CreateInputPropsInArray,
} from '../../../../types/form/formState-types'
import type {
  TaskPressCreateFormState,
  TaskPressFormStateStep,
} from '../../types/formState/task-press-create-form-state'
import useTaskPressCrudHandler from '../../services/hooks/useTaskPressCrudHandler'

interface CreateTaskPressProps {}

const CreateTaskPress: React.FC<CreateTaskPressProps> = ({}) => {
  const {
    formState,
    createInputProps,
    createInputPropsInArray,
    onChangeArrayField,
    checkHasEmptyInput,
  } = useFormState<TaskPressCreateFormState, { steps: TaskPressFormStateStep }>(
    {
      templateId: '',
      type: 'problemSet',
      title: '',
      subject: '',
      deadline: '',
      // ProblemSet
      timePerPage: 0,
      pages: [],
      // Report
      steps: [],
    }
  )

  const { handleSubmit } = useTaskPressCrudHandler()

  const hasEmptyInput = checkHasEmptyInput({
    exclude:
      formState.type === 'problemSet'
        ? ['templateId', 'steps']
        : ['templateId', 'timePerPage', 'pages'],
  })

  return (
    <CreateTaskForm
      formState={formState}
      createInputProps={createInputProps as CreateInputProps}
      createInputPropsInArray={
        createInputPropsInArray as CreateInputPropsInArray
      }
      onSubmit={() => handleSubmit(formState)}
      onAddStep={() =>
        onChangeArrayField('steps', {
          operation: 'push',
          value: { text: '', estimatedTime: 0 },
        })
      }
      onRemoveStep={(index) =>
        onChangeArrayField('steps', { operation: 'delete', index })
      }
      onSetPages={(pages) =>
        onChangeArrayField('pages', { operation: 'set', value: pages })
      }
      hasEmptyInput={hasEmptyInput}
      isUsingTemplate={false}
    />
  )
}

export default CreateTaskPress
