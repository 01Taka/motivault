import { Timestamp } from 'firebase/firestore'
import type { DecimalDight } from './number-types'
import type z from 'zod'
import type {
  ISODateSchema,
  ISODateTimeSchema,
  UnixTimestampSchema,
  WeekdaySchema,
  StringWeekdaySchema,
} from './datetime-schema'

export type ISODate = z.infer<typeof ISODateSchema>
export type ISODateTime = z.infer<typeof ISODateTimeSchema>
export type UnixTimestamp = z.infer<typeof UnixTimestampSchema>

export type Month = `0${DecimalDight}` | '10' | '11' | '12'
export type Days =
  | `0${DecimalDight}`
  | `1${DecimalDight}`
  | `2${DecimalDight}`
  | '30'
  | '31'
export type Hours24 =
  | `0${DecimalDight}`
  | `1${DecimalDight}`
  | '20'
  | '21'
  | '22'
  | '23'

export type Weekday = z.infer<typeof WeekdaySchema>
export type StringWeekday = z.infer<typeof StringWeekdaySchema>

export type TimeType = number | Timestamp | Date | ISODate | ISODateTime

export type TimeSizeUnit =
  | 'millis'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'years'
