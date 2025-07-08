import React from 'react'
import ActionButton from './ActionButton'

interface StartButtonProps {
  onClick: () => void
  disabled: boolean
}

const StartButton: React.FC<StartButtonProps> = ({ onClick, disabled }) => {
  return (
    <ActionButton
      onClick={onClick}
      disabled={disabled}
      label="はじめる"
      subLabel="15分のタイマー開始"
      color={{
        enabled: '#6200EE',
        hover: '#3700B3',
        disabled: '#B0BEC5',
      }}
    />
  )
}

export default StartButton
