import React from 'react'
import { MenuItem, TextField, Button, Stack } from '@mui/material'
import DeadlineInput from '../create/createTaskForm/DeadlineInput' // Adjust path if needed
import type { CreateInputProps } from '../../../../types/form/formState-types'
import type { TaskPressTaskType } from '../../services/documents/task-press-shared-types'
import { Delete } from '@mui/icons-material'

interface EditModeViewProps {
  type: TaskPressTaskType
  subjects: string[]
  createInputProps: CreateInputProps
  onDelete?: () => void
}

export const EditModeView: React.FC<EditModeViewProps> = ({
  type,
  subjects,
  createInputProps,
  onDelete,
}) => {
  const commonTextFieldProps = {
    fullWidth: true,
    size: 'small' as const,
    variant: 'standard' as const,
    sx: { transition: 'width 0.1s linear', mr: 1 },
  }

  return (
    <Stack spacing={2}>
      <TextField
        label="タイトル"
        {...createInputProps('title')}
        {...commonTextFieldProps}
      />
      <TextField
        label="教科"
        select
        {...createInputProps('subject')}
        {...commonTextFieldProps}
      >
        {subjects.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
      <DeadlineInput
        createInputProps={createInputProps}
        props={{ size: 'small', variant: 'standard' }}
      />
      {type === 'problemSet' && (
        <TextField
          label="1ページの所要時間(分)"
          type="number"
          {...createInputProps('timePerPage')}
          {...commonTextFieldProps}
        />
      )}

      {onDelete && (
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={onDelete}
          sx={{
            alignSelf: 'flex-start',
            mt: 2,
            px: 2,
            fontWeight: 'bold',
            boxShadow: 1,
            ':hover': {
              backgroundColor: (theme) => theme.palette.error.dark,
            },
          }}
        >
          タスクを削除
        </Button>
      )}
    </Stack>
  )
}
