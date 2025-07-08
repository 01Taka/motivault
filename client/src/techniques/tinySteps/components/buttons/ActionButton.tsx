import React from 'react'
import { Button, Typography } from '@mui/material'

interface ActionButtonProps {
  onClick: () => void
  disabled: boolean
  label: string
  subLabel?: string
  color: {
    enabled: string
    hover: string
    disabled: string
  }
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled,
  label,
  subLabel,
  color,
}) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: disabled ? color.disabled : color.enabled,
        color: 'white',
        padding: 2,
        fontSize: 16,
        '&:hover': {
          backgroundColor: disabled ? '#90A4AE' : color.hover,
        },
        textTransform: 'none',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: 3,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
      {subLabel && (
        <Typography sx={{ color: '#888', fontSize: 12, marginTop: 1 }}>
          {subLabel}
        </Typography>
      )}
    </Button>
  )
}

export default ActionButton
