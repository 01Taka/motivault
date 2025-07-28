import type { Palette } from '@mui/material'

export const getLevelColor = (level: number, palette: Palette) => {
  switch (level) {
    case 1:
      return palette.level?.lv1
    case 2:
      return palette.level?.lv2
    case 3:
      return palette.level?.lv3
    case 4:
      return palette.level?.lv4
    case 5:
      return palette.level?.lv5
    default:
      return palette.level?.default
  }
}
