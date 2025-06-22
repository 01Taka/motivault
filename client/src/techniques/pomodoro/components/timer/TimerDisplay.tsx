import { Typography, Stack } from '@mui/material'

const formatTime = (ms: number) => {
  const seconds = Math.max(0, Math.floor(ms / 1000))
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

import React from 'react'

interface TimerDisplayProps {
  status: string
  type: string
  remainingTime: number
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  status,
  type,
  remainingTime,
}) => {
  return (
    <Stack spacing={1} alignItems="center">
      <Typography variant="h4" fontWeight="bold">
        🍅 POMO
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {status === 'idle' && '待機中'}
        {status === 'running' && '実行中'}
        {status === 'paused' && '停止中'}
        {status === 'finished' && '完了'}
      </Typography>
      <Typography>モード: {type === 'study' ? '勉強' : '休憩'}</Typography>
      <Typography variant="h3">{formatTime(remainingTime)}</Typography>
    </Stack>
  )
}

export default TimerDisplay
