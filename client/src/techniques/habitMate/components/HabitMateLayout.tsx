import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import useAbstractDataSync from '../../../hooks/services/useAbstractDataSync'
import { useHabitMateDataStore } from '../services/stores/useHabitMateDataStore'

interface HabitMateLayoutProps {}

const HabitMateLayout: React.FC<HabitMateLayoutProps> = ({}) => {
  useAbstractDataSync(useHabitMateDataStore())

  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default HabitMateLayout
