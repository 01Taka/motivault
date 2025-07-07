// components/TogglePastGapsButton.tsx

import React from 'react'
import { Button } from '@mui/material'

interface TogglePastGapsButtonProps {
  isOpen: boolean
  onToggle: () => void
}

const TogglePastGapsButton: React.FC<TogglePastGapsButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onToggle}
      sx={{
        borderRadius: 3,
        borderColor: 'grey.300',
        color: 'text.primary',
        fontWeight: 500,
        textTransform: 'none',
        px: 2,
        py: 1.5,
        transition: '0.2s',
        '&:hover': {
          backgroundColor: 'grey.100',
          borderColor: 'grey.400',
        },
      }}
    >
      {isOpen ? '⬆️ 過去の疑問を隠す' : '⬇️ 過去の疑問を表示'}
    </Button>
  )
}

export default TogglePastGapsButton
