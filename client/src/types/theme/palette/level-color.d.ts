import '@mui/material'
import type {
  RawColors,
  ThemedColors,
} from '../nested-mode-dependent-colors-types'

declare module '@mui/material' {
  interface Palette {
    level?: ThemedColors<
      (typeof import('../../../theme/palette/level-colors').levelColors)['level']
    >
  }

  interface PaletteOptions {
    level?: RawColors<
      (typeof import('../../../theme/palette/level-colors').levelColors)['level']
    >
  }
}
