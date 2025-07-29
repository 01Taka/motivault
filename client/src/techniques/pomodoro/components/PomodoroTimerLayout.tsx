import React from 'react'
import useAbstractDataSync from '../../../hooks/services/useAbstractDataSync'
import { usePomodoroDataStore } from '../services/stores/usePomodoroDataStore'
import Pomodoro from './Pomodoro'

interface PomodoroTimerLayoutProps {}

const PomodoroTimerLayout: React.FC<PomodoroTimerLayoutProps> = ({}) => {
  useAbstractDataSync(usePomodoroDataStore())
  return <Pomodoro />
}

export default PomodoroTimerLayout
