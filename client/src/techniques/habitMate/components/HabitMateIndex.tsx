import React from 'react'
import { Skeleton, Stack } from '@mui/material'
import HabitMateHabitProgress from './progress/HabitMateHabitProgress'
import { useNavigate } from 'react-router-dom'
import { useHabitMateDataStore } from '../services/stores/useHabitMateDataStore'
import { getLevelInfo } from '../functions/constantHelpers/habit-level-data-helper'
import { calculateMilestoneProgress } from '../functions/helper/milestone-helper'
import type { HabitMateProgressProps } from '../types/components/progress-types'
import useHabitMateCrudHandler from '../services/hooks/useHabitMateCrudHandler'
import { toISODate } from '../../../functions/dateTime-utils/time-conversion'
import type { HabitMateHabitRead } from '../services/documents/habit-mate-habit-document'

interface HabitMateIndexProps {}

const HabitMateIndex: React.FC<HabitMateIndexProps> = ({}) => {
  const { metadata, habits } = useHabitMateDataStore()
  const { asyncStates, pushWorkedDate, removeWorkedDate, toggleWorkedDate } =
    useHabitMateCrudHandler()

  const activeHabit = habits.find((habit) => habit.status === 'active') ?? null

  const testHabit = activeHabit
    ? ({
        ...activeHabit,
        workedDate: ['2025-07-05', ...activeHabit.workedDate],
      } as HabitMateHabitRead)
    : null

  const levelInfo = testHabit ? getLevelInfo(testHabit.level) : null
  const milestoneProgress =
    testHabit && levelInfo
      ? calculateMilestoneProgress(levelInfo, testHabit)
      : {
          nextMilestoneCount: 0,
          nextMilestoneAbsoluteCount: 0,
          milestonesAchieved: 0,
          milestonesTotal: 0,
        }

  const targetCount = levelInfo
    ? levelInfo.targetCount.type === 'fixed'
      ? levelInfo.targetCount.count
      : 'unlimited'
    : 0

  const navigate = useNavigate()

  const handleWorkDate = (action: 'add' | 'remove' | 'toggle') => {
    if (!activeHabit) return
    const habitId = activeHabit.docId
    switch (action) {
      case 'add':
        pushWorkedDate(habitId)
        break
      case 'remove':
        removeWorkedDate(habitId)
        break
      case 'toggle':
        toggleWorkedDate(habitId)
        break
    }
  }

  const progressProps: HabitMateProgressProps = {
    taskName: testHabit?.habit ?? '',
    currentCount: testHabit?.workedDate.length ?? 0,
    targetCount: targetCount,
    isCompletedToday: testHabit
      ? testHabit.workedDate.includes(toISODate(new Date()))
      : false,
    ...milestoneProgress,
    nextMilestoneAbsoluteCount: activeHabit?.nextTargetCount ?? 0,
    onToggleCompletion: () => handleWorkDate('toggle'),
    onCompleted: () => handleWorkDate('add'),
    onCancelComplete: () => handleWorkDate('remove'),
  }

  const newHabitButtonProps = {
    text: '新しい習慣を始める',
    onCreate: () => navigate('start-habit'),
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      {metadata ? (
        <HabitMateHabitProgress
          componentId="circularWithMilestoneChips"
          hasProgressHabit={!!activeHabit}
          progressProps={progressProps}
          newHabitButtonProps={newHabitButtonProps}
        />
      ) : (
        <Skeleton
          variant="circular"
          sx={{ width: '90vw', height: '90vw', bgcolor: '#c3cacd' }}
        />
      )}
    </Stack>
  )
}

export default HabitMateIndex
