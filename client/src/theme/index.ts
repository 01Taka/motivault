// src/theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { type PaletteMode } from '@mui/material' // 'light' または 'dark' モードの型定義

// アプリケーション全体で使うフォントの指定
// Noto Sans JP を優先し、日本語表示を考慮
const APP_FONT_FAMILY = [
  'Noto Sans JP',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')

// アプリケーションの基本テーマを定義
// mode は 'light' または 'dark' を受け取ります。必要に応じて引数として渡すこともできます。
const baseTheme = (mode: PaletteMode = 'light') => {
  let theme = createTheme({
    // 1. パレット (色)
    palette: {
      mode, // 'light' または 'dark' モードを適用
      // プライマリカラー: アプリの主要なブランドカラー
      primary: {
        main: mode === 'light' ? '#4CAF50' : '#81C784', // 緑系 (Light: Green 500, Dark: Green 300)
        light: mode === 'light' ? '#80E27E' : '#A5D6A7',
        dark: mode === 'light' ? '#087F23' : '#519657',
        contrastText: '#FFFFFF', // プライマリカラー上のテキスト色
      },
      // セカンダリカラー: 補助的なアクションや対照色
      secondary: {
        main: mode === 'light' ? '#FFC107' : '#FFD54F', // 黄色系 (Light: Amber 500, Dark: Amber 300)
        light: mode === 'light' ? '#FFF350' : '#FFEE58',
        dark: mode === 'light' ? '#C79100' : '#FFB300',
        contrastText: '#000000',
      },
      // エラー、警告、情報、成功の色
      error: {
        main: '#F44336', // Red 500
      },
      warning: {
        main: '#FF9800', // Orange 500
      },
      info: {
        main: '#2196F3', // Blue 500
      },
      success: {
        main: '#4CAF50', // Green 500 (Primaryと同じだが、明示的に定義)
      },
      // テキストと背景の色
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#FFFFFF',
        secondary:
          mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        disabled:
          mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
      },
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#121212', // デフォルトの背景色
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E', // カードやダイアログの背景色
      },
      divider:
        mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    },

    // 2. タイポグラフィ (フォント)
    typography: {
      fontFamily: APP_FONT_FAMILY,
      // 見出し (h1-h6) のデフォルトスタイル
      h1: { fontSize: '6rem', fontWeight: 300 },
      h2: { fontSize: '3.75rem', fontWeight: 300 },
      h3: { fontSize: '3rem', fontWeight: 400 },
      h4: { fontSize: '2.125rem', fontWeight: 400 },
      h5: { fontSize: '1.5rem', fontWeight: 400 },
      h6: { fontSize: '1.25rem', fontWeight: 500 }, // AppBarなどでよく使われる
      // 本文
      body1: { fontSize: '1rem', lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', lineHeight: 1.43 },
      // その他
      button: { fontSize: '0.875rem', textTransform: 'none' }, // ボタンのテキスト大文字化を解除
      caption: { fontSize: '0.75rem' },
      overline: { fontSize: '0.75rem', textTransform: 'uppercase' },
    },

    // 3. スペーシング (余白の基準単位)
    spacing: 8, // デフォルトは8px。spacing(1) = 8px, spacing(2) = 16px など

    // 4. ブレイクポイント (レスポンシブデザインの閾値)
    breakpoints: {
      values: {
        xs: 0, // Extra small devices (portrait phones)
        sm: 600, // Small devices (landscape phones)
        md: 900, // Medium devices (tablets) - MUIのデフォルトは960だが、900に調整
        lg: 1200, // Large devices (desktops)
        xl: 1536, // Extra large devices (large desktops)
      },
    },

    // 5. z-index (要素の重なり順)
    zIndex: {
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },

    // 6. コンポーネントのデフォルトスタイル上書き
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true, // デフォルトでボタンの影を無効化 (Flatデザイン志向)
        },
        styleOverrides: {
          root: {
            borderRadius: 8, // 全てのボタンの角を少し丸くする
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            // AppBarのデフォルトの高さを調整したい場合など
            // height: 64,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // カードやダイアログの影の強さや角の丸みを調整したい場合
            borderRadius: 8,
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          // コンポーネントによってはフォントウェイトを軽くする
          // variantMapping: {
          //   h1: 'h2',
          //   h2: 'h3',
          //   h3: 'h4',
          //   h4: 'h5',
          //   h5: 'h6',
          //   h6: 'h6',
          // },
        },
      },
      // MUIコンポーネントのデフォルトスタイルを調整する
      // MuiIconButton, MuiTextField, MuiCard など...
    },
  })

  // レスポンシブフォントサイズを適用 (viewport widthに基づいてフォントサイズを自動調整)
  theme = responsiveFontSizes(theme)

  return theme
}

export default baseTheme
