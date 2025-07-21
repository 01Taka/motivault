import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

interface HabitMateLayoutProps {}

const HabitMateLayout: React.FC<HabitMateLayoutProps> = ({}) => {
  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default HabitMateLayout
