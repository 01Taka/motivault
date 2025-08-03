import React from 'react'
import { Box, Paper, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

interface DynamicBottomPanelProps {
  isVisible: boolean
  isOpen: boolean
  children: React.ReactNode // メインコンテンツ
  onOpen?: () => void
  onClose?: () => void
  hideToggleButton?: boolean
  closedHeight?: string // 閉じた状態の高さ (例: '85px')
  openHeight?: string // 開いた状態の高さ (例: '300px')
  transitionDuration?: number // アニメーションの速度 ms (例: 300)
  barElevation?: number // バーの影の強さ
  barBorderRadius?: string // バーの角丸 (例: '16px 16px 0 0')
}

// 動的なスタイルを管理する styled コンポーネントを定義
const StyledRootContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'relative',
})

const StyledContentContainer = styled(Box)<{
  closedheight: string
  isvisible: string
  transitionduration: number
}>(({ closedheight, isvisible, transitionduration }) => ({
  flex: 1,
  overflow: 'auto',
  paddingBottom: isvisible === 'true' ? closedheight : '0',
  transition: `padding-bottom ${transitionduration / 1000}s ease-in-out`,
}))

const StyledBottomBar = styled(Paper)<{
  barborderradius: string
  transitionduration: number
  isvisible: string
  isopen: string
  closedheight: string
  openheight: string
}>(
  ({
    theme,
    barborderradius,
    transitionduration,
    isvisible,
    isopen,
    closedheight,
    openheight,
  }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: barborderradius,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    transition: `height ${transitionduration / 1000}s ease-in-out`,
    height:
      isvisible === 'true'
        ? isopen === 'true'
          ? openheight
          : closedheight
        : '0',
  })
)

const DynamicBottomPanel: React.FC<DynamicBottomPanelProps> = ({
  isVisible,
  isOpen,
  children,
  onOpen,
  onClose,
  hideToggleButton = false,
  closedHeight = '85px',
  openHeight = '300px',
  transitionDuration = 300,
  barElevation = 4,
  barBorderRadius = '16px 16px 0 0',
}) => {
  // `styled`コンポーネントに渡すため、booleanを文字列に変換
  const isVisibleStr = isVisible.toString()
  const isOpenStr = isOpen.toString()

  const handleToggle = () => {
    if (isOpen) {
      onClose?.()
    } else {
      onOpen?.()
    }
  }

  return (
    <StyledRootContainer>
      <StyledContentContainer
        closedheight={closedHeight}
        isvisible={isVisibleStr}
        transitionduration={transitionDuration}
      />
      <StyledBottomBar
        barborderradius={barBorderRadius}
        transitionduration={transitionDuration}
        elevation={barElevation}
        isvisible={isVisibleStr}
        isopen={isOpenStr}
        closedheight={closedHeight}
        openheight={openHeight}
      >
        {!hideToggleButton && (onOpen || onClose) && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: isOpen ? 60 : 35,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <IconButton
              size="large"
              sx={{ color: 'text.secondary' }}
              onClick={handleToggle}
            >
              {isOpen ? (
                <KeyboardArrowDown fontSize="large" />
              ) : (
                <KeyboardArrowUp fontSize="large" />
              )}
            </IconButton>
          </Box>
        )}
        {/* バーのコンテンツをここに配置 */}
        <Box sx={{ flex: 1, overflowY: 'auto', height: '100%' }}>
          {children}
        </Box>
      </StyledBottomBar>
    </StyledRootContainer>
  )
}

export default DynamicBottomPanel
