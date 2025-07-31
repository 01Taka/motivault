import z from 'zod'
import { TimeBlockingLayerTypeSchema } from '../../../types/data/time-blocking-layer-data'
import { ColorSchema } from '../../../../../types/utils/color-schema'

export const TimeBlockingBlockSettingSchema = z.object({
  name: z.string(),
  color: ColorSchema,
  recommendedLayerType: TimeBlockingLayerTypeSchema,
})

export type TimeBlockingBlockSetting = z.infer<
  typeof TimeBlockingBlockSettingSchema
>
