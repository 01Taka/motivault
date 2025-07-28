import '@mui/material'
import type {
  RawColors,
  ThemedColors,
} from '../nested-mode-dependent-colors-types'
import type { navigationColors } from '../../../theme/palette/navigation-colors'

declare module '@mui/material' {
  interface Palette {
    actionButtonGradient?: ThemedColors<
      typeof navigationColors.actionButtonGradient
    >
    actionButtonGradientHover?: ThemedColors<
      typeof navigationColors.actionButtonGradientHover
    >
    appBarGradient?: ThemedColors<typeof navigationColors.appBarGradient>
  }

  interface PaletteOptions {
    actionButtonGradient?: RawColors<
      typeof navigationColors.actionButtonGradient
    >
    actionButtonGradientHover?: RawColors<
      typeof navigationColors.actionButtonGradientHover
    >
    appBarGradient?: RawColors<typeof navigationColors.appBarGradient>
  }
}
