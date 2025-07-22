import React from 'react'
import { Checkbox, type SxProps } from '@mui/material'

interface AnimatedCheckboxProps {
  color: string
  sx?: SxProps
  checked?: boolean
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  name?: string
  size?: 'medium' | 'large' | 'small'
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  color,
  sx = {},
  ...props
}) => {
  return (
    <Checkbox
      sx={{
        color: color,
        p: 1,
        borderColor: `${color}80`,
        borderRadius: '6px',
        // Increased transition duration for a more noticeable animation
        transition: 'all 0.3s cubic-bezier(.17,.67,.83,.67)', // A slightly bouncier easing
        transformOrigin: 'center',
        '&.Mui-checked': {
          color: color,
          backgroundColor: `${color}20`,
          // Key change: Use a transform for scale and then slightly less scale to "settle"
          transform: 'scale(1.15)', // Scales up initially
          transition: 'all 0.2s cubic-bezier(.17,.67,.83,.67)', // Faster transition for the initial scale up
        },
        '&.Mui-checked > .MuiIconButton-label > .MuiSvgIcon-root': {
          // You might need to target the icon itself for the "settling" animation
          // This will make the icon itself scale down slightly after the initial scale up of the whole checkbox
          transform: 'scale(0.9)', // Scales down slightly after the initial scale up
          transition: 'transform 0.2s ease-out 0.2s', // Delayed transition for the scale down
        },
        '&:not(.Mui-checked)': {
          transform: 'scale(1)', // Ensures it scales back to normal when unchecked
          transition: 'all 0.2s ease-out', // Smooth transition back to normal
        },
        '&:hover': {
          backgroundColor: `${color}10`,
        },
        ...sx,
      }}
      {...props}
    />
  )
}

export default AnimatedCheckbox
