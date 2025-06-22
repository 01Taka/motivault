import { Box, Typography } from '@mui/material'
import React from 'react'
import { getHourLabel } from '../../../functions/calendar-time-utils'

interface TBCalHourLabelsProps {
  hours: number[]
  cellHeight: number
}

const TBCalHourLabels: React.FC<TBCalHourLabelsProps> = ({
  hours,
  cellHeight,
}) => {
  return hours.map((_, i) => (
    <Box
      key={i}
      sx={{
        height: cellHeight,
        borderBottom: `1px solid GrayText`,
        px: 1,
        position: 'relative',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 8,
          color: 'GrayText',
        }}
      >
        {getHourLabel(i + 1)}
      </Typography>
    </Box>
  ))
}
export default TBCalHourLabels
