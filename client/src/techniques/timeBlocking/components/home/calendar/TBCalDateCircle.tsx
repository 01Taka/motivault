import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { format } from 'date-fns'

interface TBCalDateCircleProps {
  date: number // Unix timestamp (ms)
}

const TBCalDateCircle: React.FC<TBCalDateCircleProps> = ({ date }) => {
  const theme = useTheme()
  const day = format(date, 'd')
  const weekday = format(date, 'EEE') // 'Mon', 'Tue', etc.
  const size = 64

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* 曜日（上に表示） */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 6,
          fontSize: 10,
        }}
      >
        {weekday}
      </Typography>

      {/* 日付（中央） */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        {day}
      </Typography>
    </Box>
  )
}

export default TBCalDateCircle
