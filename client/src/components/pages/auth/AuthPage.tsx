import React, { createContext } from 'react'
import { Outlet } from 'react-router-dom'

interface AuthPageProps {}

interface AuthContextProps {
  setupPagePath: string
}
export const AuthContext = createContext<AuthContextProps>({
  setupPagePath: '',
})

const AuthPage: React.FC<AuthPageProps> = ({}) => {
  return (
    <AuthContext.Provider
      value={{
        setupPagePath: '/auth/setup',
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  )
}

export default AuthPage
