// src/components/AppStartIndex.tsx
import React from 'react'
import { Button, Box, Stack, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { createPulseAnimation } from '../../../animations/animations'

const AppStartIndex: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const StartButton = styled(Button)({
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    fontSize: '24px',
    marginTop: '30px',
    background: `linear-gradient(45deg, ${theme.palette.actionButtonGradient?.start}, ${theme.palette.actionButtonGradient?.end})`,
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.actionButtonGradientHover?.start}, ${theme.palette.actionButtonGradientHover?.end})`,
      transform: 'scale(1.05)',
    },
    transition: 'all 0.3s ease-in-out',
    animation: createPulseAnimation({ scaleAmount: 1.05 }),
  })

  return (
    <Box>
      <Stack justifyContent="center" alignItems="center">
        <StartButton
          variant="contained"
          onClick={() => navigate('/start/select-auth-method')}
        >
          はじめよう
        </StartButton>
      </Stack>
    </Box>
  )
}

export default AppStartIndex
