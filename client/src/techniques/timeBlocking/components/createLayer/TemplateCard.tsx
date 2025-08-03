import { Box } from '@mui/material'
import React from 'react'

interface TemplateCardProps {}

const TemplateCard: React.FC<TemplateCardProps> = ({}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 60,
        borderRadius: 2,
        bgcolor: 'rebeccapurple',
        border: 'red',
      }}
    >
      44
    </Box>
  )
}

export default TemplateCard
