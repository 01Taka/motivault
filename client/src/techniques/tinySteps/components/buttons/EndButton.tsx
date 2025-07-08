import React from 'react'
import ActionButton from './ActionButton'

interface EndButtonProps {
  onClick: () => void
  disabled: boolean
}

const EndButton: React.FC<EndButtonProps> = ({ onClick, disabled }) => {
  return (
    <ActionButton
      onClick={onClick}
      disabled={disabled}
      label="目標達成"
      subLabel="ひとことフィードバック"
      color={{
        enabled: '#4CAF50',
        hover: '#388E3C',
        disabled: '#B0BEC5',
      }}
    />
  )
}

export default EndButton
