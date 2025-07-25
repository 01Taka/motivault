import type z from 'zod'
import type {
  HabitMateHabitLevelSchema,
  HabitMateLevelInfoSchema,
  HabitMateTargetSchema,
} from './habit-level-schema'

export type HabitMateHabitLevel = z.infer<typeof HabitMateHabitLevelSchema>
export type HabitMateTarget = z.infer<typeof HabitMateTargetSchema>
export type HabitMateLevelInfo = z.infer<typeof HabitMateLevelInfoSchema>
