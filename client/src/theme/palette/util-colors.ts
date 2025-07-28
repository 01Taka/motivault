export const utilColors = {
  border: {
    main: { light: '#E0E0E0', dark: '#3A3A3A' },
    dark: { light: '#B0B0B0', dark: '#555555' },
    light: { light: '#EEEEEE', dark: '#282828' },
  },
  highlightColor: {
    main: { light: '#E0F7FA', dark: '#004D40' }, // メインの強調色（明るい水色系）
    light: { light: '#F0FFFF', dark: '#26A69A' }, // より明るい強調色
    dark: { light: '#B2EBF2', dark: '#002620' }, // より暗い強調色
    contrastText: { light: '#000000', dark: '#FFFFFF' }, // テキストの色
  },
  energy: {
    main: { light: '#FFD700', dark: '#FFEA00' }, // 鮮やかな黄色 (より明るいトーン)
    light: { light: '#FFFACD', dark: '#FFF5EE' }, // 柔らかな黄色 (さらに明るく)
    dark: { light: '#DAA520', dark: '#FFC107' }, // 深い黄色 (ただし、元の意図を損なわない範囲で明るさを維持)
    contrastText: { light: '#000000', dark: '#000000' }, // 黄色は黒文字が読みやすい
  },
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
      energy: {
        light: 'linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)', // エネルギッシュなグラデーション
        dark: 'linear-gradient(135deg, #FDE047 0%, #FBBF24 100%)',
      },
    },
    neon: {
      blue: { light: '#0EA5E9', dark: '#38BDF8' }, // ネオンブルー
      red: { light: '#F43F5E', dark: '#FB7185' }, // ネオンレッド/ピンク
      yellow: { light: '#FACC15', dark: '#FEF08A' }, // ネオンイエロー
    },
  },
}
