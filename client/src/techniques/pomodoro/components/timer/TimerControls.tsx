import { Loop } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

import React from 'react'

interface TimerControlsProps {
  status: string
  nextTypeName: string
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onSwitchMode: () => void
}

const TimerControls: React.FC<TimerControlsProps> = ({
  status,
  nextTypeName,
  onStart,
  onPause,
  onResume,
  onSwitchMode,
}) => {
  return (
    <Stack spacing={2}>
      {status === 'idle' && (
        <Button variant="contained" onClick={onStart}>
          開始
        </Button>
      )}
      {status === 'running' && (
        <Button variant="outlined" onClick={onPause}>
          一時停止
        </Button>
      )}
      {status === 'paused' && (
        <Button variant="contained" onClick={onResume}>
          再開
        </Button>
      )}
      <Button variant="text" onClick={() => onSwitchMode()}>
        <Loop />
        {nextTypeName}に切替
      </Button>
    </Stack>
  )
}

export default TimerControls
