import { z } from 'zod'

export const UserTechniqueSessionEndReasonSchema = z.union([
  z.literal('timeout'),
  z.literal('linkMoved'),
])

export const UserTechniqueSessionBaseSchema = z.object({
  startedAt: z.number(),
  endedAt: z.number().nullable(),
  endReason: UserTechniqueSessionEndReasonSchema.nullable(),
  totalExpGained: z.number(),
})

export const UserTechniqueSessionExpGainEventSchema = z.object({
  timestamp: z.number(),
  amount: z.number(),
  reason: z.string(),
})

export const UserTechniqueUnlockAchievementEventSchema = z.object({
  // achievementId = docId
  timestamp: z.number(),
})
