import {
  documentReadSchema,
  documentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import { z } from 'zod'
import { versionSchema } from '../../../../types/utils/version-schema'
import { isoDateSchema } from '../../../../types/utils/datetime-schema'

// 'HabitMateHabitLevel' をZodで表現
const habitMateHabitLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])

// 'HabitMateHabit' のコアスキーマ
export const habitMateHabitSchema = z.object({
  level: habitMateHabitLevelSchema,
  levelVersion: versionSchema,
  habit: z.string(),
  isExecutable: z.boolean(),
  timing: z.string(),
  startedAt: z.number(),
  workedDate: z.array(isoDateSchema),
  nextTargetCount: z.number().int().nonnegative(),
  isFailed: z.boolean(),
  status: z.union([
    z.literal('active'),
    z.literal('paused'),
    z.literal('completed'),
  ]),
  resetCount: z.number().int().nonnegative(),
})

export const habitMateHabitReadSchema = habitMateHabitSchema.extend(
  documentReadSchema.shape
)

export const habitMateHabitWriteSchema = habitMateHabitSchema.extend(
  documentWriteSchema.shape
)

// ZodのスキーマからTypeScriptの型を推論
export type HabitMateHabitRead = z.infer<typeof habitMateHabitReadSchema>
export type HabitMateHabitWrite = z.infer<typeof habitMateHabitWriteSchema>
