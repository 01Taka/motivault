export const navigationColors = {
  appBarGradient: {
    // グラデーションの開始色
    start: { light: '#FFCDD2', dark: '#B71C1C' }, // ライト: Red 50, ダーク: Red 900
    // グラデーションの終了色
    end: { light: '#BBDEFB', dark: '#1976D2' }, // ライト: Blue 100, ダーク: Blue 800
  },
  actionButtonGradient: {
    // アクションボタンの通常時のグラデーション
    start: { light: '#ff7e5f', dark: '#FF7043' }, // ライト: オレンジ系, ダーク: Deep Orange 400
    end: { light: '#feb47b', dark: '#FFAB91' }, // ライト: 黄色系, ダーク: Deep Orange 200
  },
  actionButtonGradientHover: {
    // アクションボタンのホバー時のグラデーション
    start: { light: '#e96f62', dark: '#D84315' }, // ライト: 少し濃いオレンジ系, ダーク: Deep Orange 800
    end: { light: '#feb47b', dark: '#FFAB91' }, // ライト: 黄色系, ダーク: Deep Orange 200 (ホバー時も終了色は同じか、調整)
  },
}
