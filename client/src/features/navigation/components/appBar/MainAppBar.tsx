import React, { useMemo } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentTechniqueIdFromPathname } from '../../../technique/functions/path-helper'
import useFullTechniqueData from '../../../technique/hooks/useFullTechniqueData'
import { MAIN_APP_BAR_HEIGHT } from '../../constants/components/navigation-size'
import { createFadeInFromBottomAnimation } from '../../../../animations/animations'
import { useTheme } from '@mui/material'

interface MobileAppBarProps {
  // 必要であれば、ここに汎用的なプロパティを追加
}

const MainAppBar: React.FC<MobileAppBarProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const techniquesData = useFullTechniqueData()

  const currentTechnique = useMemo(() => {
    const techniqueId = getCurrentTechniqueIdFromPathname(location.pathname)
    if (techniqueId) {
      return techniquesData.find((data) => data.techniqueId === techniqueId)
    }
    return null
  }, [techniquesData, location.pathname])

  const handleOpenOption = () => {
    console.log('オプションボタンがクリックされました')
  }

  const handleBack = () => {
    navigate(-1)
  }

  const { palette } = useTheme()
  palette.primary.contrastText

  const appBarTitle = currentTechnique
    ? `${currentTechnique.officialName} (Lv.${currentTechnique.currentLevel})`
    : 'MOTIVALT'

  return (
    <AppBar
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: MAIN_APP_BAR_HEIGHT,
        // カラーパレットからグラデーションカラーを適用
        background: `linear-gradient(to right, ${palette.appBarGradient?.start}, ${palette.appBarGradient?.end})`,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar>
        {/* 左側: 戻るボタン (テクニック詳細ページのみ表示) */}
        {currentTechnique && (
          <IconButton
            size="large"
            edge="start"
            color="inherit" // IconButtonのinheritはTypographyのcolorとは異なる挙動をするので注意
            aria-label="back"
            onClick={handleBack}
            sx={{
              color: palette.text.secondary, // 文字色に合わせるか、個別に調整
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}

        {/* 中央: タイトル (テクニック名+レベル、またはアプリ名) */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            animation: `${createFadeInFromBottomAnimation({ duration: '0.5s' })}`,
            color: palette.text.secondary,
          }}
        >
          {appBarTitle}
        </Typography>

        {/* 右側: オプションボタン (3点リーダ) */}
        <IconButton
          size="large"
          edge="end"
          color="inherit" // IconButtonのinheritはTypographyのcolorとは異なる挙動をするので注意
          aria-label="options"
          onClick={handleOpenOption}
          sx={{
            color: palette.text.secondary, // 文字色に合わせるか、個別に調整
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MainAppBar
