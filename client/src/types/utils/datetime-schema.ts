import { z } from 'zod'

const ISODateRegex = /^\d{4}-\d{2}-\d{2}$/

/**
 * ISO 8601形式の日付文字列 (YYYY-MM-DD) を検証するZodスキーマ。
 */
export const ISODateSchema = z
  .string()
  .regex(ISODateRegex, '有効なISO日付形式ではありません (例: 2023-01-23)')

const ISODateTimeRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/

/**
 * ISO 8601形式のタイムスタンプ文字列 (YYYY-MM-DDTHH:MM:SS.sssZ) を検証するZodスキーマ。
 */
export const ISODateTimeSchema = z
  .string()
  .regex(
    ISODateTimeRegex,
    '有効なISOタイムスタンプ形式ではありません (例: 2023-01-23T12:34:56.789Z)'
  )

export const UnixTimestampSchema = z.number().int()
