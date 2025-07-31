import z from 'zod'
import { ISODateSchema } from '../../../../types/utils/datetime-schema' // ISODateのZodスキーマのパスを修正
import { TimeBlockingLayerUnitSchema } from '../../types/data/time-blocking-layer-data'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

// TimeBlockingPlanのZodスキーマを定義
// 特定の日付の全レイヤーデータを含む
export const TimeBlockingPlanSchema = z.object({
  date: ISODateSchema,
  layers: TimeBlockingLayerUnitSchema,
})

export const TimeBlockingPlanReadSchema = TimeBlockingPlanSchema.extend(
  DocumentReadSchema.shape
)
export const TimeBlockingPlanWriteSchema = TimeBlockingPlanSchema.extend(
  DocumentWriteSchema.shape
)

export const PartialTimeBlockingPlanReadSchema =
  TimeBlockingPlanWriteSchema.partial()
export const PartialTimeBlockingPlanWriteSchema =
  TimeBlockingPlanWriteSchema.partial()

export type TimeBlockingPlanRead = z.infer<typeof TimeBlockingPlanReadSchema>
export type TimeBlockingPlanWrite = z.infer<typeof TimeBlockingPlanWriteSchema>
