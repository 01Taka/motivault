import {
  createTheme,
  responsiveFontSizes,
  type PaletteMode,
} from '@mui/material'

import typography from './typography' // 分割したタイポグラフィをインポート
import breakpoints from './breakpoints' // 分割したブレイクポイントをインポート
import zIndex from './zIndex' // 分割したz-indexをインポート
import components from './components' // 分割したコンポーネントスタイルをインポート
import { createThemedPalette } from './palette/palette-color-definitions'

// アプリケーションの基本テーマを定義
const baseTheme = (mode: PaletteMode = 'light') => {
  let theme = createTheme({
    palette: createThemedPalette(mode), // 関数を呼び出してパレットを生成
    typography,
    spacing: 8, // スペーシングはシンプルなので直接ここに定義 (必要ならファイル分割も可)
    breakpoints,
    zIndex,
    components,
  })

  // レスポンシブフォントサイズを適用
  theme = responsiveFontSizes(theme)

  return theme
}

export default baseTheme
