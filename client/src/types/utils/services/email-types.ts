import type z from 'zod'
import type { EmailSchema } from './email-schema'

export type Email = z.infer<typeof EmailSchema>
