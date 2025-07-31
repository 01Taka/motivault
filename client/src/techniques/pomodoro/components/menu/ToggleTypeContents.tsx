import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import PomodoroControlButtons from '../timerControls/PomodoroControlButtons'
import type { PomodoroCycleType } from '../../services/documents/pomodoro-session-shared-data'
import type { PomodoroTimerMode } from '../../types/pomodoro-types'

interface ToggleTypeContentsProps {
  currentType: PomodoroCycleType
  currentTimerMode: PomodoroTimerMode
  onSelectNextMode: (mode: PomodoroTimerMode) => void
  onSelectBreakTime: (timeMs: number) => void
}

const ToggleTypeContents: React.FC<ToggleTypeContentsProps> = ({
  currentType,
  currentTimerMode,
  onSelectBreakTime,
  onSelectNextMode,
}) => {
  return (
    <Stack
      alignItems="center"
      spacing={1}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        width: '90vw',
        maxWidth: 500,
        boxShadow: 3,
        px: 1,
        py: 3,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          mb: 2,
        }}
      >
        {currentType === 'break'
          ? 'どのモードで開始する？'
          : 'どれぐらい休憩する？'}
      </Typography>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <PomodoroControlButtons
          isTimeExceeded={true}
          type={currentType}
          currentMode={currentTimerMode}
          selectedNextMode={null}
          onSelectNextMode={onSelectNextMode}
          onSelectBreakTime={onSelectBreakTime}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.875rem',
          mt: 3,
          fontStyle: 'italic',
        }}
      >
        {currentType === 'break'
          ? '目標を設定して集中しましょう！'
          : '休憩して次の勉強で全集中！'}
      </Typography>
    </Stack>
  )
}

export default ToggleTypeContents
