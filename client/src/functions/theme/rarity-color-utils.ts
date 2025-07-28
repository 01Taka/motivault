import type { Palette } from '@mui/material'
import type { AchievementRarity } from '../../features/achievement/types/data/achievement-data-types'

export const getRarityColor = (rarity: AchievementRarity, palette: Palette) => {
  switch (rarity) {
    case 'common':
      return palette.rarity?.common
    case 'uncommon':
      return palette.rarity?.uncommon
    case 'rare':
      return palette.rarity?.rare
    case 'epic':
      return palette.rarity?.epic
    case 'legendary':
      return palette.rarity?.legendary
  }
}
