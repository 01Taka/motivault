import type { Theme } from '@emotion/react'
import type { SxProps } from '@mui/material'

export const cardContainerStyle: SxProps<Theme> = {
  p: 2.5,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
  borderRadius: 3,
  backgroundColor: '#FFF9F2',
  borderLeft: '3px solid #FF7043',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
}

export const motionHoverVariant = {
  initial: { scale: 1, boxShadow: 'none' },
  hover: {
    scale: 1.015,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
}
