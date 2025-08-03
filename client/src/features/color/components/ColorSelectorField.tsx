import React, { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  FormHelperText,
  Collapse,
} from '@mui/material'
import { selectableColorTemplate } from '../constants/selectable-color-map'
import { getColorsByCategory } from '../functions/selectable-color-utils'
import type {
  HueCategory,
  SelectableColorId,
} from '../types/selectable-color-type'
import { ColorDropdown } from './ColorDropdown'
import { ColorOption } from './ColorOption'

interface ColorSelectorFieldProps {
  value?: string
  onChange: (colorId: string) => void
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  sx?: object
}

const ColorSelectorField: React.FC<ColorSelectorFieldProps> = ({
  value,
  onChange,
  label,
  placeholder = 'カラーを選択',
  error,
  disabled = false,
  required = false,
  sx = {},
}) => {
  const selectedColor = selectableColorTemplate[value as SelectableColorId]

  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    selectedColor?.hueCategory ?? null
  )

  useEffect(() => {
    if (!isOpen) {
      setSelectedCategory(selectedColor?.hueCategory ?? null)
    }
  }, [isOpen])

  const colorsByCategory = getColorsByCategory(
    Object.values(selectableColorTemplate)
  )
  const categories = Object.keys(colorsByCategory) as HueCategory[]

  const handleColorSelect = (colorId: string) => {
    onChange(colorId)
    setIsOpen(false)
    setSelectedCategory(null)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  return (
    <FormControl
      fullWidth
      error={!!error}
      disabled={disabled}
      sx={{ position: 'relative', ...sx }}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{
            mb: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {label}
        </FormLabel>
      )}

      <ColorDropdown
        selectedColor={selectedColor}
        placeholder={placeholder}
        isOpen={isOpen}
        onToggle={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        error={error}
      />

      {error && (
        <FormHelperText
          sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <span>⚠</span>
          {error}
        </FormHelperText>
      )}

      <Collapse in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1300,
            bgcolor: 'white',
            borderRadius: 2,
            overflowY: 'auto',
            maxHeight: 320,
          }}
        >
          {categories.map((category, index) => (
            <ColorOption
              key={category}
              category={category}
              isOpen={isOpen && selectedCategory === category}
              toggleCategory={toggleCategory}
              colors={colorsByCategory[category]}
              handleColorSelect={handleColorSelect}
              selectedColor={selectedColor}
              index={index}
            />
          ))}
        </Box>
      </Collapse>
    </FormControl>
  )
}

export default ColorSelectorField
