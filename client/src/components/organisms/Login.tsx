import { Box, Container } from '@mui/material'
import React, { useContext } from 'react'
import LoginCard from '../../features/auth/components/LoginCard'
import { useGoogleLogin } from '../../features/auth/hooks/useGoogleLogin'
import { AuthContext } from '../pages/auth/AuthPage'

const LoginPage: React.FC = () => {
  const { setupPagePath } = useContext(AuthContext)
  const { handleLogin } = useGoogleLogin({ nextPageOnSuccess: setupPagePath })

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LoginCard onLogin={handleLogin} />
      </Box>
    </Container>
  )
}

export default LoginPage
