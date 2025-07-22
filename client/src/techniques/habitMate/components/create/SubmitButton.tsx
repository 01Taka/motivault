import React from 'react'
import { Button } from '@mui/material'

interface Props {
  levelTheme: { primary: string }
}

const SubmitButton: React.FC<Props> = ({ levelTheme }) => (
  <Button
    variant="contained"
    sx={{
      mt: 3,
      p: 1.5,
      borderRadius: 3,
      backgroundColor: levelTheme.primary,
      '&:hover': {
        backgroundColor: levelTheme.primary,
        opacity: 0.9,
      },
      fontWeight: 'bold',
      fontSize: '1.1rem',
    }}
  >
    習慣を始める！
  </Button>
)

export default SubmitButton
