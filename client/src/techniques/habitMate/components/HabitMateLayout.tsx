import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import useHabitMateDataSync from '../services/hooks/useHabitMateDataSync'

interface HabitMateLayoutProps {}

const HabitMateLayout: React.FC<HabitMateLayoutProps> = ({}) => {
  useHabitMateDataSync()

  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default HabitMateLayout
