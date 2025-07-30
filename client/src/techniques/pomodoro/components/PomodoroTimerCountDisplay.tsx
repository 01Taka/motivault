import React from 'react'
import { Typography, Paper, Box, alpha } from '@mui/material'
import {
  Schedule as TimeIcon,
  TrendingUp as ExceededIcon,
  PlayCircle as RunningIcon,
} from '@mui/icons-material'
import type { PomodoroCycleType } from '../services/documents/pomodoro-session-shared-data'
import { POMODORO_COLORS } from '../constants/theme-colors'
import { createFadeInAnimation } from '../../../animations/animations'

interface PomodoroTimerCountDisplayProps {
  remainingTime: number
  elapsedTime: number
  type: PomodoroCycleType
  isRunning: boolean
  isTimeExceeded: boolean
}

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(Math.abs(ms) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const sign = ms < 0 ? '-' : ''

  return `${sign}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const PomodoroTimerCountDisplay: React.FC<PomodoroTimerCountDisplayProps> = ({
  remainingTime,
  elapsedTime,
  type,
  isRunning,
  isTimeExceeded,
}) => {
  const displayTime = isTimeExceeded ? elapsedTime : remainingTime
  const cycleColors = POMODORO_COLORS.cycles[type]

  // 状態に応じた色とアイコンを決定
  const getStatusConfig = () => {
    if (isTimeExceeded) {
      return {
        color: POMODORO_COLORS.states.exceeded,
        icon: ExceededIcon,
        label: '超過時間',
        pulse: true,
      }
    }
    if (isRunning) {
      return {
        color: cycleColors.accent,
        icon: RunningIcon,
        label: type === 'study' ? '集中中' : 'チル中',
        pulse: true,
      }
    }
    return {
      color: cycleColors.primary,
      icon: TimeIcon,
      label: type === 'study' ? '勉強時間' : '休憩時間',
      pulse: false,
    }
  }

  const statusConfig = getStatusConfig()
  const StatusIcon = statusConfig.icon

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        p: 4,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(cycleColors.gradient.start, 0.15)} 0%, ${alpha(cycleColors.gradient.end, 0.05)} 100%)`,
        border: `3px solid ${alpha(cycleColors.primary, 0.3)}`,
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        overflow: 'hidden',
        animation: createFadeInAnimation(),
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${cycleColors.gradient.start} 0%, ${cycleColors.gradient.end} 100%)`,
        },
      }}
    >
      {/* ステータスヘッダー */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mb: 2,
          opacity: 0.8,
        }}
      >
        <StatusIcon
          sx={{
            color: statusConfig.color,
            fontSize: 24,
            animation: statusConfig.pulse ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.6 },
              '100%': { opacity: 1 },
            },
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: statusConfig.color,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.9rem',
          }}
        >
          {statusConfig.label}
        </Typography>
      </Box>

      {/* メインタイマー表示 */}
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontFamily: '"Roboto Mono", "Monaco", "Consolas", monospace',
          fontWeight: 800,
          fontSize: { xs: '3.5rem', sm: '4.5rem' },
          lineHeight: 1,
          background: `linear-gradient(45deg, ${statusConfig.color} 30%, ${alpha(statusConfig.color, 0.7)} 90%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `0 2px 10px ${alpha(statusConfig.color, 0.3)}`,
          transition: 'all 0.3s ease',
          mb: 1,
        }}
      >
        {formatTime(displayTime)}
      </Typography>

      {/* 追加情報 */}
      {isTimeExceeded && (
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: alpha(POMODORO_COLORS.states.exceeded, 0.1),
            border: `1px solid ${alpha(POMODORO_COLORS.states.exceeded, 0.2)}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: POMODORO_COLORS.states.exceeded,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            ⏰ 設定時間を超過しています
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default PomodoroTimerCountDisplay
