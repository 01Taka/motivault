import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import { KeyboardArrowDown, Palette } from '@mui/icons-material'
import { colorIdLabels } from '../constants/selectable-color-label-map'
import type {
  HueCategory,
  SelectableColorId,
} from '../types/selectable-color-type'

interface ColorDropdownProps {
  selectedColor:
    | { id: string; main: string; hueCategory: HueCategory }
    | undefined
  placeholder: string
  isOpen: boolean
  onToggle: () => void
  disabled: boolean
  error?: string
}

export const ColorDropdown: React.FC<ColorDropdownProps> = ({
  selectedColor,
  placeholder,
  isOpen,
  onToggle,
  disabled,
  error,
}) => (
  <Button
    fullWidth
    variant="outlined"
    onClick={onToggle}
    disabled={disabled}
    sx={{
      minHeight: 48,
      px: 2,
      py: 1.5,
      borderRadius: 2,
      borderWidth: 2,
      borderColor: error ? 'error.main' : isOpen ? 'primary.main' : 'grey.300',
      bgcolor: 'background.paper',
      color: 'text.primary',
      textTransform: 'none',
      justifyContent: 'space-between',
      '&:hover': {
        borderColor: error ? 'error.main' : 'primary.light',
        bgcolor: 'action.hover',
      },
      '&:focus': {
        borderColor: 'primary.main',
        boxShadow: (theme) => `0 0 0 4px ${theme.palette.primary.main}20`,
      },
      '&.Mui-disabled': {
        opacity: 0.5,
        bgcolor: 'action.disabledBackground',
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {selectedColor ? (
        <>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: 1,
              bgcolor: selectedColor.main,
              flexShrink: 0,
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {colorIdLabels[selectedColor.id as SelectableColorId]}
          </Typography>
        </>
      ) : (
        <>
          <Palette />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {placeholder}
          </Typography>
        </>
      )}
    </Box>
    <KeyboardArrowDown
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}
    />
  </Button>
)
