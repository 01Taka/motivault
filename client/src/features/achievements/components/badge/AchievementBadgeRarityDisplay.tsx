import { Stack, Typography, Tooltip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { yellow, grey } from '@mui/material/colors'
import React from 'react'
import { rarityNumber } from '../../constants/badge-rarity-constants'
import { badgeStyleMap } from '../../constants/badge-style'
import type { AchievementBadgeRarity } from '../../types/achievement-types'

interface RarityDisplayProps {
  rarity: AchievementBadgeRarity
  isUnlocked: boolean
}

const MAX_RARITY = 5

export const AchievementBadgeRarityDisplay: React.FC<RarityDisplayProps> = ({
  rarity,
  isUnlocked,
}) => {
  const styles = badgeStyleMap[rarity]

  return (
    <>
      <Typography
        variant="subtitle1"
        color={isUnlocked ? styles.color : 'text.disabled'}
      >
        {isUnlocked ? rarity.toUpperCase() : '???'}
      </Typography>

      {isUnlocked ? (
        <Stack direction="row" spacing={0.5}>
          {Array.from({ length: MAX_RARITY }).map((_, i) => (
            <Tooltip key={i} title={`${i + 1} / ${MAX_RARITY}`}>
              <StarIcon
                fontSize="medium"
                sx={{
                  color: i < rarityNumber[rarity] ? yellow[700] : grey[200],
                }}
              />
            </Tooltip>
          ))}
        </Stack>
      ) : (
        <div style={{ height: 24 }} />
      )}
    </>
  )
}
