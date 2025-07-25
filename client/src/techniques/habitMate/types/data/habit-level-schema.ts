import z from 'zod'
import { VersionSchema } from '../../../../types/utils/services/version-schema'

export const HabitMateHabitLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])

export const HabitMateTargetSchema = z.union([
  z.object({
    type: z.literal('fixed'),
    count: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal('unlimited'),
  }),
])

export const HabitMateLevelInfoSchema = z.object({
  level: HabitMateHabitLevelSchema,
  version: VersionSchema,
  name: z.string(),
  milestoneIntervalCount: z.number().int().positive(),
  targetCount: HabitMateTargetSchema,
  startHabitBgSrc: z.string().url(),
})
