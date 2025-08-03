import React from 'react'
import { Box, Typography, Stack, Chip } from '@mui/material'
import IncrementDecrementButton from './IncrementDecrementButton'

interface TimeControlSectionProps {
  label: string
  value: string
  onIncrement?: () => void
  onDecrement?: () => void
  disableIncrement: boolean
  disableDecrement: boolean
  textColor: string
}

const TimeControlSection: React.FC<TimeControlSectionProps> = ({
  label,
  value,
  onIncrement,
  onDecrement,
  disableIncrement,
  disableDecrement,
  textColor,
}) => {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          color: textColor,
          fontWeight: 500,
          mb: 1.5,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <IncrementDecrementButton
          onClick={onDecrement}
          disabled={disableDecrement}
          isIncrement={false}
        />
        <Chip
          label={value}
          variant="outlined"
          sx={{
            minWidth: '100px',
            height: '44px',
            fontWeight: 600,
            fontSize: '1rem',
            borderColor: 'rgba(255,255,255,0.3)',
            color: textColor,
            bgcolor: 'rgba(255,255,255,0.1)',
            '& .MuiChip-label': {
              px: 3,
            },
          }}
        />
        <IncrementDecrementButton
          onClick={onIncrement}
          disabled={disableIncrement}
          isIncrement={true}
        />
      </Stack>
    </Box>
  )
}

export default TimeControlSection
