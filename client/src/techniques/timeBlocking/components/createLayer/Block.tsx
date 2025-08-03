import React, { type ReactNode } from 'react'
import { Box, type SxProps } from '@mui/material'

interface BlockProps {
  connectTop: boolean
  connectBottom: boolean
  color: string
  borderColor: string
  separateMargin: string | number
  height: string | number
  sx?: SxProps
  children?: ReactNode
  onClick?: () => void
}

const Block: React.FC<BlockProps> = ({
  connectTop,
  connectBottom,
  color,
  borderColor,
  separateMargin,
  height,
  sx,
  children,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor: color,
        borderLeft: `2px solid ${borderColor}`,
        borderRight: `2px solid ${borderColor}`,
        borderTop: connectTop ? 'none' : `2px solid ${borderColor}`,
        borderBottom: connectBottom ? 'none' : `2px solid ${borderColor}`,
        borderTopLeftRadius: connectTop ? 0 : 8,
        borderTopRightRadius: connectTop ? 0 : 8,
        marginTop: connectTop ? 0 : separateMargin,
        borderBottomLeftRadius: connectBottom ? 0 : 8,
        borderBottomRightRadius: connectBottom ? 0 : 8,
        marginBottom: connectBottom ? 0 : separateMargin,
        height,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Block
