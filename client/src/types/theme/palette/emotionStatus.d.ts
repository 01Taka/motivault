import '@mui/material'
import type {
  RawColors,
  ThemedColors,
} from '../nested-mode-dependent-colors-types'

declare module '@mui/material' {
  interface Palette {
    emotionStatus?: ThemedColors<
      (typeof import('../../../theme/palette/emotion-colors').emotionStatusColors)['emotionStatus']
    >
  }

  interface PaletteOptions {
    emotionStatus?: RawColors<
      (typeof import('../../../theme/palette/emotion-colors').emotionStatusColors)['emotionStatus']
    >
  }
}
