import z from 'zod'
import { TimeBlockingLayerTypeSchema } from '../../types/data/time-blocking-layer-data'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import { SelectableColorIdSchema } from '../../../../features/color/types/selectable-color-schema'
import { FirestoreDocIdSchema } from '../../../../types/firebase/firestore/firestore-id-schema'

export const TimeBlockingBlockSettingSchema = z.object({
  docId: FirestoreDocIdSchema,
  name: z.string(),
  colorId: SelectableColorIdSchema,
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

export type TimeBlockingBlockSetting = z.infer<
  typeof TimeBlockingBlockSettingSchema
>
export type TimeBlockingBlockSettingRead = z.infer<
  typeof TimeBlockingBlockSettingReadSchema
>
export type TimeBlockingBlockSettingWrite = z.infer<
  typeof TimeBlockingBlockSettingWriteSchema
>
