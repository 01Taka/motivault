import z from 'zod'
import { TimeBlockingBlockSchema } from './time-blocking-block-data'

export const TimeBlockingLayerTypeSchema = z.enum([
  'timezoneLayer',
  'routineLayer',
  'confirmedEventLayer',
  'purposeLayer',
  'detailedLayer',
])

export type TimeBlockingLayerType = z.infer<typeof TimeBlockingLayerTypeSchema>

// サブコレクション リピートするものだけ保存する形式に
export const TimeBlockingLayerSchema = z.object({
  title: z.string(),
  type: TimeBlockingLayerTypeSchema,
  blocks: z.array(TimeBlockingBlockSchema), // TimeBlockingBlockの配列として定義
})

export type TimeBlockingLayer = z.infer<typeof TimeBlockingLayerSchema>

// TimeBlockingLayerUnitのZodスキーマを定義
// 各レイヤータイプをキーとして、TimeBlockingLayerオブジェクトを値として持つ
export const TimeBlockingLayerUnitSchema = z.object({
  timezoneLayer: TimeBlockingLayerSchema,
  routineLayer: TimeBlockingLayerSchema,
  confirmedEventLayer: TimeBlockingLayerSchema,
  purposeLayer: TimeBlockingLayerSchema,
  detailedLayer: TimeBlockingLayerSchema,
})

export type TimeBlockingLayerUnit = z.infer<typeof TimeBlockingLayerUnitSchema>
