import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import CircularProgressWithLabel from '../../shared/CircularProgressWithLabel'
import { circularWithMilestoneChipsPalette as palette } from '../../../constants/color/progressColor/circular-with-milestone-chips-color'

interface CircularProgressWithLabelCardProps {
  value: number
  taskName: string
  currentCount: number
  maxCount: number
  bottomLabel: string
  onClick?: () => void
}

export const CircularProgressWithLabelCard: React.FC<
  CircularProgressWithLabelCardProps
> = ({ value, taskName, currentCount, maxCount, bottomLabel, onClick }) => {
  return (
    <CircularProgressWithLabel
      value={value}
      size="90vw"
      strokeLinecap="round"
      thickness={2.5}
      variantColor={palette.progressVariant}
      trackColor={palette.progressTrack}
      onClick={onClick}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Typography variant="h5" mt={1} sx={{ color: palette.textPrimary }}>
          {taskName}
        </Typography>
        <Box sx={{ position: 'relative', width: 'fit-content', mt: 2 }}>
          <Typography variant="h6" sx={{ color: palette.textPrimary }}>
            {currentCount}/{maxCount}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: palette.textHighlight,
              position: 'absolute',
              top: 0,
              right: -25,
            }}
          >
            +5
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ color: palette.textSecondary, width: 'fit-content' }}
        >
          {bottomLabel}
        </Typography>
      </Stack>
    </CircularProgressWithLabel>
  )
}
