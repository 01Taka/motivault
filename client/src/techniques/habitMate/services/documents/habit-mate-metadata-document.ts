import z from 'zod'
import {
  documentReadSchema,
  documentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

export const habitMateMetadataSchema = z.object({
  maxConcurrentHabits: z.number(),
  activeHabitIds: z.array(z.string()),
})

export const habitMateMetadataReadSchema = habitMateMetadataSchema.extend(
  documentReadSchema.shape
)

export const habitMateMetadataWriteSchema = habitMateMetadataSchema.extend(
  documentWriteSchema.shape
)

// ZodのスキーマからTypeScriptの型を推論
export type HabitMateMetadataRead = z.infer<typeof habitMateMetadataReadSchema>
export type HabitMateMetadataWrite = z.infer<
  typeof habitMateMetadataWriteSchema
>
