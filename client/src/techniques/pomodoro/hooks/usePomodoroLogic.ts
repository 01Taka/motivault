import { useEffect, useState, useCallback, useMemo } from 'react'
import type { PomodoroTimerMode } from '../types/pomodoro-types'
import { TIMER_MODE_SETTINGS } from '../constants/timer-mode-constants'
import { useSoundPlayer } from '../../../features/sound/hooks/useSoundPlayer'
import usePomodoroTimerSystem from './usePomodoroTimerSystem'

const DEFAULT_SUBJECT_ID = 'unselected'

export const usePomodoroLogic = () => {
  const [openInitialize, setOpenInitialize] = useState<boolean>(false)
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openToggleType, setOpenToggleType] = useState<boolean>(false)
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
  } = usePomodoroTimerSystem()

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

  const { playLoop } = useSoundPlayer()
  useEffect(() => {
    if (isOverTime) {
      playLoop('windChime', 3, 3500)
    }
  }, [isOverTime, playLoop])

  useEffect(() => {
    if (isOverTime && currentType === 'break') {
      switchMode(
        TIMER_MODE_SETTINGS[nextTimerMode].study,
        DEFAULT_SUBJECT_ID,
        'study'
      )
      setCurrentTimerMode(nextTimerMode)
    }
  }, [isOverTime, currentType, nextTimerMode, switchMode])

  useEffect(() => {
    setOpenInitialize(needInitialize)
  }, [needInitialize])

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
      setCurrentTimerMode(mode)
      switchMode(duration, DEFAULT_SUBJECT_ID, 'study')
    },
    [switchMode]
  )

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
      initializeTimer(duration, DEFAULT_SUBJECT_ID, 'study')
      setOpenInitialize(false)
    },
    [initializeTimer]
  )

  return {
    // State and handlers
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

    // Values from usePomodoro and memos
    isRunning,
    currentType,
    status,
    formatRemainingTime,
    elapsedTime,
    isTimeExceeded,
    isScrollToActionButton,
    sessionSummary,
    needInitialize,
  }
}
