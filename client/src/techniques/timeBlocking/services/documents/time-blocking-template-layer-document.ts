import z from 'zod'
import {
  TimeBlockingLayerSchema,
  TimeBlockingLayerTypeSchema,
} from '../../types/data/time-blocking-layer-data'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import { TimeBlockingRepeatSchema } from '../../types/data/time-blocking-repeat-data'

// サブコレクション
export const TimeBlockingTemplateLayerSchema = z
  .object({
    layerType: TimeBlockingLayerTypeSchema,
    repeat: TimeBlockingRepeatSchema.nullable(),
  })
  .extend(TimeBlockingLayerSchema.shape)

export const TimeBlockingTemplateLayerReadSchema =
  TimeBlockingTemplateLayerSchema.extend(DocumentReadSchema.shape)
export const TimeBlockingTemplateLayerWriteSchema =
  TimeBlockingTemplateLayerSchema.extend(DocumentWriteSchema.shape)

export const PartialTimeBlockingTemplateLayerReadSchema =
  TimeBlockingTemplateLayerWriteSchema.partial()
export const PartialTimeBlockingTemplateLayerWriteSchema =
  TimeBlockingTemplateLayerWriteSchema.partial()

export type TimeBlockingTemplateLayerRead = z.infer<
  typeof TimeBlockingTemplateLayerReadSchema
>
export type TimeBlockingTemplateLayerWrite = z.infer<
  typeof TimeBlockingTemplateLayerWriteSchema
>
