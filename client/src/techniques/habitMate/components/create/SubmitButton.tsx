import React from 'react'
import { Button, type ButtonProps } from '@mui/material'

interface Props extends ButtonProps {
  backgroundColor: string
}

const SubmitButton: React.FC<Props> = ({ backgroundColor, ...props }) => (
  <Button
    variant="contained"
    sx={{
      mt: 3,
      p: 1.5,
      borderRadius: 3,
      backgroundColor: backgroundColor,
      '&:hover': {
        backgroundColor: backgroundColor,
        opacity: 0.9,
      },
      fontWeight: 'bold',
      fontSize: '1.1rem',
    }}
    {...props}
  >
    習慣を始める！
  </Button>
)

export default SubmitButton
