export const POMODORO_COLORS = {
  // モードカラー
  modes: {
    quick: '#FF6B6B', // エネルギッシュな赤
    focus: '#4ECDC4', // 集中の青緑
    deep: '#9B59B6', // 深い紫
  },

  // サイクルカラー
  cycles: {
    study: {
      primary: '#FF8A80', // 温かみのある赤
      secondary: '#FFCDD2', // 薄いピンク
      accent: '#D32F2F', // 深い赤
      gradient: {
        start: '#FF8A80',
        end: '#FFCDD2',
      },
    },
    break: {
      primary: '#81C784', // 落ち着いた緑
      secondary: '#C8E6C9', // 薄い緑
      accent: '#388E3C', // 深い緑
      gradient: {
        start: '#81C784',
        end: '#C8E6C9',
      },
    },
  },

  // 状態カラー
  states: {
    running: '#4CAF50',
    paused: '#FF9800',
    exceeded: '#F44336',
    completed: '#2196F3',
  },

  // UIカラー
  ui: {
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    outline: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
  },
} as const

export type PomodoroModeColor = keyof typeof POMODORO_COLORS.modes
export type PomodoroCycleColor = keyof typeof POMODORO_COLORS.cycles
