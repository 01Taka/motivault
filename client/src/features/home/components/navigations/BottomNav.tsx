import React, { useEffect, useState } from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircleOutline, Search } from '@mui/icons-material'

interface NavItem {
  label: string
  value: string
  icon: React.ReactElement
}

const navItems: NavItem[] = [
  {
    label: 'マイテクニック',
    value: '/',
    icon: <CheckCircleOutline />,
  },
  { label: 'テクニックを探す', value: '/search', icon: <Search /> },
]

const BottomNav: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(location.pathname)

  useEffect(() => {
    setValue(location.pathname)
  }, [location.pathname])

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    navigate(newValue)
  }

  return (
    <Paper
      elevation={3}
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
