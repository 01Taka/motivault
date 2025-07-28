import '@mui/material'
import type {
  RawColors,
  ThemedColors,
} from '../nested-mode-dependent-colors-types'

declare module '@mui/material' {
  interface Palette {
    border?: ThemedColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['border']
    >
    highlightColor?: ThemedColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['highlightColor']
    >
    energy?: ThemedColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['energy']
    >
    accent?: ThemedColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['accent']
    >
  }

  interface PaletteOptions {
    border?: RawColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['border']
    >
    highlightColor?: RawColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['highlightColor']
    >
    energy?: RawColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['energy']
    >
    accent?: RawColors<
      (typeof import('../../../theme/palette/util-colors').utilColors)['accent']
    >
  }
}
