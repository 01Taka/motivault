import { Stack } from '@mui/material'
import React from 'react'
import {
  getProgressComponent,
  getNewHabitButton,
} from '../../constants/progress/progress-components'
import type {
  HabitMateNewHabitProps,
  HabitMateProgressProps,
  ProgressComponentId,
} from '../../types/habit-types'

interface HabitMateHabitProgressProps {
  componentId: ProgressComponentId
  hasProgressHabit: boolean
  progressProps: HabitMateProgressProps | null
  newHabitButtonProps: HabitMateNewHabitProps
}

const HabitMateHabitProgress: React.FC<HabitMateHabitProgressProps> = ({
  componentId,
  hasProgressHabit,
  progressProps,
  newHabitButtonProps,
}) => {
  const Progress = getProgressComponent(componentId)
  const NewHabitButton = getNewHabitButton(componentId)

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      {hasProgressHabit && progressProps ? (
        <Progress {...progressProps} />
      ) : (
        <NewHabitButton {...newHabitButtonProps} />
      )}
    </Stack>
  )
}

export default HabitMateHabitProgress
