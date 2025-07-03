import { Help, Book } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'

const FeynmanBottomNav: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 現在のパスに応じてナビの状態を切り替える
  const getCurrentTab = () => {
    if (location.pathname.startsWith('/techniques/feynman/notes'))
      return 'notes'
    return 'questions'
  }

  const [value, setValue] = React.useState(getCurrentTab())

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    navigate(
      newValue === 'questions'
        ? '/techniques/feynman'
        : '/techniques/feynman/notes'
    )
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          height: 64,
          bgcolor: 'white',
          '& .Mui-selected': {
            color: 'primary.main',
          },
          '& .MuiBottomNavigationAction-root': {
            transition: '0.2s',
          },
        }}
      >
        <BottomNavigationAction
          label="未解決"
          value="questions"
          icon={<Help />}
        />
        <BottomNavigationAction
          label="自分辞書"
          value="notes"
          icon={<Book />}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default FeynmanBottomNav
