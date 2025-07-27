import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import type { TechniqueRank } from '../../../../../achievements/types/achievement-types'
import RarityBadgeIcon from './RarityBadgeIcon'
import { rankAnimations } from '../../../../../achievements/constants/rank-animations-constants'
import { rankStyles } from '../../../../../achievements/constants/rank-styles-constants'
import type { AchievementStaticInfo } from '../../../../../achievement/types/data/achievement-data-types'

interface AchievementProps {
  level: number
  experience: number
  nextLevelXp: number
  rank: TechniqueRank
  achievementsStaticInfo: AchievementStaticInfo[]
}

const Achievement: React.FC<AchievementProps> = ({
  level,
  experience,
  nextLevelXp,
  rank,
  achievementsStaticInfo,
}) => {
  const progress = Math.min((experience / nextLevelXp) * 100, 100)
  const style = rankStyles[rank]
  const animation = rankAnimations[rank]

  return (
    <Stack minHeight="100%" justifyContent="space-between">
      <Stack display="flex" flexDirection="column" alignItems="flex-end">
        <motion.div
          key={`${rank}`}
          animate={animation?.animate}
          transition={animation?.transition}
          style={{
            textShadow: style.glow ? `0 0 6px ${style.glow}` : undefined,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: style.lightColor }}
          >
            Lv. {level}
          </Typography>
        </motion.div>

        <Box width={60}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 5,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: style.barColor,
                boxShadow: style.glow ? `0 0 4px ${style.glow}` : undefined,
              },
            }}
          />
        </Box>

        <Typography variant="caption" color="text.secondary">
          残り{nextLevelXp - experience}xp
        </Typography>
      </Stack>

      <Stack direction="row" spacing={0.5} mt={0.5}>
        {achievementsStaticInfo.slice(0, 2).map((info, idx) => (
          <RarityBadgeIcon label={info.name} rarity={info.rarity} key={idx} />
        ))}
        {achievementsStaticInfo.length > 2 && (
          <Typography variant="caption">
            +{achievementsStaticInfo.length - 2}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default Achievement
