import type z from 'zod'
import type {
  habitMateHabitLevelSchema,
  habitMateLevelInfoSchema,
  habitMateTargetSchema,
} from './habit-level-schema'

export type HabitMateHabitLevel = z.infer<typeof habitMateHabitLevelSchema>
export type HabitMateTarget = z.infer<typeof habitMateTargetSchema>
export type HabitMateLevelInfo = z.infer<typeof habitMateLevelInfoSchema>
