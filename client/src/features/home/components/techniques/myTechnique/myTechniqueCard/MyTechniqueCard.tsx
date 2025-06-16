import React from 'react'
import { Card, CardActionArea, CardContent, Stack } from '@mui/material'
import MyTechniqueCardContents from './MyTechniqueCardContents'
import Achievement from './Achievement'
import type {
  TechniqueAchievementBadge,
  TechniqueRank,
} from '../../../../../achievements/types/achievement-types'
import { rankStyles } from '../../../../../achievements/constants/rank-styles-constants'

interface MyTechniqueCardProps {
  officialName: string
  title: string
  category: string
  level: number
  experience: number // current XP
  nextLevelXp: number // XP needed for next level
  rank: TechniqueRank
  badges: TechniqueAchievementBadge[] // list of achievement names
  onClick: () => void
}

const MyTechniqueCard: React.FC<MyTechniqueCardProps> = ({
  officialName,
  title,
  category,
  level,
  experience,
  nextLevelXp,
  rank,
  badges,
  onClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        ...rankStyles[rank],
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: 'scale(1.015)',
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" height="100%">
            <MyTechniqueCardContents
              officialName={officialName}
              title={title}
              category={category}
              iconColor={rankStyles[rank]?.color ?? 'gray'}
            />
            <Achievement
              level={level}
              experience={experience}
              nextLevelXp={nextLevelXp}
              badges={badges}
              rank={rank}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MyTechniqueCard
