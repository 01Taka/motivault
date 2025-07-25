import { z } from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../../types/db/db-service-document-schema'

export const TechniqueSessionEndReasonSchema = z.union([
  z.literal('timeout'),
  z.literal('linkMoved'),
])

export const TechniqueSessionSchema = z.object({
  startedAt: z.number(),
  endedAt: z.number().nullable(),
  endReason: TechniqueSessionEndReasonSchema.nullable(),
  totalExpGained: z.number(),
  unlockedAchievementIds: z.array(z.string()),
})

export const TechniqueSessionReadSchema = TechniqueSessionSchema.extend(
  DocumentReadSchema.shape
)
export const TechniqueSessionWriteSchema = TechniqueSessionSchema.extend(
  DocumentWriteSchema.shape
)

export const PartialTechniqueSessionReadSchema =
  TechniqueSessionReadSchema.partial()
export const PartialTechniqueSessionWriteSchema =
  TechniqueSessionWriteSchema.partial()

export type TechniqueSessionRead = z.infer<typeof TechniqueSessionReadSchema>
export type TechniqueSessionWrite = z.infer<typeof TechniqueSessionWriteSchema>
