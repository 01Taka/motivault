import { Box, IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Edit } from '@mui/icons-material'
import { SaveCancelButtons } from './SaveCancelButtons' // Assuming this path
import type { CreateInputProps } from '../../../../types/form/formState-types'
import type { TaskPressUpdateFormState } from '../../types/formState/task-press-create-form-state'
import { DisplayModeView } from './DisplayModeView'
import { EditModeView } from './EditModeView'
import type { TaskPressTaskType } from '../../services/documents/task-press-shared-types'

interface EditMetadataProps {
  type: TaskPressTaskType
  formState: TaskPressUpdateFormState
  hasUnsavedChanges: boolean
  subjects: string[]
  onSave: () => void
  onCancel: () => void
  createInputProps: CreateInputProps
}

const EditMetadata: React.FC<EditMetadataProps> = ({
  type,
  formState,
  hasUnsavedChanges,
  subjects,
  onSave,
  onCancel,
  createInputProps,
}) => {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
      >
        <SaveCancelButtons
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={onSave}
          onCancel={onCancel}
        />
        <IconButton
          onClick={() => setIsEditMode(!isEditMode)}
          aria-label={
            isEditMode ? '閲覧モードに切り替え' : '編集モードに切り替え'
          }
          size="large"
        >
          <Edit color={isEditMode ? 'primary' : 'action'} />
        </IconButton>
      </Stack>
      <Stack spacing={2} mt={1}>
        {isEditMode ? (
          <EditModeView
            type={type}
            subjects={subjects}
            createInputProps={createInputProps}
            onDelete={() => {}}
          />
        ) : (
          <DisplayModeView type={type} formState={formState} />
        )}
      </Stack>
    </Box>
  )
}

export default EditMetadata
