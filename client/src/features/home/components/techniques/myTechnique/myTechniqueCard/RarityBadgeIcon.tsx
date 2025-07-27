import React from 'react'
import { Avatar, Tooltip } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { rarityStyles } from '../../../../../achievements/constants/rarity-styles-constants'
import { epicBadgeMotion } from '../../../../../achievements/constants/rarity-motion-constants'
import type { AchievementRarity } from '../../../../../achievement/types/data/achievement-data-types'

interface RarityBadgeIconProps {
  label: string
  rarity: AchievementRarity
  size?: number
}

const styleTag = `
@keyframes pulse {
  0% { box-shadow: 0 0 4px 1px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 6px 2px rgba(255, 215, 0, 0.7); }
  100% { box-shadow: 0 0 4px 1px rgba(255, 215, 0, 0.5); }
}
`

const RarityBadgeIcon: React.FC<RarityBadgeIconProps> = ({
  label,
  rarity,
  size = 20,
}) => {
  const style = rarityStyles[rarity]
  const isLegendary = rarity === 'legendary'
  const isEpic = rarity === 'epic'

  const avatar = (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.7,
        ...style,
      }}
    >
      <EmojiEvents fontSize="inherit" />
    </Avatar>
  )

  const content = isEpic ? (
    <motion.div {...epicBadgeMotion}>{avatar}</motion.div>
  ) : (
    avatar
  )

  return (
    <>
      {isLegendary && <style>{styleTag}</style>}
      <Tooltip title={label}>{content}</Tooltip>
    </>
  )
}

export default RarityBadgeIcon
