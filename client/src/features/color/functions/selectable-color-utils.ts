import { selectableColorTemplate } from '../constants/selectable-color-map'
import type {
  FullSelectableColor,
  HueCategory,
  SelectableColor,
  SelectableColorId,
} from '../types/selectable-color-type'

// 色の明度を計算してコントラストの良いtext色を決定
export const getTextColor = (
  hexColor: string
): { light: string; dark: string } => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // 相対輝度を計算
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // ライトモード: mainが暗い場合は白、明るい場合は黒
  // ダークモード: mainが暗い場合は白、明るい場合は白（ダークモードでは基本白文字）
  return {
    light: luminance > 0.5 ? '#000000' : '#FFFFFF',
    dark: '#FFFFFF',
  }
}

// mainの色から背景色を生成（薄い色調）
export const getBackgroundColor = (
  hexColor: string
): { light: string; dark: string } => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // ライトモード: mainの色を薄くして背景色に
  const lightR = Math.min(255, r + (255 - r) * 0.85)
  const lightG = Math.min(255, g + (255 - g) * 0.85)
  const lightB = Math.min(255, b + (255 - b) * 0.85)

  // ダークモード: mainの色を暗くして背景色に
  const darkR = Math.max(0, r * 0.2)
  const darkG = Math.max(0, g * 0.2)
  const darkB = Math.max(0, b * 0.2)

  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0')

  return {
    light: `#${toHex(lightR)}${toHex(lightG)}${toHex(lightB)}`,
    dark: `#${toHex(darkR)}${toHex(darkG)}${toHex(darkB)}`,
  }
}

export const getReverseHueMap = (
  colors: SelectableColor[]
): Record<string, HueCategory> => {
  return colors.reduce(
    (acc, color) => {
      acc[color.id] = color.hueCategory
      return acc
    },
    {} as Record<string, HueCategory>
  )
}

export const getColorsByCategory = (
  colors: SelectableColor[]
): Record<HueCategory, SelectableColor[]> => {
  return colors.reduce(
    (acc, color) => {
      if (!acc[color.hueCategory]) {
        acc[color.hueCategory] = []
      }
      acc[color.hueCategory].push(color)
      return acc
    },
    {} as Record<HueCategory, SelectableColor[]>
  )
}

export const complementSelectableColor = (
  colors: SelectableColor[],
  theme: 'light' | 'dark'
): FullSelectableColor[] => {
  return colors.map((color) => ({
    ...color,
    text: theme === 'light' ? '#000000' : '#ffffff',
    background: getBackgroundColor(color.main)[theme],
  }))
}

export const getSelectableColorById = (
  id: SelectableColorId,
  theme: 'light' | 'dark' = 'light',
  defaultColorId: SelectableColorId = 'charcoal-gray'
) => {
  const template =
    selectableColorTemplate[id] ?? selectableColorTemplate[defaultColorId]
  return {
    ...template,
    text: theme === 'light' ? '#000000' : '#ffffff',
    background: getBackgroundColor(template.main)[theme],
  }
}
