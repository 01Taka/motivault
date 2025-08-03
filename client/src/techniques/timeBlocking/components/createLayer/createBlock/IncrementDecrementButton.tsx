import { IconButton } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'

interface IncrementDecrementButtonProps {
  onClick?: () => void
  disabled: boolean
  isIncrement: boolean
}

const IncrementDecrementButton: React.FC<IncrementDecrementButtonProps> = ({
  onClick,
  disabled,
  isIncrement,
}) => {
  const color = isIncrement ? '76, 175, 80' : '244, 67, 54'
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      size="small"
      sx={{
        bgcolor: disabled ? 'rgba(255,255,255,0.1)' : `rgba(${color}, 0.2)`,
        color: disabled ? 'rgba(255,255,255,0.3)' : color,
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.1)' : `rgba(${color}, 0.3)`}`,
        borderRadius: 2,
        minWidth: '44px',
        minHeight: '44px',
        '&:hover:not(:disabled)': {
          bgcolor: `rgba(${color}, 0.25)`,
          transform: 'scale(1.05)',
        },
        '&:disabled': {
          cursor: 'not-allowed',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {isIncrement ? <Add fontSize="small" /> : <Remove fontSize="small" />}
    </IconButton>
  )
}

export default IncrementDecrementButton
