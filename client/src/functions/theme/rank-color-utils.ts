import type { Palette } from '@mui/material'
import type { TechniqueRank } from '../../features/level/types/data/level-rank-types'

export const getRankColor = (rank: TechniqueRank, palette: Palette) => {
  switch (rank) {
    case 'iron':
      return palette.rank?.iron
    case 'bronze':
      return palette.rank?.bronze
    case 'silver':
      return palette.rank?.silver
    case 'gold':
      return palette.rank?.gold
    case 'platinum':
      return palette.rank?.platinum
    case 'diamond':
      return palette.rank?.diamond
    case 'master':
      return palette.rank?.master
    case 'sage':
      return palette.rank?.sage
  }
}
