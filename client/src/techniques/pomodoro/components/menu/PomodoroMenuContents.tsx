import React, { useEffect, useRef } from 'react'
import { Box, Button, Typography, Divider, Stack } from '@mui/material'
import {
  School as StudyIcon,
  Coffee as BreakIcon,
  Loop as CycleIcon,
  SwapHoriz as ToggleIcon,
  ExitToApp as ExitIcon,
  Assessment as StatsIcon,
  Schedule as TimeIcon,
} from '@mui/icons-material'
import type { PomodoroCycleType } from '../../services/documents/pomodoro-session-shared-data'
import { POMODORO_COLORS } from '../../constants/theme-colors'
import { alpha } from '@mui/material'
import StatCard from './StatCard'

interface PomodoroMenuContentsProps {
  totalStudyTime: number
  totalBreakTime: number
  totalCycles: number
  currentType: PomodoroCycleType
  isScrollToActionButton: boolean
  isRunning: boolean
  isNeedInitialize: boolean
  onToggleTimerRunning: () => void
  onToggleType: () => void
  onClickHandleSession: () => void
}

// 時間をhh:mm:ss形式にフォーマット
const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${minutes}:${String(seconds).padStart(2, '0')}`
}

// 状態に基づく設定を返す
const useTypeConfig = (currentType: PomodoroCycleType) => {
  const config = {
    study: {
      label: '勉強中',
      icon: StudyIcon,
      toggleLabel: '休憩に切り替え',
      toggleIcon: BreakIcon,
      color: POMODORO_COLORS.cycles.study.primary,
    },
    break: {
      label: '休憩中',
      icon: BreakIcon,
      toggleLabel: '勉強に切り替え',
      toggleIcon: StudyIcon,
      color: POMODORO_COLORS.cycles.break.primary,
    },
  }
  return config[currentType]
}

const PomodoroMenuContents: React.FC<PomodoroMenuContentsProps> = ({
  totalStudyTime,
  totalBreakTime,
  totalCycles,
  currentType,
  isScrollToActionButton,
  isRunning,
  isNeedInitialize,
  onToggleTimerRunning,
  onToggleType,
  onClickHandleSession,
}) => {
  const typeConfig = useTypeConfig(currentType)
  const actionButtonRef = useRef<HTMLDivElement | null>(null)
  const toggleTimerRunningButtonColor = isRunning
    ? POMODORO_COLORS.states.paused
    : POMODORO_COLORS.states.running

  const handleSessionButtonColor = isNeedInitialize
    ? POMODORO_COLORS.states.running
    : POMODORO_COLORS.states.exceeded

  useEffect(() => {
    if (isScrollToActionButton && actionButtonRef.current) {
      actionButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [isScrollToActionButton])

  return (
    <Box
      sx={{
        p: 3,
        width: '80vw',
        maxWidth: 500,
        height: '80vh',
        bgcolor: 'white',
        overflowY: 'auto',
        borderRadius: 2,
      }}
    >
      {/* ヘッダー */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <StatsIcon sx={{ color: typeConfig.color, fontSize: 28 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${typeConfig.color} 30%, ${alpha(typeConfig.color, 0.7)} 90%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            セッション統計
          </Typography>
        </Box>

        {/* 現在の状態表示 */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: 20,
            backgroundColor: alpha(typeConfig.color, 0.1),
            border: `1px solid ${alpha(typeConfig.color, 0.3)}`,
          }}
        >
          <typeConfig.icon sx={{ color: typeConfig.color, fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{ color: typeConfig.color, fontWeight: 600 }}
          >
            現在: {typeConfig.label}
          </Typography>
        </Box>
      </Box>

      {/* 統計カード */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <StatCard
          icon={StudyIcon}
          label="総勉強時間"
          value={formatDuration(totalStudyTime)}
          color={POMODORO_COLORS.cycles.study.accent}
          bgColor={POMODORO_COLORS.cycles.study.primary}
        />

        <StatCard
          icon={BreakIcon}
          label="総休憩時間"
          value={formatDuration(totalBreakTime)}
          color={POMODORO_COLORS.cycles.break.accent}
          bgColor={POMODORO_COLORS.cycles.break.primary}
        />

        <StatCard
          icon={CycleIcon}
          label="完了サイクル"
          value={`${totalCycles} サイクル`}
          color={POMODORO_COLORS.states.completed}
          bgColor={POMODORO_COLORS.states.completed}
        />
      </Stack>

      <Divider sx={{ my: 3, borderColor: alpha(typeConfig.color, 0.2) }} />

      {/* アクションボタン */}

      <Stack spacing={2}>
        {!isNeedInitialize && (
          <>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={onToggleTimerRunning}
              sx={{
                py: 1.5,
                borderRadius: 3,
                borderColor: toggleTimerRunningButtonColor,
                color: toggleTimerRunningButtonColor,
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(toggleTimerRunningButtonColor, 0.1),
                  borderColor: toggleTimerRunningButtonColor,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Timer {isRunning ? '一時停止' : '再開'}
            </Button>

            {/* タイプ切り替えボタン */}
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={onToggleType}
              startIcon={<typeConfig.toggleIcon />}
              endIcon={<ToggleIcon />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                borderColor: typeConfig.color,
                color: typeConfig.color,
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(typeConfig.color, 0.1),
                  borderColor: typeConfig.color,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {typeConfig.toggleLabel}
            </Button>
          </>
        )}
        {/* セッション終了ボタン */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onClickHandleSession}
          startIcon={<ExitIcon />}
          sx={{
            py: 1.5,
            borderRadius: 3,
            backgroundColor: handleSessionButtonColor,
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: `0 4px 15px ${alpha(handleSessionButtonColor, 0.3)}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: alpha(handleSessionButtonColor, 0.9),
              transform: 'translateY(-1px)',
              boxShadow: `0 6px 20px ${alpha(handleSessionButtonColor, 0.4)}`,
            },
          }}
        >
          {isNeedInitialize ? '新しいセッション開始' : 'セッション終了'}
        </Button>
      </Stack>

      <Box ref={actionButtonRef} />

      {/* フッター情報 */}
      <Box sx={{ textAlign: 'center', mt: 3, pt: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: POMODORO_COLORS.ui.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          <TimeIcon sx={{ fontSize: 16 }} />
          お疲れさまです！継続は力なり ✨
        </Typography>
      </Box>
    </Box>
  )
}

export default PomodoroMenuContents
