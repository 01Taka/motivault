import z from 'zod'
import { TimeBlockingLayerSchema } from '../../../types/data/time-blocking-layer-data'
import { TimeBlockingRepeatSchema } from '../../../types/data/time-blocking-repeat-data'

// サブコレクション リピートするものだけ保存する形式に
export const TimeBlockingRepeatLayerSchema = z
  .object({
    repeat: TimeBlockingRepeatSchema,
  })
  .extend(TimeBlockingLayerSchema)
