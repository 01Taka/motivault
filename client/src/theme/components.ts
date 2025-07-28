// src/theme/components.ts

// コンポーネントのデフォルトスタイル上書きを定義
const components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true, // デフォルトでボタンの影を無効化
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
        // height: 64, // 必要であればコメントアウトを外して高さを調整
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8, // カードやダイアログの角を丸くする
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      // variantMapping など、デフォルトpropsを上書きする場合
    },
  },
  // 他のMUIコンポーネントのデフォルトスタイルを調整する
  // MuiIconButton, MuiTextField, MuiCard など
}

export default components
