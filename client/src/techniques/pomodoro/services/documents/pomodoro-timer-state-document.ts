import { z } from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

export const TimerStatusSchema = z.enum([
  'idle',
  'running',
  'paused',
  'finished',
])

export const PomodoroTimerStateSchema = z.object({
  status: TimerStatusSchema,
  duration: z.number(),
  stoppedAt: z.number().nullable(),
  startTime: z.number(),
})

export const PomodoroTimerStateReadSchema = PomodoroTimerStateSchema.extend(
  DocumentReadSchema.shape
)
export const PomodoroTimerStateWriteSchema = PomodoroTimerStateSchema.extend(
  DocumentWriteSchema.shape
)

export const PartialPomodoroTimerStateReadSchema =
  PomodoroTimerStateWriteSchema.partial()
export const PartialPomodoroTimerStateWriteSchema =
  PomodoroTimerStateWriteSchema.partial()

export type PomodoroTimerState = z.infer<typeof PomodoroTimerStateSchema>
export type PomodoroTimerStateRead = z.infer<
  typeof PomodoroTimerStateReadSchema
>
export type PomodoroTimerStateWrite = z.infer<
  typeof PomodoroTimerStateWriteSchema
>

export type TimerStatus = z.infer<typeof TimerStatusSchema>
