import React from 'react'
import { Box, useTheme } from '@mui/material'
import AchievementBadge from './AchievementBadge' // 新しく分けたファイルをインポート
import type { AchievementStaticInfo } from '../../types/data/achievement-data-types'
import { getRarityColor } from '../../../../functions/theme/rarity-color-utils'
import AchievementTitle from './AchievementTitle'

interface SimpleAchievementProps {
  achievement: AchievementStaticInfo
}

const SimpleAchievement: React.FC<SimpleAchievementProps> = ({
  achievement,
}) => {
  const { palette } = useTheme()
  const rarityColor = getRarityColor(achievement.rarity ?? 'common', palette)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: rarityColor?.contrastText,
        minWidth: 100,
      }}
    >
      <AchievementTitle
        name={achievement?.name}
        glow={rarityColor?.glow}
        fontSize="0.9rem"
      />
      <AchievementBadge
        badgeImageUrl={achievement?.badgeImageUrl}
        name={achievement?.name}
        rarityColor={rarityColor}
        size={80} // サイズを指定 (簡易表示用に小さく)
        iconSize={40} // アイコンサイズを指定
      />
    </Box>
  )
}

export default SimpleAchievement
