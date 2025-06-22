import React from 'react'
import { Container, Grid2 } from '@mui/material'
import MyTechniqueCard from './myTechniqueCard/MyTechniqueCard'
import type { Technique } from '../../../types/technique-types'
import type {
  TechniqueAchievementBadge,
  TechniqueLevelInfo,
} from '../../../../achievements/types/achievement-types'

interface MyTechniqueListProps {
  techniques: Technique[]
  levelInfo: Record<string, TechniqueLevelInfo>
  badges: Record<string, TechniqueAchievementBadge[]>
  onClickMyTechnique: (id: string) => void
}

const MyTechniqueList: React.FC<MyTechniqueListProps> = ({
  techniques,
  levelInfo,
  badges,
  onClickMyTechnique,
}) => (
  <Container sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
    <Grid2 container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: 8 }}>
      {techniques.map((t) => {
        const {
          currentLevel = 0,
          currentLevelXp = 0,
          nextLevelXp = 0,
          rank = 'iron',
        } = levelInfo[t.id] ?? {}

        return (
          <Grid2 key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <MyTechniqueCard
              level={currentLevel}
              experience={currentLevelXp}
              nextLevelXp={nextLevelXp}
              rank={rank}
              badges={badges[t.id] ?? []}
              {...t}
              onClick={() => onClickMyTechnique?.(t.path)}
            />
          </Grid2>
        )
      })}
    </Grid2>
  </Container>
)

export default MyTechniqueList
