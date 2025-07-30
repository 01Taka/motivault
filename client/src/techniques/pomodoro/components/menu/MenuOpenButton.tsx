import React from 'react'
import { Stack, IconButton, Slide, Typography, useTheme } from '@mui/material'
import { MenuOpen } from '@mui/icons-material'

interface MenuOpenButtonProps {
  isScrollToMenuOpenButton: boolean
  setOpenMenu: (open: boolean) => void
}

const MenuOpenButton: React.FC<MenuOpenButtonProps> = ({
  isScrollToMenuOpenButton,
  setOpenMenu,
}) => {
  // アニメーションのスタイルを定義
  const slideInAnimation = '0.5s ease-out 0s 1 slide-in-animation' // 実際のCSSアニメーション定義

  const { palette } = useTheme()
  return (
    <Stack direction="column" sx={{ position: 'fixed', top: 65, right: 5 }}>
      <IconButton onClick={() => setOpenMenu(true)}>
        <Slide
          in={isScrollToMenuOpenButton}
          direction="right"
          mountOnEnter
          unmountOnExit
        >
          <Typography
            variant="caption"
            sx={{
              color: palette.text.secondary,
              animation: slideInAnimation,
            }}
          >
            終了
          </Typography>
        </Slide>
        <MenuOpen sx={{ fontSize: '2.5rem' }} />
      </IconButton>
    </Stack>
  )
}

export default MenuOpenButton
