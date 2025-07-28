import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import CircularProgressWithLabel from '../../shared/CircularProgressWithLabel'

interface CircularProgressWithLabelCardProps {
  value: number
  taskName: string
  currentCount: number
  differenceFromTargetCount: number | 'unlimited'
  maxCount: number
  bottomLabel: string
  onClick?: () => void
}

export const CircularProgressWithLabelCard: React.FC<
  CircularProgressWithLabelCardProps
> = ({
  value,
  taskName,
  currentCount,
  differenceFromTargetCount,
  maxCount,
  bottomLabel,
  onClick,
}) => {
  const { palette } = useTheme()
  return (
    <CircularProgressWithLabel
      value={value}
      size="90vw"
      strokeLinecap="round"
      thickness={2.5}
      variantColor={palette.emotionStatus?.positive.main}
      trackColor={palette.grey[300]}
      onClick={onClick}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Typography variant="h5" mt={1} sx={{ color: palette.text.primary }}>
          {taskName}
        </Typography>
        <Box sx={{ position: 'relative', width: 'fit-content', mt: 2 }}>
          <Typography variant="h6" sx={{ color: palette.text.primary }}>
            {currentCount}/{maxCount}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: palette.primary.main,
              position: 'absolute',
              top: 0,
              right: -25,
            }}
          >
            +
            {differenceFromTargetCount === 'unlimited'
              ? '∞'
              : differenceFromTargetCount}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ color: palette.text.secondary, width: 'fit-content' }}
        >
          {bottomLabel}
        </Typography>
      </Stack>
    </CircularProgressWithLabel>
  )
}
