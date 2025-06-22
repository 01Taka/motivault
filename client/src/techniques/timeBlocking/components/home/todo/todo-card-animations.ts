import { keyframes } from '@emotion/react'

export const pulseBorder = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`

export const floatY = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`

export const completeEffect = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); }
  30% { transform: scale(1.05); box-shadow: 0 0 10px rgba(34,197,94,0.6); }
  60% { transform: scale(1); box-shadow: 0 0 4px rgba(34,197,94,0.3); }
  100% { transform: scale(1); }
`

export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0.3; transform: scale(0.97); }
`
