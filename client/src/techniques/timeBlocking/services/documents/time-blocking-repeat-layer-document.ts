import z from 'zod'
import { TimeBlockingLayerSchema } from '../../types/data/time-blocking-layer-data'
import { TimeBlockingRepeatSchema } from '../../types/data/time-blocking-repeat-data'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

// サブコレクション リピートするものだけ保存する形式に
export const TimeBlockingRepeatLayerSchema = z
  .object({
    repeat: TimeBlockingRepeatSchema,
  })
  .extend(TimeBlockingLayerSchema)

export const TimeBlockingRepeatLayerReadSchema =
  TimeBlockingRepeatLayerSchema.extend(DocumentReadSchema.shape)
export const TimeBlockingRepeatLayerWriteSchema =
  TimeBlockingRepeatLayerSchema.extend(DocumentWriteSchema.shape)

export const PartialTimeBlockingRepeatLayerReadSchema =
  TimeBlockingRepeatLayerWriteSchema.partial()
export const PartialTimeBlockingRepeatLayerWriteSchema =
  TimeBlockingRepeatLayerWriteSchema.partial()

export type TimeBlockingRepeatLayerRead = z.infer<
  typeof TimeBlockingRepeatLayerReadSchema
>
export type TimeBlockingRepeatLayerWrite = z.infer<
  typeof TimeBlockingRepeatLayerWriteSchema
>
