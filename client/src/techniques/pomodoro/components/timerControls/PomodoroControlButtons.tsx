import { Box } from '@mui/material'
import BreakTimeSelector from './BreakTimeSelector'
import NextSessionSelector from './NextSessionSelector'
import type { PomodoroCycleType } from '../../services/documents/pomodoro-session-shared-data'
import type { PomodoroTimerMode } from '../../types/pomodoro-types'

interface PomodoroControlButtonsProps {
  type: PomodoroCycleType
  isTimeExceeded: boolean
  currentMode: PomodoroTimerMode
  selectedNextMode: PomodoroTimerMode | null
  onSelectNextMode: (mode: PomodoroTimerMode) => void
  onSelectBreakTime: (timeMs: number) => void
}

const PomodoroControlButtons: React.FC<PomodoroControlButtonsProps> = ({
  isTimeExceeded,
  type,
  currentMode,
  selectedNextMode,
  onSelectNextMode,
  onSelectBreakTime,
}) => {
  const isStudyPhase = type === 'study'
  const isBreakPhase = type === 'break'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 2,
        px: 1,
        width: '100%',
      }}
    >
      {isStudyPhase && (
        <BreakTimeSelector
          currentMode={currentMode}
          isTimeExceeded={isTimeExceeded}
          onSelectBreakTime={onSelectBreakTime}
        />
      )}

      {isBreakPhase && (
        <NextSessionSelector
          selectedNextMode={selectedNextMode}
          onSelectNextMode={onSelectNextMode}
        />
      )}
    </Box>
  )
}

export default PomodoroControlButtons
