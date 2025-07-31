import z from 'zod'
import { TimeBlockingLayerTypeSchema } from '../../types/data/time-blocking-layer-data'
import { ColorSchema } from '../../../../types/utils/color-schema'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

export const TimeBlockingBlockSettingSchema = z.object({
  name: z.string(),
  color: ColorSchema,
  recommendedLayerType: TimeBlockingLayerTypeSchema,
})

export const TimeBlockingBlockSettingReadSchema =
  TimeBlockingBlockSettingSchema.extend(DocumentReadSchema.shape)
export const TimeBlockingBlockSettingWriteSchema =
  TimeBlockingBlockSettingSchema.extend(DocumentWriteSchema.shape)

export const PartialTimeBlockingBlockSettingReadSchema =
  TimeBlockingBlockSettingWriteSchema.partial()
export const PartialTimeBlockingBlockSettingWriteSchema =
  TimeBlockingBlockSettingWriteSchema.partial()

export type TimeBlockingBlockSettingRead = z.infer<
  typeof TimeBlockingBlockSettingReadSchema
>
export type TimeBlockingBlockSettingWrite = z.infer<
  typeof TimeBlockingBlockSettingWriteSchema
>
