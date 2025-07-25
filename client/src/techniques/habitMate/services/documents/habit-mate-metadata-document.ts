import z from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import { TechniqueMetadataBaseSchema } from '../../../../features/technique/metadata/services/documents/technique-metadata-base-document'

export const HabitMateMetadataSchema = TechniqueMetadataBaseSchema.extend({
  maxConcurrentHabits: z.number(),
  activeHabitIds: z.array(z.string()),
})

export const HabitMateMetadataReadSchema = HabitMateMetadataSchema.extend(
  DocumentReadSchema.shape
)
export const HabitMateMetadataWriteSchema = HabitMateMetadataSchema.extend(
  DocumentWriteSchema.shape
)

export const PartialHabitMateMetadataReadSchema =
  HabitMateMetadataReadSchema.partial()
export const PartialHabitMateMetadataWriteSchema =
  HabitMateMetadataWriteSchema.partial()

export type HabitMateMetadataRead = z.infer<typeof HabitMateMetadataReadSchema>
export type HabitMateMetadataWrite = z.infer<
  typeof HabitMateMetadataWriteSchema
>
