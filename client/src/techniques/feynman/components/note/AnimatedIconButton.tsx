import { IconButton, Typography, Box } from '@mui/material'
import { useState } from 'react'

interface AnimatedIconButtonProps {
  label: string
  onClick: () => void
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  icon: React.ReactNode
  sx?: object
}

const AnimatedIconButton: React.FC<AnimatedIconButtonProps> = ({
  label,
  onClick,
  color = 'default',
  icon,
  sx,
}) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    onClick()
    setTimeout(() => setClicked(false), 150)
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transform: clicked ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.15s ease-in-out',
        ...sx,
      }}
    >
      <IconButton size="small">{icon}</IconButton>
      <Typography variant="caption" color={color} sx={{ mt: -0.5 }}>
        {label}
      </Typography>
    </Box>
  )
}

export default AnimatedIconButton
