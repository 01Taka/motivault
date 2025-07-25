import z from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../../../types/db/db-service-document-schema'

export const TechniqueUnlockAchievementEventSchema = z.object({
  // achievementId = docId
  timestamp: z.number(),
  unlockedAchievementIds: z.array(z.string()),
})

export const TechniqueUnlockAchievementEventReadSchema =
  TechniqueUnlockAchievementEventSchema.extend(DocumentReadSchema.shape)
export const TechniqueUnlockAchievementEventWriteSchema =
  TechniqueUnlockAchievementEventSchema.extend(DocumentWriteSchema.shape)

export const PartialTechniqueUnlockAchievementEventReadSchema =
  TechniqueUnlockAchievementEventReadSchema.partial()
export const PartialTechniqueUnlockAchievementEventWriteSchema =
  TechniqueUnlockAchievementEventWriteSchema.partial()

export type TechniqueUnlockAchievementEventRead = z.infer<
  typeof TechniqueUnlockAchievementEventReadSchema
>
export type TechniqueUnlockAchievementEventWrite = z.infer<
  typeof TechniqueUnlockAchievementEventWriteSchema
>
