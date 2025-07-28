import { Stack, Typography, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import type { HabitMateNewHabitProps } from '../../../types/components/progress-types'

interface CircularNewHabitButtonProps extends HabitMateNewHabitProps {
  backgroundColor?: string
  hoverBackgroundColor?: string
}

const CircularNewHabitButton: React.FC<CircularNewHabitButtonProps> = ({
  text,
  backgroundColor,
  hoverBackgroundColor,
  onCreate,
}) => {
  const { palette } = useTheme()
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '90vw',
        height: '90vw',
        borderRadius: '50%',
        bgcolor: backgroundColor ?? palette.primary.main,
        color: '#fff',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: 4,
        '&:hover': {
          bgcolor: hoverBackgroundColor ?? palette.primary.dark,
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
      onClick={onCreate}
    >
      <AddIcon sx={{ fontSize: 48 }} />
      <Typography variant="subtitle1" mt={1} sx={{ fontWeight: 500 }}>
        {text}
      </Typography>
    </Stack>
  )
}

export default CircularNewHabitButton
