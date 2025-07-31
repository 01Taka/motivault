import z from 'zod'
import type {
  ColorSchema,
  HexColorSchema,
  RgbColorSchema,
} from './color-schema'

export type HexColor = z.infer<typeof HexColorSchema>
export type RgbColor = z.infer<typeof RgbColorSchema>
export type Color = z.infer<typeof ColorSchema>
