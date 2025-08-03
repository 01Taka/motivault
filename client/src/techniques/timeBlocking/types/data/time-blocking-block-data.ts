import z from 'zod'
import { FirestoreDocIdSchema } from '../../../../types/firebase/firestore/firestore-id-schema'
import { HHMMTimeNumberSchema } from '../../../../types/utils/datetime-schema'
import { SelectableColorIdSchema } from '../../../../features/color/types/selectable-color-schema'

export const TimeBlockingBlockSchema = z.object({
  settingId: FirestoreDocIdSchema.nullable(),
  name: z.string(),
  colorId: SelectableColorIdSchema,
  startAt: HHMMTimeNumberSchema,
  endAt: HHMMTimeNumberSchema,
  duration: z.number().nullable(),
})

export type TimeBlockingBlock = z.infer<typeof TimeBlockingBlockSchema>
