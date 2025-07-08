import { Stack, Typography } from '@mui/material'
import React from 'react'

interface TaskProgressSummaryCardProps {
  label: string
  text: string
}

const TaskProgressSummaryCard: React.FC<TaskProgressSummaryCardProps> = ({
  label,
  text,
}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      width={80}
      sx={{
        bgcolor: 'snow',
        boxShadow: 1,
        borderRadius: 1,
        px: 1,
        py: 0.5,
      }}
    >
      <Typography variant="caption">{label}</Typography>
      <Typography variant="subtitle1">{text}</Typography>
    </Stack>
  )
}

export default TaskProgressSummaryCard
