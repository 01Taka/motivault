import React from 'react'
import useAbstractDataSync from '../../../hooks/services/useAbstractDataSync'
import { usePomodoroDataStore } from '../services/stores/usePomodoroDataStore'
import Pomodoro from './Pomodoro'
import { Box } from '@mui/material'

interface PomodoroTimerLayoutProps {}

const PomodoroTimerLayout: React.FC<PomodoroTimerLayoutProps> = ({}) => {
  useAbstractDataSync(usePomodoroDataStore())
  return (
    <Box sx={{ width: '100vw' }}>
      <Pomodoro />
    </Box>
  )
}

export default PomodoroTimerLayout
