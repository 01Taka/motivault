import { Stack, Typography, Button } from '@mui/material'

const formatMinutes = (ms: number) => Math.floor(ms / 60000)

import React from 'react'

interface StatsDisplayProps {
  stats: { totalStudyTime: number; totalBreakTime: number; cycleCount: number }
  onReset: () => void
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, onReset }) => {
  return (
    <Stack spacing={1} alignItems="center">
      <Typography variant="h6">📊 統計情報</Typography>
      <Typography>
        合計勉強時間: {formatMinutes(stats.totalStudyTime)} 分
      </Typography>
      <Typography>
        合計休憩時間: {formatMinutes(stats.totalBreakTime)} 分
      </Typography>
      <Typography>サイクル数: {stats.cycleCount}</Typography>
      <Button size="small" color="error" onClick={onReset}>
        統計をリセット
      </Button>
    </Stack>
  )
}

export default StatsDisplay
