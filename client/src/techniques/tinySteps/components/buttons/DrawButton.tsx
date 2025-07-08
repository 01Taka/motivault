import React from 'react'
import { Button, Typography } from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const appColors = {
  primaryPurple: '#6a0dad',
  darkPurple: '#5a0a9a',
  lightGreen: '#88d8b0',
  darkGreen: '#6ab090',
  neutralGrey: '#4a4a4a',
  darkGrey: '#3a3a3a',
  textPrimary: '#ffffff',
  textSecondary: '#e0e0e0',
  textDisabled: '#b0b0b0',
}

interface DrawButtonProps {
  type: 'draw' | 'redraw'
  onClick: () => void
  disabled?: boolean
  label: string
}

const DrawButton: React.FC<DrawButtonProps> = ({
  type,
  onClick,
  disabled = false,
  label,
}) => {
  const isDraw = type === 'draw'
  const IconComponent = isDraw ? ShuffleIcon : RestartAltIcon

  const buttonStyles = {
    draw: {
      backgroundColor: appColors.primaryPurple,
      color: appColors.textPrimary,
      '&:hover': {
        backgroundColor: appColors.darkPurple,
        boxShadow: `0px 6px 20px ${appColors.primaryPurple}60`,
      },
      boxShadow: `0px 4px 15px ${appColors.primaryPurple}40`,
      transition: 'all 0.3s ease',
      '&:active': {
        transform: 'scale(0.98)',
      },
    },
    redraw: {
      backgroundColor: 'transparent',
      border: `2px solid ${appColors.lightGreen}`,
      color: appColors.lightGreen,
      '&:hover': {
        backgroundColor: `${appColors.lightGreen}1a`,
        borderColor: appColors.darkGreen,
        color: appColors.darkGreen,
      },
      boxShadow: 'none',
      transition: 'all 0.3s ease',
      '&:active': {
        transform: 'scale(0.98)',
      },
    },
    disabled: {
      backgroundColor: appColors.neutralGrey,
      color: appColors.textDisabled,
      boxShadow: 'none',
      border: 'none',
      cursor: 'not-allowed',
      '&:hover': {
        backgroundColor: appColors.neutralGrey,
      },
    },
  }

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      sx={{
        justifyContent: 'flex-start', // 左寄せ
        borderRadius: 3,
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: '0.95rem',
        gap: 0.5,
        minHeight: '56px',
        ...(isDraw ? buttonStyles.draw : buttonStyles.redraw),
        ...(disabled && buttonStyles.disabled),
      }}
    >
      <IconComponent sx={{ fontSize: '1.2rem' }} />
      <Typography
        variant="button"
        sx={{ fontSize: 'inherit', color: 'inherit' }}
      >
        {label}
      </Typography>
    </Button>
  )
}

export default DrawButton
