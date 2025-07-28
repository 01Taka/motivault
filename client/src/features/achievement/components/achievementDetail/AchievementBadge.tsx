import React from 'react'
import { Box } from '@mui/material'
import { Star as StarIcon } from '@mui/icons-material'

interface AchievementBadgeProps {
  badgeImageUrl?: string
  name: string
  rarityColor: any
  size?: number // サイズのオプション (デフォルト: 120)
  borderWidth?: number // ボーダーの幅のオプション (デフォルト: 2)
  iconSize?: number // アイコンのサイズ (デフォルト: 60)
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  badgeImageUrl,
  name,
  rarityColor,
  size = 120, // デフォルトサイズ
  borderWidth = 2, // デフォルトボーダー幅
  iconSize = 60, // デフォルトアイコンサイズ
}) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `${borderWidth}px solid ${rarityColor?.border}`,
      bgcolor: rarityColor?.background,
      boxShadow: `0px 8px 8px ${rarityColor?.glow}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {badgeImageUrl ? (
      <Box
        component="img"
        src={badgeImageUrl}
        alt={name}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%', // 画像を円形に
        }}
      />
    ) : (
      <StarIcon sx={{ fontSize: iconSize, color: rarityColor?.contrastText }} />
    )}
  </Box>
)

export default AchievementBadge
