import { Box, Typography } from '@mui/material'
import React from 'react'

interface TechniqueHeaderProps {
  title: string
  category: string
  imageUrl: string
}

const TechniqueHeader: React.FC<TechniqueHeaderProps> = ({
  title,
  category,
  imageUrl,
}) => (
  <Box>
    <Typography variant="overline" color="primary" fontWeight="bold">
      #{category}
    </Typography>
    <Typography variant="h5" component="h2" fontWeight="bold" mt={1}>
      {title}
    </Typography>
    <Box
      component="img"
      src={imageUrl}
      alt={title}
      sx={{
        maxWidth: 400,
        maxHeight: 200,
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  </Box>
)

export default TechniqueHeader
