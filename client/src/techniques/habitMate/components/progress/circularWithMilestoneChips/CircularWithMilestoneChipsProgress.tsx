import React from 'react'
import { CircularProgressWithLabelCard } from './CircularProgressWithLabelCard'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import type { HabitMateProgressProps } from '../../../types/components/progress-types'
import { motion } from 'framer-motion'

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
  const { palette } = useTheme()
  const percentage =
    nextMilestoneAbsoluteCount > 0
      ? (currentCount * 100) / nextMilestoneAbsoluteCount
      : 0

  const completionAnimation = {
    scale: [1, 1.1, 1], // サイズを少し拡大してから元に戻す
    transition: { duration: 0.3, times: [0, 0.5, 1] }, // アニメーションの速度とタイミング
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ width: '100vw' }}
    >
      <motion.div animate={isCompletedToday ? completionAnimation : {}}>
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
      </motion.div>
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Stack direction="row" spacing={0.5}>
          {[...Array(milestonesTotal)].map((_, index) => (
            <Box
              key={index}
              sx={{
                bgcolor:
                  index < milestonesAchieved
                    ? palette.energy?.main
                    : palette.grey[300],
                width: 24,
                height: 24,
                borderRadius: 999,
              }}
            />
          ))}
        </Stack>
        <Typography sx={{ color: palette.text.secondary }}>
          {milestonesAchieved}/{milestonesTotal}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default CircularWithMilestoneChipsProgress
