import z from 'zod'
import { FirestoreDocIdSchema } from '../../../../types/firebase/firestore/firestore-id-schema'
import { ColorSchema } from '../../../../types/utils/color-schema'
import { UnixTimestampSchema } from '../../../../types/utils/datetime-schema'

export const TimeBlockingBlockSchema = z.object({
  settingId: FirestoreDocIdSchema.nullable(),
  name: z.string(),
  color: ColorSchema,
  startAt: UnixTimestampSchema,
  endAt: UnixTimestampSchema,
  duration: z.number().nullable(),
})

export type TimeBlockingBlock = z.infer<typeof TimeBlockingBlockSchema>
