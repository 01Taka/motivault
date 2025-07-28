export const emotionStatusColors = {
  emotionStatus: {
    good: {
      main: { light: '#4CAF50', dark: '#66BB6A' }, // 緑系 (Good/Success)
      light: { light: '#81C784', dark: '#A5D6A7' },
      dark: { light: '#2E7D32', dark: '#388E3C' },
      contrastText: { light: '#FFFFFF', dark: '#FFFFFF' },
    },
    bad: {
      main: { light: '#0a0a0aff', dark: '#EF5350' }, // 赤系 (Bad/Error)
      light: { light: '#E57373', dark: '#E57373' },
      dark: { light: '#C62828', dark: '#D32F2F' },
      contrastText: { light: '#FFFFFF', dark: '#FFFFFF' },
    },
    positive: {
      main: { light: '#8A96F2', dark: '#7B88E5' }, // 青紫色系 (Positive/Info)
      light: { light: '#A7B0F7', dark: '#99A4ED' },
      dark: { light: '#6F7CDA', dark: '#5F6CD2' },
      contrastText: { light: '#FFFFFF', dark: '#FFFFFF' },
    },
    negative: {
      main: { light: '#FF9800', dark: '#FFA726' }, // オレンジ系 (Negative/Warning)
      light: { light: '#FFB74D', dark: '#FFCC80' },
      dark: { light: '#E65100', dark: '#FB8C00' },
      contrastText: { light: '#000000', dark: '#000000' },
    },
    neutral: {
      // 新しく追加する中間色
      main: { light: '#B0BEC5', dark: '#78909C' }, // 青灰色系 (Neutral)
      light: { light: '#CFD8DC', dark: '#90A4AE' },
      dark: { light: '#78909C', dark: '#546E7A' },
      contrastText: { light: '#000000', dark: '#FFFFFF' },
    },
  },
}
