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
  // Overlay
  overlayColor?: string // rgba or hex with alpha
  overlayContent?: React.ReactNode
  overlayClickable?: boolean
  overlayBlend?: React.CSSProperties['mixBlendMode']
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
  overlayColor,
  overlayContent,
  overlayClickable = false,
  overlayBlend,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 画像本体 */}
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'filter 0.3s ease',
          filter: `grayscale(${grayscale})`,
          ...(hoverEffect && {
            '&:hover': {
              filter: 'grayscale(0)',
            },
          }),
        }}
      />

      {/* オーバーレイ */}
      {overlayColor && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: overlayColor,
            mixBlendMode: overlayBlend,
            pointerEvents: overlayClickable ? 'auto' : 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* オーバーレイ上のコンテンツ */}
      {overlayContent && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: overlayClickable ? 'auto' : 'none',
          }}
        >
          {overlayContent}
        </Box>
      )}
    </Box>
  )
}
