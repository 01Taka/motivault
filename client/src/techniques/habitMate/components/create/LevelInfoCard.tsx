import React from 'react'
import { Stack, Typography } from '@mui/material'
import type {
  HabitMateHabitLevel,
  HabitMateLevelInfo,
} from '../../types/habit-level-types'

interface Props {
  level: HabitMateHabitLevel
  levelTheme: { primary: string }
  levelInfo: HabitMateLevelInfo
  rewardMessage: string | null
}

const LevelInfoCard: React.FC<Props> = ({
  level,
  levelTheme,
  levelInfo,
  rewardMessage,
}) => {
  const maxConsecutiveDays =
    levelInfo.targetCount.type === 'fixed' ? levelInfo.targetCount.count : '∞'

  return (
    <Stack
      spacing={1.5}
      sx={{
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        p: 3,
      }}
    >
      <Stack justifyContent="center" alignItems="center" spacing={1} mb={1}>
        <Typography
          variant="h5"
          sx={{ color: levelTheme.primary, fontWeight: 'bold' }}
        >
          レベル {level}
        </Typography>
        <Typography sx={{ color: levelTheme.primary, fontWeight: 'bold' }}>
          {levelInfo.name} ✨
        </Typography>
      </Stack>

      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          <strong>🗓️ 最大継続日数:</strong> {maxConsecutiveDays}日
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          <strong>📍 中間地点間隔:</strong> {levelInfo.milestoneIntervalDays}日
        </Typography>
        {rewardMessage && (
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>🎁 報酬:</strong> {rewardMessage}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default LevelInfoCard
