import React from 'react'
import { Outlet } from 'react-router-dom'
import MainAppBar from '../../navigation/components/appBar/MainAppBar'
import { Box } from '@mui/material'
import {
  MAIN_APP_BAR_HEIGHT,
  MAIN_BOTTOM_NAVIGATION_HEIGHT,
} from '../../navigation/constants/components/navigation-size'

interface TechniquesLayoutProps {}

const TechniquesLayout: React.FC<TechniquesLayoutProps> = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MainAppBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1, // 残りのスペースをすべて占める
          overflowY: 'auto', // コンテンツがはみ出したらスクロール可能にする
          paddingTop: MAIN_APP_BAR_HEIGHT,
          paddingBottom: MAIN_BOTTOM_NAVIGATION_HEIGHT,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default TechniquesLayout
