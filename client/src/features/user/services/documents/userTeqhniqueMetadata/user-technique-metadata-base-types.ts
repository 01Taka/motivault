import type z from 'zod'
import type { UserTechniqueMetadataBaseSchema } from './user-technique-metadata-base-schema'

export type UserTechniqueMetadata = z.infer<
  typeof UserTechniqueMetadataBaseSchema
>
