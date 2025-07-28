import { Typography } from '@mui/material'
import React from 'react'

interface AchievementDescriptionProps {
  description: string | undefined
  glow: string | undefined
}

const AchievementDescription: React.FC<AchievementDescriptionProps> = ({
  description,
  glow,
}) => {
  return (
    <Typography
      variant="body2"
      color="text.primary"
      sx={{ mt: 2, textShadow: `0px 4px 4px ${glow}` }}
    >
      {description}
    </Typography>
  )
}

export default AchievementDescription
