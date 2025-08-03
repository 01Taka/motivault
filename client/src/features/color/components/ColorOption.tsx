import React from 'react'
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Typography,
  Collapse,
  Stack,
} from '@mui/material'
import { Check, KeyboardArrowDown } from '@mui/icons-material'
import { hueCategoryLabels } from '../constants/selectable-color-label-map'
import type { HueCategory } from '../types/selectable-color-type'

interface ColorOptionProps {
  category: HueCategory
  isOpen: boolean
  toggleCategory: (category: HueCategory) => void
  colors: { id: string; main: string }[]
  handleColorSelect: (colorId: string) => void
  selectedColor:
    | { id: string; main: string; hueCategory: HueCategory }
    | undefined
  index: number
}

export const ColorOption: React.FC<ColorOptionProps> = ({
  category,
  isOpen,
  toggleCategory,
  colors,
  handleColorSelect,
  selectedColor,
  index,
}) => (
  <Box>
    {/* カテゴリヘッダー */}
    <Button
      fullWidth
      onClick={() => toggleCategory(category)}
      sx={{
        px: 2,
        py: 1.5,
        justifyContent: 'space-between',
        borderRadius: 0,
        textTransform: 'none',
        fontWeight: 500,
        color: 'text.primary',
        borderBottom: index < colors.length - 1 ? '1px solid' : 'none',
        borderColor: 'divider',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: 1,
            bgcolor: colors[0]?.main,
            flexShrink: 0,
          }}
        />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {hueCategoryLabels[category]}
        </Typography>
      </Stack>
      <KeyboardArrowDown
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }}
      />
    </Button>

    {/* 色選択肢 */}
    <Collapse in={isOpen}>
      <Box sx={{ p: 1.5 }}>
        <Grid2 container spacing={1}>
          {colors.map((color) => (
            <Grid2 sx={{ width: '30%' }} key={color.id}>
              <IconButton
                onClick={() => handleColorSelect(color.id)}
                sx={{
                  width: '100%',
                  height: 48,
                  borderRadius: 1.5,
                  bgcolor: color.main,
                  border:
                    selectedColor?.id === color.id
                      ? '2px solid'
                      : '2px solid transparent',
                  borderColor:
                    selectedColor?.id === color.id
                      ? 'text.primary'
                      : 'transparent',
                  boxShadow: selectedColor?.id === color.id ? 2 : 0,
                  transform: 'scale(1)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 2,
                    bgcolor: color.main,
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                {selectedColor?.id === color.id && (
                  <Check
                    style={{
                      color: 'white',
                      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))',
                    }}
                  />
                )}
              </IconButton>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Collapse>
  </Box>
)
