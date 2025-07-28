import type { PaletteMode } from '@mui/material'
import { applyModeToColors } from '../../functions/theme/apply-mode-to-colors'
import { baseColors } from './base-colors'
import { levelColors } from './level-colors'
import { navigationColors } from './navigation-colors'
import { emotionStatusColors } from './emotion-colors'
import { utilColors } from './util-colors'
import { rankColors } from './rank-colors'

const paletteColorDefinitions = {
  ...baseColors,
  ...utilColors,
  ...navigationColors,
  ...levelColors,
  ...rankColors,
  ...emotionStatusColors,
}

/**
 * アプリケーションのすべてのカラーパレットを生成します。
 */
export const createThemedPalette = (mode: PaletteMode) => {
  // MUI標準のパレット色を変換
  const themedPalette = applyModeToColors(paletteColorDefinitions, mode)

  return {
    mode,
    ...themedPalette,
  }
}
