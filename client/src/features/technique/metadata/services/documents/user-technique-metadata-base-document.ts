import z from 'zod'
import { VersionSchema } from '../../../../../types/utils/services/version-schema'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../../types/db/db-service-document-schema'

export const TechniqueMetadataBaseSchema = z.object({
  techniqueVersion: VersionSchema,
  installedAt: z.number(),
  lastUsedAt: z.number(),
  totalGainedExp: z.number(),
  unlockedAchievementIds: z.array(z.string()),
  // unlockedTipIds: z.array(z.string()),
})

export const TechniqueMetadataBaseReadSchema =
  TechniqueMetadataBaseSchema.extend(DocumentReadSchema.shape)
export const TechniqueMetadataBaseWriteSchema =
  TechniqueMetadataBaseSchema.extend(DocumentWriteSchema.shape)

export const PartialTechniqueMetadataBaseReadSchema =
  TechniqueMetadataBaseReadSchema.partial()
export const PartialTechniqueMetadataBaseWriteSchema =
  TechniqueMetadataBaseWriteSchema.partial()

export type TechniqueMetadataBaseRead = z.infer<
  typeof TechniqueMetadataBaseReadSchema
>
export type TechniqueMetadataBaseWrite = z.infer<
  typeof TechniqueMetadataBaseWriteSchema
>
