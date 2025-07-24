import type z from 'zod'
import type {
  UserTechniqueSessionBaseSchema,
  UserTechniqueSessionEndReasonSchema,
  UserTechniqueSessionExpGainEventSchema,
} from './user-technique-session-base-schema'

export type UserTechniqueSessionEndReason = z.infer<
  typeof UserTechniqueSessionEndReasonSchema
>

export type UserTechniqueSessionBase = z.infer<
  typeof UserTechniqueSessionBaseSchema
>

export type UserTechniqueSessionExpGainEvent = z.infer<
  typeof UserTechniqueSessionExpGainEventSchema
>
