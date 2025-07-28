import '@mui/material'
import type {
  RawColors,
  ThemedColors,
} from '../nested-mode-dependent-colors-types'

declare module '@mui/material' {
  interface Palette {
    rarity?: ThemedColors<
      (typeof import('../../../theme/palette/rarity-colors').rarityColors)['rarity']
    >
  }

  interface PaletteOptions {
    rarity?: RawColors<
      (typeof import('../../../theme/palette/rarity-colors').rarityColors)['rarity']
    >
  }
}
