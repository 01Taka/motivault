import { z } from 'zod'
import { HabitMateHabitLevelSchema } from '../../../../../../techniques/habitMate/types/data/habit-level-schema'
import { TechniqueMetadataBaseSchema } from '../technique-metadata-base-document'

export const HabitMateMetadataOriginalDataSchema = z.object({
  currentHabitLevel: HabitMateHabitLevelSchema,
  activeHabitIds: z.array(z.string()),
})

export type HabitMateMetadataOriginalData = z.infer<
  typeof HabitMateMetadataOriginalDataSchema
>

export const HabitMateMetadataSchema = TechniqueMetadataBaseSchema.extend({
  techniqueId: z.literal('habitMate'),
  ...HabitMateMetadataOriginalDataSchema.shape,
})
