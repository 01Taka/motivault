import '@mui/material'
import type {
  RawColors,
  ThemedColors,
} from '../nested-mode-dependent-colors-types'

declare module '@mui/material' {
  interface Palette {
    rank?: ThemedColors<
      (typeof import('../../../theme/palette/rank-colors').rankColors)['rank']
    >
  }

  interface PaletteOptions {
    rank?: RawColors<
      (typeof import('../../../theme/palette/rank-colors').rankColors)['rank']
    >
  }
}
