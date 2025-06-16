import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Box,
} from '@mui/material'
import { Lightbulb } from '@mui/icons-material'

interface TechniqueCardProps {
  title: string
  description: string
  category: string
  onClick: () => void
}

const TechniqueCard: React.FC<TechniqueCardProps> = ({
  title,
  description,
  category,
  onClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            <Lightbulb color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" fontWeight="bold">
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {description}
          </Typography>
          <Chip
            label={category}
            color="secondary"
            size="small"
            sx={{ mt: 1 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TechniqueCard
