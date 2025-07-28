import React from 'react'
import { Stack, Button, useTheme } from '@mui/material'

interface HabitMateContinueFormActionButtonsProps {
  onContinue: () => void
  onStartNewHabit: () => void
}

const HabitMateContinueFormActionButtons: React.FC<
  HabitMateContinueFormActionButtonsProps
> = ({ onContinue, onStartNewHabit }) => {
  const { palette } = useTheme()
  return (
    <Stack spacing={2} justifyContent="center" sx={{ mt: 3 }}>
      <Button
        variant="contained"
        onClick={onContinue}
        sx={{
          minWidth: '120px',
          textTransform: 'none',
          fontSize: '1rem',
          py: 1,
          borderRadius: 999,
          bgcolor: palette.emotionStatus?.positive.main,
          '&:hover': {
            bgcolor: palette.emotionStatus?.positive.main,
            opacity: 0.9,
          },
        }}
      >
        続ける
      </Button>
      <Button
        variant="outlined"
        onClick={onStartNewHabit}
        sx={{
          minWidth: '120px',
          textTransform: 'none',
          fontSize: '1rem',
          py: 1,
          borderRadius: 999,
          borderColor: palette.border?.main,
          color: 'text.primary',
        }}
      >
        新しい習慣を始める
      </Button>
    </Stack>
  )
}

export default HabitMateContinueFormActionButtons
