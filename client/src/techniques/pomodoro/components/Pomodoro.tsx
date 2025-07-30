import React, { useEffect, useState, useCallback, useMemo } from 'react'
import usePomodoro from '../hooks/usePomodoro'
import { Container, Typography } from '@mui/material'
import PomodoroControlButtons from './timerControls/PomodoroControlButtons'
import PomodoroTimerCountDisplay from './PomodoroTimerCountDisplay'
import type { PomodoroTimerMode } from '../types/pomodoro-types'
import { TIMER_MODE_SETTINGS } from '../constants/timer-mode-constants'
import Popup from '../../../components/utils/Popup'
import PomodoroMenuContents from './menu/PomodoroMenuContents'
import MenuOpenButton from './menu/MenuOpenButton'
import ToggleTypeContents from './menu/ToggleTypeContents'
import InitializeTimerContents from './menu/InitializeTimerContents'

interface PomodoroProps {}

const Pomodoro: React.FC<PomodoroProps> = () => {
  const [openInitialize, setOpenInitialize] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openToggleType, setOpenToggleType] = useState(false)

  const [currentTimerMode, setCurrentTimerMode] =
    useState<PomodoroTimerMode>('focus')
  const [nextTimerMode, setNextTimerMode] = useState<PomodoroTimerMode>('focus')

  const {
    isRunning,
    start,
    stop,
    currentType,
    status,
    remainingTime,
    elapsedTime,
    switchMode,
    remainingTimeByCycleStart,
    needInitialize,
    handleCompleteSession,
    initializeTimer,
    sessionSummary,
  } = usePomodoro()

  const isOverTime = useMemo(
    () => !!remainingTimeByCycleStart && remainingTimeByCycleStart < 0,
    [remainingTimeByCycleStart]
  )

  const isTimeExceeded = useMemo(
    () =>
      currentType === 'study' &&
      !!remainingTimeByCycleStart &&
      remainingTimeByCycleStart <= 0,
    [currentType, remainingTimeByCycleStart]
  )

  const formatRemainingTime = useMemo(
    () => Math.max(remainingTime, 0),
    [remainingTime]
  )

  const isScrollToActionButton = useMemo(
    () => isOverTime && currentType === 'study',
    [isOverTime, currentType]
  )

  // Effect to handle automatic mode switching when break time is over
  useEffect(() => {
    if (isOverTime && currentType === 'break') {
      // Assuming 'testSubId' and 'study' are placeholders that might need clarification
      switchMode(TIMER_MODE_SETTINGS[nextTimerMode].study, 'testSubId', 'study')
      setCurrentTimerMode(nextTimerMode)
    }
  }, [isOverTime, currentType, nextTimerMode, switchMode])

  // Effect to open initialization popup when needed
  useEffect(() => {
    setOpenInitialize(needInitialize)
  }, [needInitialize])

  // Callbacks for handling timer mode selection
  const handleSelectBreakTime = useCallback(
    (timeMs: number) => {
      setCurrentTimerMode(nextTimerMode)
      switchMode(timeMs, null, 'break')
    },
    [nextTimerMode, switchMode]
  )

  const handleSelectNextStudyMode = useCallback(
    (mode: PomodoroTimerMode) => {
      const duration = TIMER_MODE_SETTINGS[mode].study
      setCurrentTimerMode(mode) // Update current mode immediately for UI consistency
      switchMode(duration, 'tesSubId', 'study')
    },
    [switchMode]
  )

  // Callbacks for popup interactions
  const handleCloseToggleType = useCallback(() => setOpenToggleType(false), [])
  const handleCloseInitialize = useCallback(() => setOpenInitialize(false), [])
  const handleCloseMenu = useCallback(() => setOpenMenu(false), [])

  const handleToggleTimerRunning = useCallback(() => {
    isRunning ? stop() : start()
    setOpenMenu(false)
  }, [isRunning, start, stop])

  const handleToggleTypeInMenu = useCallback(() => {
    setOpenToggleType(true)
  }, [])

  const handleClickHandleSession = useCallback(() => {
    if (isRunning) {
      handleCompleteSession()
      setOpenMenu(false)
    } else {
      setOpenMenu(false)
      setOpenInitialize(true)
    }
  }, [isRunning, handleCompleteSession])

  const handleInitializeTimerFromMenu = useCallback(
    (mode: PomodoroTimerMode) => {
      const duration = TIMER_MODE_SETTINGS[mode].study
      setCurrentTimerMode(mode)
      initializeTimer(duration, 'tesSubId', 'study')
      setOpenInitialize(false) // Close initialize popup after selection
    },
    [initializeTimer]
  )

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        width: '90vw',
      }}
    >
      <MenuOpenButton
        isScrollToMenuOpenButton={isScrollToActionButton}
        setOpenMenu={() => setOpenMenu(true)}
      />

      <Typography
        variant="h3"
        component="h1"
        color="#F54927"
        sx={{
          fontFamily: '"Roboto Mono", "Monaco", "Consolas", monospace',
          fontWeight: 800,
          fontSize: { xs: '3.0rem', sm: '3.5rem' },
        }}
      >
        <span role="img" aria-label="tomato">
          🍅
        </span>
        POMO
      </Typography>

      {/* Timer display component */}
      <PomodoroTimerCountDisplay
        remainingTime={formatRemainingTime}
        elapsedTime={elapsedTime}
        type={currentType}
        isRunning={status === 'running'}
        isTimeExceeded={isTimeExceeded}
      />

      {/* Control buttons and selection components */}
      <PomodoroControlButtons
        isTimeExceeded={isTimeExceeded}
        type={currentType}
        currentMode={currentTimerMode}
        selectedNextMode={nextTimerMode}
        onSelectBreakTime={handleSelectBreakTime}
        onSelectNextMode={setNextTimerMode} // This directly sets the next mode for the main control buttons
      />

      {/* Toggle Type Popup */}
      <Popup open={openToggleType} onClose={handleCloseToggleType}>
        <ToggleTypeContents
          currentType={currentType}
          currentTimerMode={currentTimerMode}
          onSelectBreakTime={(timeMs) => {
            handleSelectBreakTime(timeMs)
            setOpenToggleType(false)
            setOpenMenu(false)
          }}
          onSelectNextMode={(mode) => {
            handleSelectNextStudyMode(mode)
            setOpenToggleType(false)
            setOpenMenu(false)
          }}
        />
      </Popup>

      {/* Initialize Timer Popup */}
      <Popup
        open={openInitialize}
        onClose={handleCloseInitialize}
        hideCloseButton
      >
        <InitializeTimerContents
          onSelectNextMode={handleInitializeTimerFromMenu}
        />
      </Popup>

      {/* Main Menu Popup */}
      <Popup open={openMenu} onClose={handleCloseMenu}>
        <PomodoroMenuContents
          totalStudyTime={sessionSummary.totalStudyDuration}
          totalBreakTime={sessionSummary.totalBreakDuration}
          totalCycles={sessionSummary.totalCycles}
          currentType={currentType}
          isScrollToActionButton={isScrollToActionButton}
          isRunning={isRunning}
          isNeedInitialize={needInitialize}
          onToggleTimerRunning={handleToggleTimerRunning}
          onToggleType={handleToggleTypeInMenu}
          onClickHandleSession={handleClickHandleSession}
        />
      </Popup>
    </Container>
  )
}

export default Pomodoro
