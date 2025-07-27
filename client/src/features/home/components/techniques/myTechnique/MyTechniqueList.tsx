import React from 'react'
import { Container, Grid2 } from '@mui/material'
import MyTechniqueCard from './myTechniqueCard/MyTechniqueCard'
import type { FullTechniqueData } from '../../../../technique/types/technique-types'

interface MyTechniqueListProps {
  techniques: FullTechniqueData[]
  onClickMyTechnique: (technique: FullTechniqueData) => void
}

const MyTechniqueList: React.FC<MyTechniqueListProps> = ({
  techniques,
  onClickMyTechnique,
}) => (
  <Container sx={{ py: 4, height: '100%', overflowY: 'auto' }}>
    <Grid2 container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: 8 }}>
      {techniques.map((technique) => {
        return (
          <Grid2 key={technique.docId} size={{ xs: 12, sm: 6, md: 4 }}>
            <MyTechniqueCard
              technique={technique}
              onClick={() => onClickMyTechnique?.(technique)}
            />
          </Grid2>
        )
      })}
    </Grid2>
  </Container>
)

export default MyTechniqueList
