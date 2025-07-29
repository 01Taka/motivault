import z from 'zod'
import {
  UnixTimestampSchema,
  ISODateSchema,
} from '../../../../types/utils/datetime-schema'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import {
  PomodoroCycleSchema,
  PomodoroProgressSessionStateSchema,
} from './pomodoro-session-shared-data'

// 勉強サイクルのスキーマ
export const PomodoroStudyProgressCycleSchema = z.object({
  type: z.literal('study'), // 'study' リテラル型
  startAt: UnixTimestampSchema,
  endAt: UnixTimestampSchema.nullable(),
  subjectId: z.string(), // SubjectSchemaをネスト
})

// 休憩サイクルのスキーマ
export const PomodoroBreakProgressCycleSchema = z.object({
  type: z.literal('break'), // 'break' リテラル型
  startAt: UnixTimestampSchema,
  endAt: UnixTimestampSchema.nullable(),
})

// ポモドーロサイクルのユニオン型
// Zodでは`z.union`を使って複数のスキーマのいずれかに合致することを表現します
export const PomodoroProgressCycleSchema = z.union([
  PomodoroStudyProgressCycleSchema,
  PomodoroBreakProgressCycleSchema,
])

export const PomodoroProgressSessionSchema = z.object({
  state: PomodoroProgressSessionStateSchema,
  startAt: UnixTimestampSchema, // セッション全体の開始タイムスタンプ
  endAt: UnixTimestampSchema.nullable(), // セッション全体の終了タイムスタンプ
  date: ISODateSchema, // "YYYY-MM-DD"形式の文字列を正規表現でバリデーション
  progressCycle: PomodoroProgressCycleSchema.nullable(),
  cycles: z.array(PomodoroCycleSchema), // PomodoroCycleSchemaの配列
})

export const PomodoroProgressSessionReadSchema =
  PomodoroProgressSessionSchema.extend(DocumentReadSchema.shape)
export const PomodoroProgressSessionWriteSchema =
  PomodoroProgressSessionSchema.extend(DocumentWriteSchema.shape)

export const PartialPomodoroProgressSessionReadSchema =
  PomodoroProgressSessionWriteSchema.partial()
export const PartialPomodoroProgressSessionWriteSchema =
  PomodoroProgressSessionWriteSchema.partial()

export type PomodoroProgressSessionRead = z.infer<
  typeof PomodoroProgressSessionReadSchema
>
export type PomodoroProgressSessionWrite = z.infer<
  typeof PomodoroProgressSessionWriteSchema
>

export type PomodoroProgressCycle = z.infer<typeof PomodoroProgressCycleSchema>
export type PomodoroStudyProgressCycle = z.infer<
  typeof PomodoroStudyProgressCycleSchema
>
export type PomodoroBreakProgressCycle = z.infer<
  typeof PomodoroBreakProgressCycleSchema
>
