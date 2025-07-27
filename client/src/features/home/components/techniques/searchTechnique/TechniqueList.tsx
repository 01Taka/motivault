import React from 'react'
import { Container, Grid2 } from '@mui/material'
import TechniqueCard from './TechniqueCard'
import type { TechniqueStaticInfo } from '../../../../technique/types/data/technique-static-info-types'

interface TechniqueListProps {
  techniques: TechniqueStaticInfo[]
  onClickTechnique: (technique: TechniqueStaticInfo) => void
}

const TechniqueList: React.FC<TechniqueListProps> = ({
  techniques,
  onClickTechnique,
}) => (
  <Container sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
    <Grid2 container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: 8 }}>
      {techniques.map((technique) => (
        <Grid2 key={technique.docId} size={{ xs: 12, sm: 6, md: 4 }}>
          <TechniqueCard
            title={technique.title}
            description={technique.slogan}
            tags={technique.tags}
            onClick={() => onClickTechnique?.(technique)}
          />
        </Grid2>
      ))}
    </Grid2>
  </Container>
)

export default TechniqueList
