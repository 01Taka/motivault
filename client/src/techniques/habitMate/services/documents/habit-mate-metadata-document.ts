import z from 'zod'
import {
  documentReadSchema,
  documentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

export const HabitMateMetadataSchema = z.object({
  maxConcurrentHabits: z.number(),
  activeHabitIds: z.array(z.string()),
})

export const HabitMateMetadataReadSchema = HabitMateMetadataSchema.extend(
  documentReadSchema.shape
)

export const HabitMateMetadataWriteSchema = HabitMateMetadataSchema.extend(
  documentWriteSchema.shape
)

export type HabitMateMetadataRead = z.infer<typeof HabitMateMetadataReadSchema>
export type HabitMateMetadataWrite = z.infer<
  typeof HabitMateMetadataWriteSchema
>
