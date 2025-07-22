type TimeExtractResult = {
  text: string
  values: {
    hour?: number
    min?: number
    sec?: number
  }
  totalSec: number
}

type TimeUnit = 'hour' | 'min' | 'sec'

export function extractTimeExpressions(input: string): TimeExtractResult[] {
  const results: TimeExtractResult[] = []

  // 単位ごとの情報
  const timeUnits = [
    { label: '時間', id: 'hour', factor: 3600 },
    { label: '分', id: 'min', factor: 60 },
    { label: '秒', id: 'sec', factor: 1 },
  ]

  // 全角数字 → 半角変換 + 正規化
  const normalized = input.replace(/[０-９．]/g, (ch) => {
    if (ch === '．') return '.'
    return String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  })

  // 小数対応・前に数値があるパターンのみ抽出
  const timePattern = /([0-9]+(?:\.[0-9]+)?)(時間|分|秒)(半)?/g

  let match: RegExpExecArray | null
  let currentResult: TimeExtractResult | null = null
  let lastMatchEnd = 0

  while ((match = timePattern.exec(normalized)) !== null) {
    const matchStart = match.index
    const matchEnd = timePattern.lastIndex
    const [full, numStr, unitLabel, hasHalfRaw] = match
    const value = parseFloat(numStr)
    const hasHalf = !!hasHalfRaw

    const unit = timeUnits.find((u) => u.label === unitLabel)
    if (!unit) continue

    // 新しい時間表現か？（離れていれば新規）
    if (!currentResult || matchStart > lastMatchEnd) {
      currentResult = {
        text: full,
        values: {},
        totalSec: 0,
      }
      results.push(currentResult)
    } else {
      currentResult.text += full
    }

    // 処理後に更新
    lastMatchEnd = matchEnd

    // 小数部の処理（例: 1.5時間 → 1時間30分）
    const intPart = Math.floor(value)
    const decimalPart = value - intPart

    if (decimalPart > 0) {
      currentResult.values[unit.id as TimeUnit] = intPart

      // decimalPart を次の小さい単位に変換
      const nextUnitIndex = timeUnits.findIndex((u) => u.id === unit.id) + 1
      if (nextUnitIndex < timeUnits.length) {
        const nextUnit = timeUnits[nextUnitIndex]
        const nextValue = Math.round(
          decimalPart * (unit.factor / nextUnit.factor)
        )
        currentResult.values[nextUnit.id as TimeUnit] =
          (currentResult.values[nextUnit.id as TimeUnit] ?? 0) + nextValue
        currentResult.totalSec +=
          intPart * unit.factor + nextValue * nextUnit.factor
      } else {
        // 最小単位ならそのまま
        currentResult.totalSec += value * unit.factor
      }
    } else {
      currentResult.values[unit.id as TimeUnit] =
        (currentResult.values[unit.id as TimeUnit] ?? 0) + value
      currentResult.totalSec += value * unit.factor
    }

    if (hasHalf) {
      const nextUnitIndex = timeUnits.findIndex((u) => u.id === unit.id) + 1
      if (nextUnitIndex < timeUnits.length) {
        const nextUnit = timeUnits[nextUnitIndex]
        currentResult.values[nextUnit.id as TimeUnit] =
          (currentResult.values[nextUnit.id as TimeUnit] ?? 0) + 30
        currentResult.totalSec += 30 * nextUnit.factor
      }
    }
  }

  return results
}

/**
 * 時間表現（例: "2分30秒"）を秒数に置き換える
 */
export function replaceTimeExpressionsWithSeconds(input: string): string {
  const results = extractTimeExpressions(input)
  if (results.length === 0) return input

  let replaced = input
  for (const result of results) {
    replaced = replaced.replace(result.text, `${result.totalSec.toString()}秒`)
  }
  return replaced
}

/**
 * 秒数を「X時間Y分Z秒」の形式に変換
 */
export function formatSecondsToTimeString(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const parts: string[] = []
  if (h > 0) parts.push(`${h}時間`)
  if (m > 0) parts.push(`${m}分`)
  if (s > 0 || parts.length === 0) parts.push(`${s}秒`)

  return parts.join('')
}

/**
 * "3600秒" → "1時間" のように、秒表記を時間・分・秒に変換する
 */
export function replaceSecondsWithFormattedTime(input: string): string {
  return input.replace(/(\d+(?:\.\d+)?)秒/g, (_, secStr) => {
    const totalSec = Math.floor(parseFloat(secStr))
    return formatSecondsToTimeString(totalSec)
  })
}
