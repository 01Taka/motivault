import { Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import { circularWithMilestoneChipsPalette as palette } from '../../../constants/color/progressColor/circular-with-milestone-chips-color'
import type { HabitMateNewHabitProps } from '../../../types/habit-types'

interface CircularNewHabitButtonProps extends HabitMateNewHabitProps {
  backgroundColor?: string
  hoverBackgroundColor?: string
}

const CircularNewHabitButton: React.FC<CircularNewHabitButtonProps> = ({
  text,
  backgroundColor = palette.createNewBackground,
  hoverBackgroundColor = palette.createNewBackgroundHover,
  onCreate,
}) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '90vw',
        height: '90vw',
        borderRadius: '50%',
        bgcolor: backgroundColor,
        color: '#fff',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: 4,
        '&:hover': {
          bgcolor: hoverBackgroundColor,
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
