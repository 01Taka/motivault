import z from 'zod'
import { WeekdaySchema } from '../../../../types/utils/datetime-schema'

export const TimeBlockingRepeatSchema = z.union([
  z.object({ type: z.literal('daily') }),
  z.object({
    type: z.literal('custom'),
    dayOfWeek: z.array(WeekdaySchema).nonempty(),
  }),
])

export type TimeBlockingRepeat = z.infer<typeof TimeBlockingRepeatSchema>
