import { Typography } from '@mui/material'
import React from 'react'

interface AchievementTitleProps {
  name: string | undefined
  glow: string | undefined
  fontSize?: string
}

const AchievementTitle: React.FC<AchievementTitleProps> = ({
  name,
  glow,
  fontSize = '1.25rem',
}) => {
  return (
    <Typography
      variant="h5"
      component="h3"
      sx={{
        mb: 2,
        textShadow: `0px 4px 4px ${glow}`,
        fontSize: fontSize,
        textAlign: 'center',
      }}
    >
      {name}
    </Typography>
  )
}

export default AchievementTitle
