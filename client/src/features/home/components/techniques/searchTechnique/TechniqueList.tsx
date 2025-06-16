import React from 'react'
import { Container, Grid2 } from '@mui/material'
import TechniqueCard from './TechniqueCard'

interface Technique {
  id: string
  title: string
  description: string
  category: string
}

interface TechniqueListProps {
  techniques: Technique[]
  onClickTechnique: (id: string) => void
}

const TechniqueList: React.FC<TechniqueListProps> = ({
  techniques,
  onClickTechnique,
}) => (
  <Container sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
    <Grid2 container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: 8 }}>
      {techniques.map((t) => (
        <Grid2 key={t.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <TechniqueCard {...t} onClick={() => onClickTechnique?.(t.id)} />
        </Grid2>
      ))}
    </Grid2>
  </Container>
)

export default TechniqueList
