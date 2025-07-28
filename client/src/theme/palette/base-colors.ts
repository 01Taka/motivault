const baseColors = {
  primary: {
    main: { light: '#3B82F6', dark: '#60A5FA' }, // モダンブルー (Tailwind Blue 500/400)
    light: { light: '#93C5FD', dark: '#93C5FD' }, // ソフトブルー (Blue 300)
    dark: { light: '#1E40AF', dark: '#1D4ED8' }, // ディープブルー (Blue 800/700)
    contrastText: { light: '#FFFFFF', dark: '#FFFFFF' },
  },
  secondary: {
    main: { light: '#EF4444', dark: '#F87171' }, // バイブラントレッド (Tailwind Red 500/400)
    light: { light: '#FCA5A5', dark: '#FCA5A5' }, // ソフトレッド (Red 300)
    dark: { light: '#B91C1C', dark: '#DC2626' }, // ディープレッド (Red 800/600)
    contrastText: { light: '#FFFFFF', dark: '#FFFFFF' },
  },
  error: {
    main: { light: '#DC2626', dark: '#EF4444' }, // 強めのレッド
  },
  warning: {
    main: { light: '#F59E0B', dark: '#FBBF24' }, // アンバー系（補色として）
  },
  info: {
    main: { light: '#06B6D4', dark: '#22D3EE' }, // シアン系（青の延長）
  },
  success: {
    main: { light: '#10B981', dark: '#34D399' }, // エメラルドグリーン
  },
  text: {
    primary: { light: '#111827', dark: '#F9FAFB' }, // より深い黒、より明るい白
    secondary: {
      light: '#6B7280', // クールグレー
      dark: '#D1D5DB',
    },
    disabled: {
      light: '#9CA3AF',
      dark: '#6B7280',
    },
  },
  background: {
    default: { light: '#FAFAFA', dark: '#0F0F23' }, // ライト：オフホワイト、ダーク：ディープネイビー
    paper: { light: '#FFFFFF', dark: '#1A1B3A' }, // ダークモードは紫がかったダークブルー
  },
  divider: {
    light: 'rgba(59, 130, 246, 0.08)', // プライマリブルーベースの薄いライン
    dark: 'rgba(96, 165, 250, 0.12)',
  },
  // Z世代向け追加カラー
  accent: {
    gradient: {
      primary: {
        light: 'linear-gradient(135deg, #3B82F6 0%, #EF4444 100%)',
        dark: 'linear-gradient(135deg, #60A5FA 0%, #F87171 100%)',
      },
      secondary: {
        light: 'linear-gradient(135deg, #EF4444 0%, #3B82F6 100%)',
        dark: 'linear-gradient(135deg, #F87171 0%, #60A5FA 100%)',
      },
    },
    neon: {
      blue: { light: '#0EA5E9', dark: '#38BDF8' }, // ネオンブルー
      red: { light: '#F43F5E', dark: '#FB7185' }, // ネオンレッド/ピンク
    },
  },
}

export { baseColors }
