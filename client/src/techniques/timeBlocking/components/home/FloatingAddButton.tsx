import { Add } from '@mui/icons-material'
import { Fab } from '@mui/material'

import React from 'react'

interface FloatingAddButtonProps {
  onClick: () => void
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
  return (
    <Fab
      onClickCapture={() => onClick()}
      color="primary"
      sx={{ position: 'fixed', bottom: 4, right: 4 }}
      onClick={() => {}} //openNewTaskDialog
    >
      <Add />
    </Fab>
  )
}

export default FloatingAddButton
