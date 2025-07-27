import { z } from 'zod'
import type {
  TechniqueIdSchema,
  TechniquePathIdSchema,
} from './technique-id-schema'

export type TechniqueId = z.infer<typeof TechniqueIdSchema>
export type TechniquePathId = z.infer<typeof TechniquePathIdSchema>
