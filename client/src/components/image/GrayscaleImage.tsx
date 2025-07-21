import React from 'react'
import { Box } from '@mui/material'

interface GrayscaleImageProps {
  src: string
  alt?: string
  grayscale?: number // 0～1
  width?: number | string
  height?: number | string
  borderRadius?: number | string
  hoverEffect?: boolean
  style?: React.CSSProperties
}

export const GrayscaleImage: React.FC<GrayscaleImageProps> = ({
  src,
  alt = '',
  grayscale = 1,
  width = '100%',
  height = 'auto',
  borderRadius = 8,
  hoverEffect = false,
  style = {},
}) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width,
        height,
        borderRadius,
        transition: 'filter 0.3s ease',
        filter: `grayscale(${grayscale})`,
        ...(hoverEffect && {
          '&:hover': {
            filter: 'grayscale(0)',
          },
        }),
        ...style,
      }}
    />
  )
}
