import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import useAbstractDataSync from '../../../hooks/services/useAbstractDataSync'
import { useHabitMateDataStore } from '../services/stores/useHabitMateDataStore'
import useHabitMateCrudHandler from '../services/hooks/useHabitMateCrudHandler'

interface HabitMateLayoutProps {}

const HabitMateLayout: React.FC<HabitMateLayoutProps> = ({}) => {
  const habitMateDataStore = useHabitMateDataStore()
  useAbstractDataSync(habitMateDataStore)
  const { createMetadata } = useHabitMateCrudHandler()

  useEffect(() => {
    if (habitMateDataStore.idbMetadata) {
      createMetadata()
    }
  }, [habitMateDataStore.idbMetadata, createMetadata])

  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export default HabitMateLayout
