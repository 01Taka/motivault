import { Visibility } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
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
    <Stack direction="row" alignItems={'center'} spacing={2}>
      <IconButton onClick={onEdit}>
        <Visibility />
      </IconButton>
      <Box sx={{ overflow: 'auto', width: '100%', maxWidth: '100%' }}>
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Stack>
  )
}

export default TaskPressTaskCardHeader
