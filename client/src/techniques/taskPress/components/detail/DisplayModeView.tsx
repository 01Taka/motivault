import React from 'react'
import { Typography, Stack } from '@mui/material'
import { format } from 'date-fns'
import type { TaskPressUpdateFormState } from '../../types/formState/task-press-create-form-state'
import type { TaskPressTaskType } from '../../services/documents/task-press-shared-types'

interface DisplayModeViewProps {
  type: TaskPressTaskType
  formState: TaskPressUpdateFormState
}

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Typography variant="subtitle2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Stack>
)

const formatDeadline = (dateString?: string | null): string => {
  if (!dateString) return '未設定'
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? '無効な日付' : format(date, 'yyyy/MM/dd')
}

export const DisplayModeView: React.FC<DisplayModeViewProps> = ({
  type,
  formState,
}) => {
  const isProblemSet = type === 'problemSet'

  return (
    <>
      <InfoRow label="タイトル:" value={formState.title || '未設定'} />
      <InfoRow label="教科:" value={formState.subject || '未設定'} />
      <InfoRow label="締切:" value={formatDeadline(formState.deadline)} />

      {isProblemSet && (
        <InfoRow
          label="1ページの所要時間:"
          value={
            typeof formState.timePerPage === 'number'
              ? `${Math.floor(formState.timePerPage)}分`
              : '未設定'
          }
        />
      )}
    </>
  )
}
