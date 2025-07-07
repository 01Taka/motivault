import React from 'react'
import { Stack, Typography } from '@mui/material'

interface NoteHeaderProps {
  title: string
  createdAt: number
}

const NoteHeader: React.FC<NoteHeaderProps> = ({ title, createdAt }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography variant="subtitle1" fontWeight="bold" noWrap>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {new Date(createdAt).toLocaleDateString()}
    </Typography>
  </Stack>
)

export default NoteHeader
