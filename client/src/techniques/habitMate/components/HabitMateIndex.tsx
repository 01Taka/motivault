import React, { useState } from 'react'
import { Stack } from '@mui/material'
import type { HabitMateProgressProps } from '../types/habit-types'
import HabitMateHabitProgress from './progress/HabitMateHabitProgress'
import { useNavigate } from 'react-router-dom'
import { useHabitMateDataStore } from '../services/stores/useHabitMateDataStore'
import { getLevelInfo } from '../functions/constantHelpers/habit-level-data-helper'
import { calculateMilestoneProgress } from '../functions/helper/milestone-helper'

interface HabitMateIndexProps {}

const HabitMateIndex: React.FC<HabitMateIndexProps> = ({}) => {
  const { habits } = useHabitMateDataStore()
  const activeHabit = habits.find((habit) => habit.status === 'active') ?? null
  const levelInfo = activeHabit ? getLevelInfo(activeHabit.level) : null
  const milestoneProgress =
    activeHabit && levelInfo
      ? calculateMilestoneProgress(levelInfo, {
          ...activeHabit,
          workedDate: ['2025-11-30', '2025-11-30', '2025-11-30'],
        })
      : { nextMilestoneCount: 0, milestonesAchieved: 0, milestonesTotal: 0 }

  console.log(milestoneProgress)

  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()

  const progressProps: HabitMateProgressProps = {
    taskName: activeHabit?.habit ?? '',
    currentCount:
      (levelInfo?.milestoneIntervalDays ?? 0) -
      milestoneProgress.nextMilestoneCount,
    isCompletedToday: completed,
    ...milestoneProgress,
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
        hasProgressHabit={!!activeHabit}
        progressProps={progressProps}
        newHabitButtonProps={newHabitButtonProps}
      />
    </Stack>
  )
}

export default HabitMateIndex
