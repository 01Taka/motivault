import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import {
  getProgressComponent,
  getNewHabitButton,
} from '../../constants/progress/progress-components'
import type {
  ProgressComponentId,
  HabitMateProgressProps,
  HabitMateNewHabitProps,
} from '../../types/components/progress-types'
import { useDelayedState } from '../../../../hooks/components/useDelayedState'

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
  const [delayedProgress, setDelayedProgress] =
    useDelayedState<HabitMateProgressProps | null>(progressProps, {
      defaultDelay: 1000,
    })

  useEffect(() => {
    setDelayedProgress(progressProps)
  }, [progressProps])

  useEffect(() => {
    if (progressProps?.taskName && !delayedProgress?.taskName) {
      setDelayedProgress(progressProps, { delay: 0 })
    }
  }, [progressProps, delayedProgress])

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      {hasProgressHabit && delayedProgress ? (
        <Progress {...progressProps} />
      ) : (
        <NewHabitButton {...newHabitButtonProps} />
      )}
    </Stack>
  )
}

export default HabitMateHabitProgress
