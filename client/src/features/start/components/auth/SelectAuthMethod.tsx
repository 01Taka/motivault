// src/components/SelectAuthMethod.tsx
import React from 'react'
import { Button, Box, Typography, Stack, Grid2 } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'

// MUI Icons
import GoogleIcon from '@mui/icons-material/Google'
import AppleIcon from '@mui/icons-material/Apple'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import { createPulseAnimation } from '../../styles/base-animations'
import { useGoogleLogin } from '../../../auth/services/hooks/useGoogleLogin'

// --- Styled Components ---

interface AuthButtonProps {
  bgcolor: string // Background color prop for custom styling
}

// Styled Button for authentication methods
const AuthMethodButton = styled(Button)<AuthButtonProps>(({ bgcolor }) => ({
  width: '120px', // Smaller circular buttons
  height: '120px',
  borderRadius: '50%',
  minWidth: 0, // Override min-width for circular shape
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: bgcolor, // Use the passed background color
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: bgcolor, // Keep same color on hover for consistency with custom color
    transform: 'scale(1.05)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSvgIcon-root': {
    // Style for the icon inside the button
    fontSize: '40px', // Larger icon size
    marginBottom: '8px',
  },
  animation: createPulseAnimation(),
}))

// --- SelectAuthMethod Component ---

const SelectAuthMethod: React.FC = () => {
  const navigate = useNavigate()

  const { handleLogin: handleGoogleLogin } = useGoogleLogin({
    nextPageOnSuccess: '/start/user-setup',
  })

  const handleAuthClick = (method: string) => {
    console.log(`Authenticating with: ${method}`)
    navigate(`/start/auth-success?method=${method}`) // Example navigation
  }

  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
        認証方法を選択してください
      </Typography>

      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
        {/* Google 認証 */}
        <Grid2>
          <AuthMethodButton
            bgcolor="#DB4437"
            onClick={() => handleGoogleLogin()}
          >
            <GoogleIcon />
            Google
          </AuthMethodButton>
        </Grid2>

        {/* Apple ID 認証 */}
        <Grid2>
          <AuthMethodButton
            bgcolor="#000000"
            onClick={() => handleAuthClick('AppleID')}
          >
            <AppleIcon />
            Apple ID
          </AuthMethodButton>
        </Grid2>

        {/* 電話番号認証 */}
        <Grid2>
          <AuthMethodButton
            bgcolor="#4CAF50"
            onClick={() => handleAuthClick('Phone')}
          >
            <PhoneIphoneIcon />
            電話番号
          </AuthMethodButton>
        </Grid2>
      </Grid2>

      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Button variant="text" onClick={() => navigate(-1)}>
          戻る
        </Button>
      </Stack>
    </Box>
  )
}

export default SelectAuthMethod
