import type z from 'zod'
import type { GenderSchema } from './gender-schema'

export type Gender = z.infer<typeof GenderSchema>
