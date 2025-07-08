import { Edit } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

interface TaskPressTaskCardHeaderProps {
  title: string
  onEdit: () => void
}

const TaskPressTaskCardHeader: React.FC<TaskPressTaskCardHeaderProps> = ({
  title,
  onEdit,
}) => {
  return (
    <Box>
      <IconButton onClick={onEdit}>
        <Edit />
      </IconButton>
      <Typography variant="h5">{title}</Typography>
    </Box>
  )
}

export default TaskPressTaskCardHeader
