import z from 'zod'
import { FirestoreDocIdSchema } from '../../../../../types/firebase/firestore/firestore-id-schema'
import { TimeBlockingLayerTypeSchema } from '../../../types/data/time-blocking-layer-data'
import { TimeBlockingRepeatSchema } from '../../../types/data/time-blocking-repeat-data'

// RepeatingLayerのZodスキーマを定義
export const TimeBlockingRepeatingLayerInfoSchema = z.object({
  layerId: FirestoreDocIdSchema,
  layerType: TimeBlockingLayerTypeSchema,
  repeat: TimeBlockingRepeatSchema,
})

// TimeBlockingMetadataのZodスキーマを定義
export const TimeBlockingMetadataSchema = z.object({
  currentRepeatingLayers: z.array(TimeBlockingRepeatingLayerInfoSchema),
})

// TypeScriptの型として利用
export type TimeBlockingMetadata = z.infer<typeof TimeBlockingMetadataSchema>
export type TimeBlockingRepeatingLayerInfo = z.infer<
  typeof TimeBlockingRepeatingLayerInfoSchema
>
