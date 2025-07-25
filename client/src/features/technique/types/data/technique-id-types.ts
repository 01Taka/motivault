import { z } from 'zod'
import type { TechniqueSchema } from './technique-id-schema'

export type TechniqueId = z.infer<typeof TechniqueSchema>
