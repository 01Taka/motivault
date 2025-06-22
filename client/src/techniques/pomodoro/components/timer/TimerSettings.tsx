import { Stack, Button, Typography, Divider } from '@mui/material'
import StatsDisplay from './StatsDisplay'

import React from 'react'

const studySettings = [
  {
    title: '短時間型',
    label: '10分勉強 ⇆ 2分休憩',
    studyDuration: 10 * 60 * 1000,
    breakDuration: 2 * 60 * 1000,
  },
  {
    title: '標準型',
    label: '25分勉強 ⇆ 5分休憩',
    studyDuration: 25 * 60 * 1000,
    breakDuration: 5 * 60 * 1000,
  },
  {
    title: '長時間型',
    label: '60分勉強 ⇆ 15分休憩',
    studyDuration: 60 * 60 * 1000,
    breakDuration: 15 * 60 * 1000,
  },
]

interface TimerSettingsProps {
  onSelectSetting: (settings: {
    studyDuration: number
    breakDuration: number
  }) => void
  stats: { totalStudyTime: number; totalBreakTime: number; cycleCount: number }
  onResetStats: () => void
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  onSelectSetting,
  stats,
  onResetStats,
}) => {
  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={{ padding: 2, bgcolor: 'white', borderRadius: 2, minWidth: 300 }}
    >
      <Typography variant="h6">⏱️ 時間設定</Typography>
      {studySettings.map((setting) => (
        <Button
          key={setting.title}
          onClick={() =>
            onSelectSetting({
              studyDuration: setting.studyDuration,
              breakDuration: setting.breakDuration,
            })
          }
          variant="outlined"
          sx={{ color: 'black', width: '100%' }}
        >
          <Stack key={setting.title} alignItems={'center'}>
            <Typography variant="subtitle1">{setting.title}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              {setting.label}
            </Typography>
          </Stack>
        </Button>
      ))}

      <Divider sx={{ width: '100%' }} />
      <StatsDisplay stats={stats} onReset={onResetStats} />
    </Stack>
  )
}

export default TimerSettings
