import z from 'zod'
import { ISODateSchema } from '../../../../../types/utils/datetime-schema' // ISODateのZodスキーマのパスを修正
import { TimeBlockingLayerUnitSchema } from '../../../types/data/time-blocking-layer-data'

// TimeBlockingPlanのZodスキーマを定義
// 特定の日付の全レイヤーデータを含む
export const TimeBlockingPlanSchema = z.object({
  date: ISODateSchema,
  layers: TimeBlockingLayerUnitSchema,
})

export type TimeBlockingPlan = z.infer<typeof TimeBlockingPlanSchema>
