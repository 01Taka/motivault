import React from 'react'
import { Container, Typography } from '@mui/material'
import PomodoroControlButtons from './timerControls/PomodoroControlButtons'
import PomodoroTimerCountDisplay from './PomodoroTimerCountDisplay'
import type { PomodoroTimerMode } from '../types/pomodoro-types'
import Popup from '../../../components/utils/Popup'
import PomodoroMenuContents from './menu/PomodoroMenuContents'
import MenuOpenButton from './menu/MenuOpenButton'
import ToggleTypeContents from './menu/ToggleTypeContents'
import InitializeTimerContents from './menu/InitializeTimerContents'
import { usePomodoroLogic } from '../hooks/usePomodoroLogic'

interface PomodoroProps {}

const Pomodoro: React.FC<PomodoroProps> = () => {
  const {
    openInitialize,
    openMenu,
    openToggleType,
    currentTimerMode,
    nextTimerMode,
    setNextTimerMode,
    setOpenMenu,
    handleCloseToggleType,
    handleCloseInitialize,
    handleCloseMenu,
    handleToggleTimerRunning,
    handleToggleTypeInMenu,
    handleClickHandleSession,
    handleInitializeTimerFromMenu,
    handleSelectBreakTime,
    handleSelectNextStudyMode,
    isRunning,
    currentType,
    status,
    formatRemainingTime,
    elapsedTime,
    isTimeExceeded,
    isScrollToActionButton,
    sessionSummary,
    needInitialize,
  } = usePomodoroLogic()

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

      <PomodoroTimerCountDisplay
        remainingTime={formatRemainingTime}
        elapsedTime={elapsedTime}
        type={currentType}
        isRunning={status === 'running'}
        isTimeExceeded={isTimeExceeded}
      />

      <PomodoroControlButtons
        isTimeExceeded={isTimeExceeded}
        type={currentType}
        currentMode={currentTimerMode}
        selectedNextMode={nextTimerMode}
        onSelectBreakTime={handleSelectBreakTime}
        onSelectNextMode={setNextTimerMode}
      />

      <Popup open={openToggleType} onClose={handleCloseToggleType}>
        <ToggleTypeContents
          currentType={currentType}
          currentTimerMode={currentTimerMode}
          onSelectBreakTime={(timeMs) => {
            handleSelectBreakTime(timeMs)
            handleCloseToggleType()
            setOpenMenu(false)
          }}
          onSelectNextMode={(mode: PomodoroTimerMode) => {
            handleSelectNextStudyMode(mode)
            handleCloseToggleType()
            setOpenMenu(false)
          }}
        />
      </Popup>

      <Popup
        open={openInitialize}
        onClose={handleCloseInitialize}
        hideCloseButton
      >
        <InitializeTimerContents
          onSelectNextMode={handleInitializeTimerFromMenu}
        />
      </Popup>

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
