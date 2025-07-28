import { useTheme, Box } from '@mui/material'
import { getRarityColor } from '../../../../functions/theme/rarity-color-utils'
import type { AchievementStaticInfo } from '../../types/data/achievement-data-types'
import AchievementBadge from './AchievementBadge'
import AchievementDescription from './AchievementDescription'
import AchievementTitle from './AchievementTitle'

interface AchievementDetailProps {
  achievement: AchievementStaticInfo
}

const AchievementDetail: React.FC<AchievementDetailProps> = ({
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
        p: 3,
        m: 'auto',
        maxWidth: 400,
        color: rarityColor?.contrastText,
      }}
    >
      <AchievementTitle name={achievement?.name} glow={rarityColor?.glow} />
      <AchievementBadge
        badgeImageUrl={achievement?.badgeImageUrl}
        name={achievement?.name}
        rarityColor={rarityColor}
      />
      <AchievementDescription
        description={achievement?.unlockConditionsExplanation}
        glow={rarityColor?.glow}
      />
    </Box>
  )
}

export default AchievementDetail
