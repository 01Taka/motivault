import { useState, useEffect } from 'react'
import { Box, Paper, Stack, IconButton } from '@mui/material'
import { usePersistentPomodoroState } from '../hooks/usePersistentPomodoroState'
import usePomodoroTimer from '../hooks/usePomodoroTimer'
import TimerControls from './timer/TimerControls'
import TimerDisplay from './timer/TimerDisplay'
import { Settings } from '@mui/icons-material'
import TimerSettings from './timer/TimerSettings'
import Popup from '../../../components/utils/Popup'
import { LocalStorageProvider } from '../functions/LocalStorageProvider'

const defaultSettings = {
  studyDuration: 25 * 60 * 1000,
  breakDuration: 5 * 60 * 1000,
}

const PomodoroTimer = () => {
  const [stats, setStats] = useState({
    totalStudyTime: 0,
    totalBreakTime: 0,
  })

  const { state, getLatestStats, updateState } =
    usePersistentPomodoroState(LocalStorageProvider)
  const [settings, setSettings] = useState(defaultSettings)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const {
    status,
    type,
    remainingTime,
    elapsedTime,
    start,
    pause,
    resume,
    refresh,
    switchMode,
  } = usePomodoroTimer({ state, settings, updateState })

  useEffect(() => {
    const updateStats = () => {
      const latestStats = getLatestStats()
      setStats(latestStats)
    }

    const interval = setInterval(updateStats, 1000)
    return () => clearInterval(interval)
  }, [getLatestStats])

  const [bgColor, setBgColor] = useState('#ffffff')

  useEffect(() => {
    refresh(defaultSettings.studyDuration)
  }, [])

  useEffect(() => {
    if (status === 'running') {
      const ratio = elapsedTime / (elapsedTime + remainingTime)
      const colorIntensity = Math.min(255, Math.floor(255 * ratio))
      setBgColor(
        `rgb(255, ${255 - colorIntensity}, ${200 - colorIntensity / 2})`
      )
    } else {
      setBgColor('#ffffff')
    }
  }, [elapsedTime, remainingTime, status])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
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
            type={type}
            remainingTime={remainingTime}
          />
          <TimerControls
            status={status}
            nextTypeName={type === 'study' ? '休憩' : '勉強'}
            onStart={start}
            onPause={pause}
            onResume={resume}
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
            refresh(newSettings.studyDuration)
            setSettings(newSettings)
            setSettingsOpen(false)
          }}
          stats={{
            totalStudyTime: stats.totalStudyTime,
            totalBreakTime: stats.totalBreakTime,
            cycleCount: 1,
          }}
          onResetStats={() => refresh(settings.studyDuration)}
        />
      </Popup>
    </Box>
  )
}

export default PomodoroTimer
