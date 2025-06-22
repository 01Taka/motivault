import { Box } from '@mui/material'
import { TimeBlockingTaskFormHeader } from './TimeBlockingTaskFormHeader'
import { TimeBlockingTaskFormBody } from './TimeBlockingTaskFormBody'
import type { TimeBlockingTaskWrite } from '../../types/documents/task-documents'
import useFormState from '../../../../hooks/forms/base/useFormState'
import type { CreateInputProps } from '../../../../types/form/formstate-types'
import type {
  TimeBlockingTag,
  TimeBlockingTags,
} from '../../types/documents/time-blocking-document'
import { useState } from 'react'

interface TimeBlockingTaskFormProps {
  defaultStartTime: number | null
  tags: TimeBlockingTags
  onSubmit: (data: TimeBlockingTaskWrite) => void
  onTagCreate: (tag: TimeBlockingTag) => void
  onCancel?: () => void
}

export interface TimeBlockingTaskFormState {
  title: string
  duration: number // minutes
  tagId: string
  completed: boolean
  repeat?: 'none' | 'daily' | 'weekly'
}

const TimeBlockingTaskForm: React.FC<TimeBlockingTaskFormProps> = ({
  defaultStartTime,
  tags,
  onSubmit,
  onTagCreate,
  onCancel,
}) => {
  const [startTime, setStartTime] = useState<Date>(
    defaultStartTime ? new Date(defaultStartTime) : new Date()
  )

  const { formState, names, createInputProps } =
    useFormState<TimeBlockingTaskFormState>({
      title: '',
      duration: 30,
      tagId: '',
      completed: false,
      repeat: 'none',
    })

  return (
    <Box
      sx={{
        p: 2,
        height: '70vh',
        width: '80vw',
        position: 'relative',
        bgcolor: 'whitesmoke',
        borderRadius: 3,
      }}
    >
      <TimeBlockingTaskFormHeader
        onCancel={onCancel}
        onSubmit={() =>
          onSubmit({
            ...formState,
            duration: formState.duration * 60000, // min -> ms
            startTime: startTime?.getTime() ?? Date.now(),
          })
        }
        disabled={!formState.title}
      />
      <TimeBlockingTaskFormBody
        formData={formState}
        names={names}
        tags={tags}
        startTime={startTime}
        onChangeStartTime={(value) => setStartTime(value)}
        createInputProps={createInputProps as CreateInputProps}
        onTagCreate={(tag) => onTagCreate(tag)}
      />
    </Box>
  )
}

export default TimeBlockingTaskForm
