import React from 'react'
import { Stack, Button } from '@mui/material'

const palette = {
  mainColor: '#8A96F2',
  borderColor: '#E0E4E8',
}

interface HabitMateContinueFormActionButtonsProps {
  onContinue: () => void
  onStartNewHabit: () => void
}

const HabitMateContinueFormActionButtons: React.FC<
  HabitMateContinueFormActionButtonsProps
> = ({ onContinue, onStartNewHabit }) => (
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
        bgcolor: palette.mainColor,
        '&:hover': {
          bgcolor: palette.mainColor,
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
        borderColor: palette.borderColor,
        color: 'text.primary',
      }}
    >
      新しい習慣を始める
    </Button>
  </Stack>
)

export default HabitMateContinueFormActionButtons
