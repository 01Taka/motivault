import z from 'zod'
import { versionSchema } from '../../../../types/utils/version-schema'

export const habitMateHabitLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])

export const habitMateTargetSchema = z.union([
  z.object({
    type: z.literal('fixed'),
    count: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal('unlimited'),
  }),
])

export const habitMateLevelInfoSchema = z.object({
  level: habitMateHabitLevelSchema,
  version: versionSchema,
  name: z.string(),
  milestoneIntervalCount: z.number().int().positive(),
  targetCount: habitMateTargetSchema,
  startHabitBgSrc: z.string().url(),
})
