import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import { z } from 'zod'
import { VersionSchema } from '../../../../types/utils/services/version-schema'
import { ISODateSchema } from '../../../../types/utils/datetime-schema'

const HabitMateHabitLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])

export const HabitMateHabitSchema = z.object({
  level: HabitMateHabitLevelSchema,
  levelVersion: VersionSchema,
  habit: z.string(),
  isExecutable: z.boolean(),
  timing: z.string(),
  startedAt: z.number(),
  workedDate: z.array(ISODateSchema),
  nextTargetCount: z.number().int().nonnegative(),
  isFailed: z.boolean(),
  status: z.union([
    z.literal('active'),
    z.literal('paused'),
    z.literal('completed'),
  ]),
  resetCount: z.number().int().nonnegative(),
})

export const HabitMateHabitReadSchema = HabitMateHabitSchema.extend(
  DocumentReadSchema.shape
)
export const HabitMateHabitWriteSchema = HabitMateHabitSchema.extend(
  DocumentWriteSchema.shape
)

export const PartialHabitMateHabitReadSchema =
  HabitMateHabitWriteSchema.partial()
export const PartialHabitMateHabitWriteSchema =
  HabitMateHabitWriteSchema.partial()

export type HabitMateHabitRead = z.infer<typeof HabitMateHabitReadSchema>
export type HabitMateHabitWrite = z.infer<typeof HabitMateHabitWriteSchema>
