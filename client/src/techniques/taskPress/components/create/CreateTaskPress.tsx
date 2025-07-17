import React from 'react'
import CreateTaskForm from './createTaskForm/CreateTaskForm'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type {
  CreateInputProps,
  CreateInputPropsInArray,
} from '../../../../types/form/formState-types'
import type { TaskPressTaskType } from '../../services/documents/task-press-shared-types'

interface CreateTaskPressProps {}

interface FormStateBase {
  type: TaskPressTaskType
  templateId: string | '' // 明示的に空文字を許容
  deadline: string
  title: string
  subject: string
}

interface ProblemSetFormState extends FormStateBase {
  timePerPage: number
  pages: number[]
}

interface FormStateStep {
  text: string
  estimatedTime: number
}

interface ReportFormState extends FormStateBase {
  steps: FormStateStep[]
}

type FormState = ProblemSetFormState & ReportFormState

const CreateTaskPress: React.FC<CreateTaskPressProps> = ({}) => {
  const {
    formState,
    createInputProps,
    createInputPropsInArray,
    onChangeArrayField,
    checkHasEmptyInput,
  } = useFormState<FormState, { steps: FormStateStep }>({
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
  })

  const handleSubmit = () => {
    const data = {
      ...formState,
      steps: formState.type === 'report' ? formState.steps : undefined,
    }
    console.log('送信:', data)
  }

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
      onSubmit={handleSubmit}
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
