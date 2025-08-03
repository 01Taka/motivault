import type {
  SelectableColor,
  SelectableColorId,
} from '../types/selectable-color-type'

export const selectableColorTemplate: Record<
  SelectableColorId,
  SelectableColor
> = {
  // レッド系 - エネルギッシュで情熱的
  'vibrant-red': {
    id: 'vibrant-red',
    hueCategory: 'red',
    main: '#FF4757',
  },
  'coral-red': {
    id: 'coral-red',
    hueCategory: 'red',
    main: '#FF6B6B',
  },
  'cherry-red': {
    id: 'cherry-red',
    hueCategory: 'red',
    main: '#E74C3C',
  },

  // ピンク系 - 可愛らしさとトレンド感
  'hot-pink': {
    id: 'hot-pink',
    hueCategory: 'pink',
    main: '#FF69B4',
  },
  'bubblegum-pink': {
    id: 'bubblegum-pink',
    hueCategory: 'pink',
    main: '#FF85C1',
  },
  'rose-pink': {
    id: 'rose-pink',
    hueCategory: 'pink',
    main: '#F06292',
  },

  // オレンジ系 - 活発で親しみやすい
  'neon-orange': {
    id: 'neon-orange',
    hueCategory: 'orange',
    main: '#FF6348',
  },
  'sunset-orange': {
    id: 'sunset-orange',
    hueCategory: 'orange',
    main: '#FF8C42',
  },
  'peach-orange': {
    id: 'peach-orange',
    hueCategory: 'orange',
    main: '#FFA726',
  },

  // イエロー系 - 明るく注意を引く
  'electric-yellow': {
    id: 'electric-yellow',
    hueCategory: 'yellow',
    main: '#FFD700',
  },
  'sunshine-yellow': {
    id: 'sunshine-yellow',
    hueCategory: 'yellow',
    main: '#FFEB3B',
  },
  'lemon-yellow': {
    id: 'lemon-yellow',
    hueCategory: 'yellow',
    main: '#FFF176',
  },

  // グリーン系 - 成長と安心感
  'lime-green': {
    id: 'lime-green',
    hueCategory: 'green',
    main: '#32CD32',
  },
  'emerald-green': {
    id: 'emerald-green',
    hueCategory: 'green',
    main: '#00C851',
  },
  'mint-green': {
    id: 'mint-green',
    hueCategory: 'green',
    main: '#26D0CE',
  },

  // ブルー系 - 信頼性と現代感
  'electric-blue': {
    id: 'electric-blue',
    hueCategory: 'blue',
    main: '#007BFF',
  },
  'sky-blue': {
    id: 'sky-blue',
    hueCategory: 'blue',
    main: '#3498DB',
  },
  'cyan-blue': {
    id: 'cyan-blue',
    hueCategory: 'blue',
    main: '#00BCD4',
  },

  // パープル系 - 創造性と個性
  'electric-purple': {
    id: 'electric-purple',
    hueCategory: 'purple',
    main: '#8E44AD',
  },
  'violet-purple': {
    id: 'violet-purple',
    hueCategory: 'purple',
    main: '#9C27B0',
  },
  'lavender-purple': {
    id: 'lavender-purple',
    hueCategory: 'purple',
    main: '#BA68C8',
  },

  // グレー系 - ニュートラルで洗練された
  'charcoal-gray': {
    id: 'charcoal-gray',
    hueCategory: 'gray',
    main: '#495057',
  },
  'slate-gray': {
    id: 'slate-gray',
    hueCategory: 'gray',
    main: '#6C757D',
  },
  'silver-gray': {
    id: 'silver-gray',
    hueCategory: 'gray',
    main: '#ADB5BD',
  },
} as const
