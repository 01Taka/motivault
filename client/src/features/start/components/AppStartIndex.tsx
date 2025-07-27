// src/components/AppStartIndex.tsx
import React from 'react'
import { Button, Box, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { createPulseAnimation } from '../../../theme/animations'

// --- Styled Components ---

const StartButton = styled(Button)({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  fontSize: '24px',
  marginTop: '30px',
  background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(45deg, #e96f62, #feb47b)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease-in-out',
  animation: createPulseAnimation({ scaleAmount: 1.05 }),
})

// --- AppStart Component ---

const AppStartIndex: React.FC = () => {
  const navigate = useNavigate()

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
