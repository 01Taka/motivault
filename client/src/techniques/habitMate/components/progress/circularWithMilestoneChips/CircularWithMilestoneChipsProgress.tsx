import React from 'react'
import { CircularProgressWithLabelCard } from './CircularProgressWithLabelCard'
import { Box, Stack, Typography } from '@mui/material'
import { circularWithMilestoneChipsPalette as palette } from '../../../constants/color/progressColor/circular-with-milestone-chips-color'
import type { HabitMateProgressProps } from '../../../types/habit-types'

interface CircularWithMilestoneChipsProgressProps
  extends HabitMateProgressProps {}

const CircularWithMilestoneChipsProgress: React.FC<
  CircularWithMilestoneChipsProgressProps
> = ({
  taskName,
  currentCount,
  nextMilestoneCount,
  isCompletedToday,
  milestonesAchieved,
  milestonesTotal,
  onToggleCompletion,
}) => {
  const percentage =
    nextMilestoneCount > 0 ? (currentCount * 100) / nextMilestoneCount : 0

  return (
    <Stack justifyContent="center" alignItems="center" spacing={3}>
      <CircularProgressWithLabelCard
        taskName={taskName}
        value={percentage}
        currentCount={currentCount}
        maxCount={nextMilestoneCount}
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
