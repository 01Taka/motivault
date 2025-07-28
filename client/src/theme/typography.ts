import type { TypographyOptions } from '@mui/material/styles/createTypography'

// アプリケーション全体で使うフォントの指定
const APP_FONT_FAMILY = [
  'Noto Sans JP',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')

// TypographyOptions の型をインポート

// タイポグラフィの設定を定義
const typography: TypographyOptions = {
  // ここで明示的に型を指定
  fontFamily: APP_FONT_FAMILY,
  h1: { fontSize: '6rem', fontWeight: 300 },
  h2: { fontSize: '3.75rem', fontWeight: 300 },
  h3: { fontSize: '3rem', fontWeight: 400 },
  h4: { fontSize: '2.125rem', fontWeight: 400 },
  h5: { fontSize: '1.5rem', fontWeight: 400 },
  h6: { fontSize: '1.25rem', fontWeight: 500 },
  body1: { fontSize: '1rem', lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', lineHeight: 1.43 },
  button: {
    fontSize: '0.875rem',
    textTransform: 'none', // ここで型キャスト
  },
  caption: { fontSize: '0.75rem' },
  overline: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
  }, // overlineも念のため
}

export default typography
