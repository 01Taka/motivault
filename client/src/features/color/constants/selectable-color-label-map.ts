import type {
  HueCategory,
  SelectableColorId,
} from '../types/selectable-color-type'

export const hueCategoryLabels: Record<HueCategory, string> = {
  red: 'レッド',
  pink: 'ピンク',
  orange: 'オレンジ',
  yellow: 'イエロー',
  green: 'グリーン',
  blue: 'ブルー',
  purple: 'パープル',
  gray: 'グレー',
}

export const colorIdLabels: Record<SelectableColorId, string> = {
  'vibrant-red': 'レッド - フレッシュ',
  'coral-red': 'レッド - コーラル',
  'cherry-red': 'レッド - チェリー',
  'hot-pink': 'ピンク - ホット',
  'bubblegum-pink': 'ピンク - バブルガム',
  'rose-pink': 'ピンク - ローズ',
  'neon-orange': 'オレンジ - ネオン',
  'sunset-orange': 'オレンジ - サンセット',
  'peach-orange': 'オレンジ - ピーチ',
  'electric-yellow': 'イエロー - エレクトリック',
  'sunshine-yellow': 'イエロー - サンシャイン',
  'lemon-yellow': 'イエロー - レモン',
  'lime-green': 'グリーン - ライム',
  'emerald-green': 'グリーン - エメラルド',
  'mint-green': 'グリーン - ミント',
  'electric-blue': 'ブルー - エレクトリック',
  'sky-blue': 'ブルー - スカイ',
  'cyan-blue': 'ブルー - シアン',
  'electric-purple': 'パープル - エレクトリック',
  'violet-purple': 'パープル - バイオレット',
  'lavender-purple': 'パープル - ラベンダー',
  'charcoal-gray': 'グレー - チャコール',
  'slate-gray': 'グレー - スレート',
  'silver-gray': 'グレー - シルバー',
}
