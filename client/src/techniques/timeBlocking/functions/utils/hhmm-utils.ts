import type { HHMMTimeNumber } from '../../../../types/utils/datetime-types'

/**
 * その日の午前0時からの経過ミリ秒を、HHMM形式の数値（0000〜2359）に変換します。
 *
 * @param milliseconds - その日の午前0時からの経過ミリ秒（0〜86399999）
 * @returns HHMM形式の数値
 */
export function millisecondsToHhMm(milliseconds: number): HHMMTimeNumber {
  // ミリ秒を時間と分に変換
  const totalMinutes = Math.floor(milliseconds / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  // HHMM形式の数値として整形
  const hhmm = hours * 100 + minutes

  return hhmm
}

/**
 * HHMM形式の数値（0000〜2359）を、その日の午前0時からの経過ミリ秒に変換します。
 *
 * @param hhmm - HHMM形式の数値（例: 1030）
 * @returns 経過ミリ秒
 */
export function hhmmToMilliseconds(hhmm: HHMMTimeNumber): number {
  // HHMM形式から時間と分を抽出
  const hours = Math.floor(hhmm / 100)
  const minutes = hhmm % 100

  // 抽出した時間と分からミリ秒を計算
  const milliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000

  return milliseconds
}

/**
 * HHMM形式の数値を指定した文字列フォーマットに変換します。
 * 'HH', 'H', 'hh', 'h', 'mm', 'm' のプレースホルダーを置換します。
 * @param hhmm HHMM形式の数値（例: 1030）
 * @param format 変換したい形式文字列（例: 'HH時mm分'）
 * @returns フォーマットされた時刻文字列
 */
export function formatHhMm(hhmm: HHMMTimeNumber, format: string): string {
  if (hhmm < 0 || hhmm > 2359 || hhmm % 100 > 59) {
    throw new Error(
      'Invalid HHMM value. Must be between 0 and 2359, and minutes must be 00-59.'
    )
  }

  const hours24 = Math.floor(hhmm / 100)
  const minutes = hhmm % 100

  let hours12 = hours24 % 12
  if (hours12 === 0) {
    hours12 = 12
  }

  const formattedHours24_2digit = hours24.toString().padStart(2, '0')
  const formattedHours12_2digit = hours12.toString().padStart(2, '0')
  const formattedMinutes_2digit = minutes.toString().padStart(2, '0')

  const replacements = {
    HH: formattedHours24_2digit,
    H: hours24.toString(),
    hh: formattedHours12_2digit,
    h: hours12.toString(),
    mm: formattedMinutes_2digit,
    m: minutes.toString(),
  }

  // 正規表現を使ってフォーマット文字列内のプレースホルダーを置換
  return format.replace(/HH|H|hh|h|mm|m/g, (match) => {
    // 置換が見つかった場合は対応する値で置換し、見つからない場合は元の文字列を返す
    return replacements[match as keyof typeof replacements] || match
  })
}

export function formatMsAsHhMm(ms: number, format: string): string {
  return formatHhMm(millisecondsToHhMm(ms), format)
}
