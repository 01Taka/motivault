import React from 'react'
import HabitMateCreateHabitForm from './create/HabitMateCreateHabitForm'
import { Box } from '@mui/material'

interface HabitMateCreateHabitProps {}

const HabitMateCreateHabit: React.FC<HabitMateCreateHabitProps> = ({}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: 'auto',
        pt: 8,
      }}
    >
      <HabitMateCreateHabitForm />
    </Box>
  )
}

export default HabitMateCreateHabit
