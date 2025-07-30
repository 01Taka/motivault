// components/BreakTimeSelector.tsx
import {
  Box,
  Button,
  Stack,
  Typography,
  Chip,
  Paper,
  alpha,
} from '@mui/material'
import {
  AccessTime as TimeIcon,
  Coffee as CoffeeIcon,
} from '@mui/icons-material'
import {
  SECONDS_IN_MS,
  MINUTES_IN_MS,
} from '../../../../constants/datetime-constants'
import { TIMER_MODE_SETTINGS } from '../../constants/timer-mode-constants'
import type { PomodoroTimerMode } from '../../types/pomodoro-types'
import { createFadeInAnimation } from '../../../../animations/animations'

interface BreakTimeSelectorProps {
  currentMode: PomodoroTimerMode
  isTimeExceeded: boolean
  onSelectBreakTime: (timeMs: number) => void
}

const MODE_COLORS = {
  quick: '#FF6B6B',
  focus: '#4ECDC4',
  deep: '#9B59B6',
} as const

const formatTime = (timeMs: number): string => {
  const isSeconds = timeMs < 60 * SECONDS_IN_MS
  const value = isSeconds
    ? timeMs / SECONDS_IN_MS
    : Math.floor(timeMs / MINUTES_IN_MS)
  const unit = isSeconds ? '秒' : '分'

  return `${value}${unit}`
}

const BreakTimeSelector: React.FC<BreakTimeSelectorProps> = ({
  currentMode,
  isTimeExceeded,
  onSelectBreakTime,
}) => {
  const modeColor = MODE_COLORS[currentMode]
  const breakChoices = TIMER_MODE_SETTINGS[currentMode].breakChoices

  const paperStyles = {
    p: 2,
    borderRadius: 3,
    background: `linear-gradient(135deg, ${alpha(modeColor, 0.1)} 0%, ${alpha(modeColor, 0.05)} 100%)`,
    border: `2px solid ${alpha(modeColor, 0.2)}`,
    width: '100%',
    maxWidth: 350,
    animation: createFadeInAnimation(),
  }

  const titleStyles = {
    fontWeight: 700,
    background: `linear-gradient(45deg, ${modeColor} 30%, ${alpha(modeColor, 0.7)} 90%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

  const getButtonStyles = (disabled: boolean) => ({
    borderColor: modeColor,
    color: modeColor,
    height: 60,
    flex: 1,
    borderRadius: 2,
    fontWeight: 600,
    textTransform: 'none' as const,
    fontSize: '0.85rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: alpha(modeColor, 0.1),
      borderColor: modeColor,
      transform: disabled ? 'none' : 'translateY(-1px)',
    },
    '&:disabled': {
      opacity: 0.5,
    },
  })

  return (
    <Paper elevation={0} sx={paperStyles}>
      <Stack spacing={2} alignItems="center">
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CoffeeIcon sx={{ color: modeColor, fontSize: 24 }} />
          <Typography variant="subtitle1" sx={titleStyles}>
            チル時間 ✨
          </Typography>
        </Box>

        {/* ボタングループ */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          {breakChoices.map((choiceMs) => (
            <Button
              key={choiceMs}
              variant="outlined"
              onClick={() => onSelectBreakTime(choiceMs)}
              disabled={!isTimeExceeded}
              startIcon={<TimeIcon sx={{ fontSize: 18 }} />}
              sx={getButtonStyles(!isTimeExceeded)}
            >
              {formatTime(choiceMs)}
            </Button>
          ))}
        </Stack>

        {/* 状態表示チップ */}
        {!isTimeExceeded && (
          <Chip
            label="タイマー終了後に選択可能"
            size="small"
            variant="filled"
            sx={{
              backgroundColor: alpha(modeColor, 0.1),
              color: modeColor,
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        )}
      </Stack>
    </Paper>
  )
}

export default BreakTimeSelector
