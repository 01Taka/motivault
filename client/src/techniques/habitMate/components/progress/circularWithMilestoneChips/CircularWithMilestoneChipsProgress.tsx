import React from 'react'
import { CircularProgressWithLabelCard } from './CircularProgressWithLabelCard'
import { Box, Stack, Typography } from '@mui/material'
import { circularWithMilestoneChipsPalette as palette } from '../../../constants/color/progressColor/circular-with-milestone-chips-color'
import type { HabitMateProgressProps } from '../../../types/components/progress-types'

interface CircularWithMilestoneChipsProgressProps
  extends HabitMateProgressProps {}

const CircularWithMilestoneChipsProgress: React.FC<
  CircularWithMilestoneChipsProgressProps
> = ({
  taskName,
  targetCount,
  currentCount,
  nextMilestoneAbsoluteCount,
  isCompletedToday,
  milestonesAchieved,
  milestonesTotal,
  onToggleCompletion,
}) => {
  const percentage =
    nextMilestoneAbsoluteCount > 0
      ? (currentCount * 100) / nextMilestoneAbsoluteCount
      : 0

  return (
    <Stack justifyContent="center" alignItems="center" spacing={3}>
      <CircularProgressWithLabelCard
        taskName={taskName}
        value={percentage}
        currentCount={currentCount}
        maxCount={nextMilestoneAbsoluteCount}
        differenceFromTargetCount={
          targetCount === 'unlimited'
            ? 'unlimited'
            : targetCount - nextMilestoneAbsoluteCount
        }
        bottomLabel={isCompletedToday ? '完了' : '未完了'}
        onClick={onToggleCompletion}
      />
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Stack direction="row" spacing={0.5}>
          {[...Array(milestonesTotal)].map((_, index) => (
            <Box
              key={index}
              sx={{
                bgcolor:
                  index < milestonesAchieved
                    ? palette.milestoneActive
                    : palette.milestoneInactive,
                width: 24,
                height: 24,
                borderRadius: 999,
              }}
            />
          ))}
        </Stack>
        <Typography sx={{ color: palette.textPrimary }}>
          {milestonesAchieved}/{milestonesTotal}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default CircularWithMilestoneChipsProgress
