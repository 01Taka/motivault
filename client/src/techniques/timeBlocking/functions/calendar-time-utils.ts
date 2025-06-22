import { toDate } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'

const START_HOUR = 4

/**
 * startHour時始まりの今日（start of day）のUnixミリ秒を返す
 * @param dateMs - 任意の日時（ミリ秒）
 * @param startHour - 開始時間（デフォルト4時）
 * @returns Unixタイムスタンプ（ミリ秒）
 */
export const getStartOfDayFromStartHour = (
  dateMs: number,
  startHour = START_HOUR
): number => {
  const date = dayjs(dateMs)

  // その日の午前4時を取得
  const adjustedDate =
    date.hour() >= startHour
      ? date
          .set('hour', startHour)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0)
      : date
          .subtract(1, 'day')
          .set('hour', startHour)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0)

  return adjustedDate.valueOf()
}

export const getHourLabel = (index: number) => {
  const hour = (START_HOUR + index) % 24
  return `${hour.toString().padStart(2, '0')}:00`
}

// Y座標を4時始まりで取得
export const getYPosition = (
  ms: number,
  startHour = 4,
  cellHeight = 60.8
): number => {
  const d = dayjs(ms)
  const hour = d.hour()
  const minute = d.minute()
  const hourOffset =
    hour >= startHour ? hour - startHour : hour + 24 - startHour
  return (hourOffset + minute / 60) * cellHeight
}

export const getClickedTime = (
  offsetY: number,
  baseDate: Dayjs = dayjs().startOf('day')
): Dayjs => {
  const totalMinutes = offsetY
  const clickedHourOffset = Math.floor(totalMinutes / 60)
  const clickedMinuteBlock = Math.floor((totalMinutes % 60) / 15) * 15
  const realHour = (START_HOUR + clickedHourOffset) % 24
  const dayAdjust = START_HOUR + clickedHourOffset >= 24 ? 1 : 0
  return baseDate
    .add(dayAdjust, 'day')
    .hour(realHour)
    .minute(clickedMinuteBlock)
}

/**
 * Checks if a given time is within the next X minutes from now.
 * @param time - The time to check. Can be a Date object or ISO8601 string.
 * @param minutes - Number of minutes to check ahead from now.
 * @returns True if the time is within the next `minutes`, false otherwise.
 */
export function isWithinNext(
  time: Date | string | number,
  minutes: number
): boolean {
  const now = new Date()
  const targetTime = toDate(time)

  if (isNaN(targetTime.getTime())) {
    throw new Error('Invalid date provided')
  }

  const diffMs = targetTime.getTime() - now.getTime()
  const diffMinutes = diffMs / 1000 / 60

  return diffMinutes >= 0 && diffMinutes <= minutes
}
