import { Help, Book } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

import React from 'react'

interface FeynmanBottomNavProps {}

const FeynmanBottomNav: React.FC<FeynmanBottomNavProps> = ({}) => {
  return (
    <BottomNavigation sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <BottomNavigationAction label="未解決" icon={<Help />} />
      <BottomNavigationAction label="自分辞書" icon={<Book />} />
    </BottomNavigation>
  )
}

export default FeynmanBottomNav
