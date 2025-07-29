import z from 'zod'
import { UnixTimestampSchema } from '../../../../types/utils/datetime-schema'

// 勉強サイクルのスキーマ
export const PomodoroStudyCycleSchema = z.object({
  type: z.literal('study'), // 'study' リテラル型
  startAt: UnixTimestampSchema, // Unixタイムスタンプ（ミリ秒）を想定、整数
  endAt: UnixTimestampSchema, // Unixタイムスタンプ（ミリ秒）を想定、整数
  subjectId: z.string(), // SubjectSchemaをネスト
})

// 休憩サイクルのスキーマ
export const PomodoroBreakCycleSchema = z.object({
  type: z.literal('break'), // 'break' リテラル型
  startAt: UnixTimestampSchema, // Unixタイムスタンプ（ミリ秒）を想定、整数
  endAt: UnixTimestampSchema, // Unixタイムスタンプ（ミリ秒）を想定、整数
})

export const PomodoroCycleSchema = z.union([
  PomodoroStudyCycleSchema,
  PomodoroBreakCycleSchema,
])

export type PomodoroCycle = z.infer<typeof PomodoroCycleSchema>
export type PomodoroStudyCycle = z.infer<typeof PomodoroStudyCycleSchema>
export type PomodoroBreakCycle = z.infer<typeof PomodoroBreakCycleSchema>

export const PomodoroCycleTypeSchema = z.union([
  z.literal('study'),
  z.literal('break'),
])

export const PomodoroProgressCycleTimerStateSchema = z.union([
  z.literal('running'),
  z.literal('stop'),
])

export const PomodoroProgressSessionStateSchema = z.union([
  z.literal('progress'),
  z.literal('finished'),
  z.literal('saved'),
])

export type PomodoroProgressCycleTimerState = z.infer<
  typeof PomodoroProgressCycleTimerStateSchema
>
export type PomodoroCycleType = z.infer<typeof PomodoroCycleTypeSchema>
