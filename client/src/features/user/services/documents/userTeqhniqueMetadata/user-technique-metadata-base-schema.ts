import z from 'zod'
import { versionSchema } from '../../../../../types/utils/services/version-schema'

export const UserTechniqueMetadataBaseSchema = z.object({
  techniqueVersion: versionSchema,
  installedAt: z.number(),
  lastUsedAt: z.number(),
  totalGainedExp: z.number(),
  unlockedAchievementIds: z.array(z.string()),
  // unlockedTipIds: z.array(z.string()),
})
