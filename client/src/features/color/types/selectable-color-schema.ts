import { z } from 'zod'

// HueCategory スキーマ
export const HueCategorySchema = z.enum([
  'red',
  'pink',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'gray',
])

// SelectableColorId スキーマ
export const SelectableColorIdSchema = z.enum([
  'vibrant-red',
  'coral-red',
  'cherry-red',
  'hot-pink',
  'bubblegum-pink',
  'rose-pink',
  'neon-orange',
  'sunset-orange',
  'peach-orange',
  'electric-yellow',
  'sunshine-yellow',
  'lemon-yellow',
  'lime-green',
  'emerald-green',
  'mint-green',
  'electric-blue',
  'sky-blue',
  'cyan-blue',
  'electric-purple',
  'violet-purple',
  'lavender-purple',
  'charcoal-gray',
  'slate-gray',
  'silver-gray',
])

// SelectableColor スキーマ
export const SelectableColorSchema = z.object({
  id: SelectableColorIdSchema,
  hueCategory: HueCategorySchema,
  main: z.string(), // 色コードは文字列として定義
})

// FullSelectableColor スキーマ
export const FullSelectableColorSchema = z.object({
  id: SelectableColorIdSchema,
  hueCategory: HueCategorySchema,
  main: z.string(),
  text: z.string(),
  background: z.string(),
})
