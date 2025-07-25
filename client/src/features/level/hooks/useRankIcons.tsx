import {
  Shield,
  MilitaryTech,
  EmojiEvents,
  WorkspacePremium,
  Diamond,
  AutoAwesome,
  EmojiEmotions,
  TipsAndUpdates,
} from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import type { TechniqueRank } from '../types/data/level-rank-types'

const useRankIcons = () => {
  const getRankIcon = (rank: TechniqueRank, sx?: SxProps) => {
    switch (rank) {
      case 'iron':
        return <Shield sx={sx} />
      case 'bronze':
        return <MilitaryTech sx={sx} />
      case 'silver':
        return <EmojiEvents sx={sx} />
      case 'gold':
        return <WorkspacePremium sx={sx} />
      case 'platinum':
        return <Diamond sx={sx} />
      case 'diamond':
        return <AutoAwesome sx={sx} />
      case 'master':
        return <EmojiEmotions sx={sx} />
      case 'sage':
        return <TipsAndUpdates sx={sx} />
      default:
        return null // Exhaustiveness fallback
    }
  }

  return { getRankIcon }
}
export default useRankIcons
