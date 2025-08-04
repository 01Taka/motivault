import { Container, Paper, Button, Stack, Typography } from '@mui/material'

import TaskTypeTabs from './TaskTypeTabs'
import StepInputs from './StepInputs'
import ProblemSetInputs from './ProblemSetInputs'
import DeadlineInput from './DeadlineInput'
import type {
  CreateInputProps,
  CreateInputPropsInArray,
} from '../../../../../types/form/formState-types'
import type { TaskPressTemplateRead } from '../../../services/documents/task-press-template-document'
import TaskTitleInput from './TaskTitleInput'

interface CreateTaskFormProps {
  formState: Record<string, any>
  templateChoicesMap: Record<string, TaskPressTemplateRead>
  createInputProps: CreateInputProps
  createInputPropsInArray: CreateInputPropsInArray
  onSubmit: () => void
  onAddStep: () => void
  onRemoveStep: (index: number) => void
  onSetPages: (pages: number[]) => void
  onSelectTemplate: (templateId: string) => void
  onClearSelectedTemplate: () => void
  hasEmptyInput: boolean
  isUsingTemplate: boolean
}

export default function CreateTaskForm({
  formState,
  templateChoicesMap,
  createInputProps,
  createInputPropsInArray,
  onSubmit,
  onAddStep,
  onRemoveStep,
  onSetPages,
  onSelectTemplate,
  onClearSelectedTemplate,
  hasEmptyInput,
  isUsingTemplate,
}: CreateTaskFormProps) {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          課題の新規作成
        </Typography>

        <TaskTypeTabs createInputProps={createInputProps} />

        <Stack spacing={2}>
          <TaskTitleInput
            label="タイトル"
            fullWidth
            required
            disabled={isUsingTemplate}
            {...createInputProps('title')}
            choices={Object.keys(templateChoicesMap)}
            getOptionLabel={(option) => templateChoicesMap[option]?.title ?? ''}
            onClear={onClearSelectedTemplate}
            onSelectChoices={onSelectTemplate}
          />

          {formState.type === 'report' && (
            <StepInputs
              steps={formState.steps}
              onAddStep={onAddStep}
              onRemoveStep={onRemoveStep}
              createInputPropsInArray={createInputPropsInArray}
              isUsingTemplate={isUsingTemplate}
            />
          )}

          {formState.type === 'problemSet' && (
            <ProblemSetInputs
              createInputProps={createInputProps}
              setPages={onSetPages}
              isUsingTemplate={isUsingTemplate}
            />
          )}

          <DeadlineInput createInputProps={createInputProps} />

          <Button
            type="button"
            onClick={onSubmit}
            variant="contained"
            disabled={hasEmptyInput}
          >
            課題を作成
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
