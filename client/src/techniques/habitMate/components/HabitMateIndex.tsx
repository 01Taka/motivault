import React, { useState } from 'react'
import { Stack } from '@mui/material'
import type { HabitMateProgressProps } from '../types/habit-types'
import HabitMateHabitProgress from './progress/HabitMateHabitProgress'
import { useNavigate } from 'react-router-dom'

interface HabitMateIndexProps {}

const HabitMateIndex: React.FC<HabitMateIndexProps> = ({}) => {
  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()

  const progressProps: HabitMateProgressProps = {
    taskName: 'taskName',
    currentCount: 5,
    isCompletedToday: completed,
    nextMilestoneCount: 10,
    milestonesAchieved: 3,
    milestonesTotal: 10,
    onToggleCompletion: () => setCompleted((prev) => !prev),
    onCompleted: () => setCompleted(true),
    onCancelComplete: () => setCompleted(false),
  }

  const newHabitButtonProps = {
    text: '新しい習慣を始める',
    onCreate: () => navigate('start-habit'),
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <HabitMateHabitProgress
        componentId="circularWithMilestoneChips"
        hasProgressHabit={false}
        progressProps={progressProps}
        newHabitButtonProps={newHabitButtonProps}
      />
    </Stack>
  )
}

export default HabitMateIndex
