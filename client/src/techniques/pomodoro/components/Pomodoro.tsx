import React, { useEffect, useState } from 'react'
import usePomodoro from '../hooks/usePomodoro'
import { Settings } from '@mui/icons-material'
import { Box, Paper, Stack, IconButton } from '@mui/material'
import Popup from '../../../components/utils/Popup'
import TimerControls from './timer/TimerControls'
import TimerDisplay from './timer/TimerDisplay'
import TimerSettings from './timer/TimerSettings'
import { useKeyPress } from '../../../hooks/test/useKeyPress'

interface PomodoroProps {}

const defaultSettings = {
  studyDuration: 25 * 60 * 1000,
  breakDuration: 5 * 60 * 1000,
}

const Pomodoro: React.FC<PomodoroProps> = ({}) => {
  const [settings, setSettings] = useState(defaultSettings)

  const {
    currentType,
    status,
    remainingTime,
    start,
    stop,
    reset,
    switchMode,
    needInitialize,
    handleCompleteSession,
  } = usePomodoro(settings)

  const state = useKeyPress('p')

  // console.log(needInitialize)

  useEffect(() => {
    if (state['p']) {
      handleCompleteSession()
    }
  }, [state])

  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor,
        transition: 'background-color 1s ease',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          padding: 4,
          borderRadius: 4,
          minWidth: 320,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <TimerDisplay
            status={status}
            type={currentType}
            remainingTime={remainingTime}
          />
          <TimerControls
            status={status}
            nextTypeName={currentType === 'study' ? '休憩' : '勉強'}
            onStart={start}
            onPause={stop}
            onResume={start}
            onSwitchMode={switchMode}
          />
        </Stack>
        <IconButton sx={{ position: 'absolute', top: 12, right: 12 }}>
          <Settings onClick={() => setSettingsOpen(true)} />
        </IconButton>
      </Paper>

      <Popup open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <TimerSettings
          onSelectSetting={(newSettings) => {
            console.log('refresh', newSettings.studyDuration)

            reset()
            setSettings(newSettings)
            setSettingsOpen(false)
          }}
          stats={{
            totalStudyTime: 0,
            totalBreakTime: 0,
            cycleCount: 1,
          }}
          onResetStats={() => {
            reset()
            console.log('refresh settings.studyDuration')
          }}
        />
      </Popup>
    </Box>
  )
}

export default Pomodoro
