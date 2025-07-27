import React from 'react'
import { Card, CardActionArea, CardContent, Stack } from '@mui/material'
import MyTechniqueCardContents from './MyTechniqueCardContents'
import Achievement from './Achievement'
import { rankStyles } from '../../../../../achievements/constants/rank-styles-constants'
import type { FullTechniqueData } from '../../../../../technique/types/technique-types'

interface MyTechniqueCardProps {
  technique: FullTechniqueData
  onClick: () => void
}

const MyTechniqueCard: React.FC<MyTechniqueCardProps> = ({
  technique,
  onClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        ...rankStyles[technique.rank],
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
              officialName={technique.officialName}
              title={technique.title}
              tags={technique.tags}
              iconColor={rankStyles[technique.rank]?.color ?? 'gray'}
            />
            <Achievement
              level={technique.currentLevel}
              experience={technique.currentLevelXp}
              nextLevelXp={technique.nextLevelXp}
              achievementsStaticInfo={technique.unlockedAchievementsStaticInfo}
              rank={technique.rank}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MyTechniqueCard
