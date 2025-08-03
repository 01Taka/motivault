import type z from 'zod'
import type {
  HueCategorySchema,
  SelectableColorIdSchema,
  SelectableColorSchema,
  FullSelectableColorSchema,
} from './selectable-color-schema'

export type HueCategory = z.infer<typeof HueCategorySchema>

export type SelectableColorId = z.infer<typeof SelectableColorIdSchema>

export type SelectableColor = z.infer<typeof SelectableColorSchema>

export type FullSelectableColor = z.infer<typeof FullSelectableColorSchema>
