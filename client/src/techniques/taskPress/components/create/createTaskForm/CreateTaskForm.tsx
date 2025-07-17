import {
  Container,
  Paper,
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
} from '@mui/material'

import TaskTypeTabs from './TaskTypeTabs'
import StepInputs from './StepInputs'
import ProblemSetInputs from './ProblemSetInputs'
import DeadlineInput from './DeadlineInput'
import type {
  CreateInputProps,
  CreateInputPropsInArray,
} from '../../../../../types/form/formState-types'

interface CreateTaskFormProps {
  formState: Record<string, any>
  createInputProps: CreateInputProps
  createInputPropsInArray: CreateInputPropsInArray
  onSubmit: () => void
  onAddStep: () => void
  onRemoveStep: (index: number) => void
  onSetPages: (pages: number[]) => void
  hasEmptyInput: boolean
  isUsingTemplate: boolean
}

export default function CreateTaskForm({
  formState,
  createInputProps,
  createInputPropsInArray,
  onSubmit,
  onAddStep,
  onRemoveStep,
  onSetPages,
  hasEmptyInput,
  isUsingTemplate,
}: CreateTaskFormProps) {
  const subjects = ['数学', '英語', '物理', '化学']

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          課題の新規作成
        </Typography>

        <TaskTypeTabs createInputProps={createInputProps} />

        <Stack spacing={2}>
          <TextField
            label="タイトル"
            fullWidth
            required
            disabled={isUsingTemplate}
            {...createInputProps('title')}
          />

          <TextField
            label="教科"
            select
            fullWidth
            disabled={isUsingTemplate}
            {...createInputProps('subject')}
          >
            {subjects.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

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
