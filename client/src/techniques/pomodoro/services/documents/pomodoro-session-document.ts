import { z } from 'zod'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'
import {
  ISODateSchema,
  UnixTimestampSchema,
} from '../../../../types/utils/datetime-schema'
import { PomodoroCycleSchema } from './pomodoro-session-shared-data'

// ポモドーロセッション全体のスキーマ
export const PomodoroSessionSchema = z.object({
  startAt: UnixTimestampSchema, // セッション全体の開始タイムスタンプ
  endAt: UnixTimestampSchema, // セッション全体の終了タイムスタンプ
  date: ISODateSchema, // "YYYY-MM-DD"形式の文字列を正規表現でバリデーション
  cycles: z.array(PomodoroCycleSchema), // PomodoroCycleSchemaの配列
})

export const PomodoroSessionReadSchema = PomodoroSessionSchema.extend(
  DocumentReadSchema.shape
)
export const PomodoroSessionWriteSchema = PomodoroSessionSchema.extend(
  DocumentWriteSchema.shape
)

export const PartialPomodoroSessionReadSchema =
  PomodoroSessionWriteSchema.partial()
export const PartialPomodoroSessionWriteSchema =
  PomodoroSessionWriteSchema.partial()

export type PomodoroSessionRead = z.infer<typeof PomodoroSessionReadSchema>
export type PomodoroSessionWrite = z.infer<typeof PomodoroSessionWriteSchema>
