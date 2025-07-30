import { Button, Stack, Typography, Paper, alpha, Box } from '@mui/material'
import {
  School as StudyIcon,
  Speed as SpeedIcon,
  Psychology as DeepIcon,
  CenterFocusStrong as FocusIcon,
} from '@mui/icons-material'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'
import {
  TIMER_MODE_LABEL,
  TIMER_MODE_SETTINGS,
} from '../../constants/timer-mode-constants'
import type { PomodoroTimerMode } from '../../types/pomodoro-types'
import { createFadeInAnimation } from '../../../../animations/animations'

interface NextSessionSelectorProps {
  selectedNextMode: PomodoroTimerMode | null
  onSelectNextMode: (mode: PomodoroTimerMode) => void
}

const modeIcons = {
  quick: SpeedIcon,
  focus: FocusIcon,
  deep: DeepIcon,
}

const modeColors = {
  quick: '#FF6B6B',
  focus: '#4ECDC4',
  deep: '#9B59B6',
}

const NextSessionSelector: React.FC<NextSessionSelectorProps> = ({
  selectedNextMode,
  onSelectNextMode,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        background:
          'linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(78, 205, 196, 0.05) 100%)',
        border: '2px solid rgba(78, 205, 196, 0.2)',
        width: '100%',
        maxWidth: 350,
        animation: createFadeInAnimation(),
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StudyIcon sx={{ color: '#4ECDC4', fontSize: 24 }} />
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              background:
                'linear-gradient(45deg, #4ECDC4 30%, rgba(78, 205, 196, 0.7) 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            次のセッション 🚀
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          {(['quick', 'focus', 'deep'] as PomodoroTimerMode[]).map((mode) => {
            const IconComponent = modeIcons[mode]
            const isSelected = selectedNextMode === mode
            const color = modeColors[mode]

            return (
              <Button
                key={mode}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => onSelectNextMode(mode)}
                sx={{
                  flexDirection: 'column',
                  py: 1.5,
                  px: 1,
                  minWidth: 0,
                  flex: 1,
                  maxWidth: 100,
                  borderRadius: 2,
                  border: `2px solid ${color}`,
                  backgroundColor: isSelected ? color : 'transparent',
                  color: isSelected ? 'white' : color,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isSelected ? color : alpha(color, 0.1),
                    borderColor: color,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <IconComponent sx={{ fontSize: 20, mb: 0.5 }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, fontSize: '0.7rem', lineHeight: 1 }}
                >
                  {TIMER_MODE_LABEL[mode]}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, fontSize: '0.8rem' }}
                >
                  {Math.floor(TIMER_MODE_SETTINGS[mode].study / MINUTES_IN_MS)}
                  分
                </Typography>
              </Button>
            )
          })}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default NextSessionSelector
