import React from 'react'
import NextSessionSelector from '../timerControls/NextSessionSelector'
import { Box, Typography, Stack } from '@mui/material'
import type { PomodoroTimerMode } from '../../types/pomodoro-types'

interface InitializeTimerContentsProps {
  onSelectNextMode: (mode: PomodoroTimerMode) => void
}

const InitializeTimerContents: React.FC<InitializeTimerContentsProps> = ({
  onSelectNextMode,
}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
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
        どのモードで開始する？
      </Typography>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <NextSessionSelector
          selectedNextMode={null}
          onSelectNextMode={onSelectNextMode}
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
        目標を設定して集中しましょう！
      </Typography>
    </Stack>
  )
}

export default InitializeTimerContents
