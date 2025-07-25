import { z } from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../../types/db/db-service-document-schema' // Assuming this path is correct based on your sample

export const TechniqueSessionEndReasonSchema = z.union([
  z.literal('timeout'),
  z.literal('linkMoved'),
])

export const TechniqueSessionBaseSchema = z.object({
  startedAt: z.number(),
  endedAt: z.number().nullable(),
  endReason: TechniqueSessionEndReasonSchema.nullable(),
  totalExpGained: z.number(),
})

// Extended schemas for read and write operations, including document metadata
export const TechniqueSessionBaseReadSchema = TechniqueSessionBaseSchema.extend(
  DocumentReadSchema.shape
)
export const TechniqueSessionBaseWriteSchema =
  TechniqueSessionBaseSchema.extend(DocumentWriteSchema.shape)

// Partial schemas for flexible updates
export const PartialTechniqueSessionBaseReadSchema =
  TechniqueSessionBaseReadSchema.partial()
export const PartialTechniqueSessionBaseWriteSchema =
  TechniqueSessionBaseWriteSchema.partial()

// TypeScript types for convenience
export type TechniqueSessionBaseRead = z.infer<
  typeof TechniqueSessionBaseReadSchema
>
export type TechniqueSessionBaseWrite = z.infer<
  typeof TechniqueSessionBaseWriteSchema
>

///
///
///
export const TechniqueSessionExpGainEventSchema = z.object({
  timestamp: z.number(),
  amount: z.number(),
  reason: z.string(),
})

// Extended schemas for read and write operations for exp gain events
export const TechniqueSessionExpGainEventReadSchema =
  TechniqueSessionExpGainEventSchema.extend(DocumentReadSchema.shape)
export const TechniqueSessionExpGainEventWriteSchema =
  TechniqueSessionExpGainEventSchema.extend(DocumentWriteSchema.shape)

// Partial schemas for flexible updates of exp gain events
export const PartialTechniqueSessionExpGainEventReadSchema =
  TechniqueSessionExpGainEventReadSchema.partial()
export const PartialTechniqueSessionExpGainEventWriteSchema =
  TechniqueSessionExpGainEventWriteSchema.partial()

// TypeScript types for convenience for exp gain events
export type TechniqueSessionExpGainEventRead = z.infer<
  typeof TechniqueSessionExpGainEventReadSchema
>
export type TechniqueSessionExpGainEventWrite = z.infer<
  typeof TechniqueSessionExpGainEventWriteSchema
>

///
///
///
export const TechniqueUnlockAchievementEventSchema = z.object({
  // achievementId = docId
  timestamp: z.number(),
})

// Extended schemas for read and write operations for unlock achievement events
export const TechniqueUnlockAchievementEventReadSchema =
  TechniqueUnlockAchievementEventSchema.extend(DocumentReadSchema.shape)
export const TechniqueUnlockAchievementEventWriteSchema =
  TechniqueUnlockAchievementEventSchema.extend(DocumentWriteSchema.shape)

// Partial schemas for flexible updates of unlock achievement events
export const PartialTechniqueUnlockAchievementEventReadSchema =
  TechniqueUnlockAchievementEventReadSchema.partial()
export const PartialTechniqueUnlockAchievementEventWriteSchema =
  TechniqueUnlockAchievementEventWriteSchema.partial()

// TypeScript types for convenience for unlock achievement events
export type TechniqueUnlockAchievementEventRead = z.infer<
  typeof TechniqueUnlockAchievementEventReadSchema
>
export type TechniqueUnlockAchievementEventWrite = z.infer<
  typeof TechniqueUnlockAchievementEventWriteSchema
>
