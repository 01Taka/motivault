import type { Theme } from '@emotion/react'
import type { SxProps } from '@mui/material'

export const cardContainerStyle: SxProps<Theme> = {
  p: 2.5,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  borderRadius: 3,
  backgroundColor: '#FFF9F2',
  border: '1px solid #FF7043',
  borderLeft: '3px solid #FF7043',
  transition: 'box-shadow 0.3s ease',
  boxShadow: 2,

  animation: 'pulseBorder 2s ease-in-out infinite',

  '@keyframes pulseBorder': {
    '0%': {
      borderColor: 'rgba(255, 112, 67, 0.3)',
      transform: 'scale(1)',
    },
    '50%': {
      borderColor: 'rgba(255, 112, 67, 1.0)',
      transform: 'scale(1.01)',
    },
    '100%': {
      borderColor: 'rgba(255, 112, 67, 0.3)',
      transform: 'scale(1)',
    },
  },
}

export const motionHoverVariant = {
  initial: { scale: 1, boxShadow: 'none' },
  hover: {
    scale: 1.015,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
}
