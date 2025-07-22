const kanjiDigitMap: Record<string, number> = {
  零: 0,
  〇: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
}

const numUnits: Record<string, number> = {
  万: 1e4,
  億: 1e8,
  兆: 1e12,
  京: 1e16,
  垓: 1e20,
  '𥝱': 1e24,
  秭: 1e24,
  穣: 1e28,
  溝: 1e32,
  澗: 1e36,
  正: 1e40,
  載: 1e44,
  極: 1e48,
  恒河沙: 1e52,
  阿僧祇: 1e56,
  那由他: 1e60,
  不可思議: 1e64,
  無量大数: 1e68,
}

const baseUnits: Record<string, number> = {
  十: 10,
  百: 100,
  千: 1000,
}

const allAllowedChars: Set<string> = new Set([
  ...Object.keys(kanjiDigitMap),
  ...Object.keys(numUnits),
  ...Object.keys(baseUnits),
  ...'0123456789.',
])

function validateInputCharacters(text: string): void {
  for (const char of text) {
    if (!allAllowedChars.has(char)) {
      throw new Error(`Invalid character found in input: '${char}'`)
    }
  }
}

function kanjiCharToDigit(char: string): number {
  if (kanjiDigitMap[char] !== undefined) {
    return kanjiDigitMap[char]
  }
  if (/^[0-9]$/.test(char)) {
    return parseInt(char, 10)
  }
  throw new Error(`'${char}' is not a valid digit character.`)
}

function parseSegment(segment: string): number {
  if (!segment) return 0
  let subTotal = 0
  let digitBuffer = ''
  let prevUnitValue = Infinity

  for (let i = 0; i < segment.length; i++) {
    const char = segment[i]
    if (char === '.') {
      if (digitBuffer.includes('.')) {
        throw new Error(
          `Multiple decimal points found in segment: '${segment}'`
        )
      }
      digitBuffer += '.'
    } else if (kanjiDigitMap[char] !== undefined || /[0-9]/.test(char)) {
      digitBuffer += `${kanjiCharToDigit(char)}`
    } else if (baseUnits[char] !== undefined) {
      const unitValue = baseUnits[char]
      if (unitValue >= prevUnitValue) {
        throw new Error(`Invalid order of base units in segment: '${segment}'`)
      }
      prevUnitValue = unitValue
      const numPart = digitBuffer ? parseFloat(digitBuffer) : 1
      if (isNaN(numPart)) {
        throw new Error(
          `Invalid number format before unit '${char}' in segment: '${segment}'`
        )
      }
      subTotal += numPart * unitValue
      digitBuffer = ''
    } else {
      throw new Error(`Unexpected character '${char}' in segment: '${segment}'`)
    }
  }

  if (digitBuffer) {
    const trailing = parseFloat(digitBuffer)
    if (isNaN(trailing)) {
      throw new Error(`Invalid trailing number format in segment: '${segment}'`)
    }
    subTotal += trailing
  }

  return subTotal
}

/**
 * 全角数字と全角ドットを半角に変換する
 *
 * @param text - 入力文字列
 * @returns 半角に正規化された文字列
 */
export function normalizeFullWidthNumbers(text: string): string {
  return text.replace(/[０-９．]/g, (char) => {
    // 全角ドット → 半角ドット
    if (char === '．') return '.'
    // 全角数字 → 半角数字
    return String.fromCharCode(char.charCodeAt(0) - 0xfee0)
  })
}

export function kanjiToNumber(text: string): number {
  if (typeof text !== 'string') {
    throw new TypeError('Input must be a string.')
  }
  if (!text) return 0
  const normalizedText = normalizeFullWidthNumbers(text)

  validateInputCharacters(normalizedText)

  let total = 0
  const unitPattern = Object.keys(numUnits)
    .map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const parts = normalizedText
    .split(new RegExp(`(${unitPattern})`))
    .filter((p) => p)

  let current = ''
  for (const part of parts) {
    if (numUnits[part] !== undefined) {
      const segVal = parseSegment(current)
      total += segVal * numUnits[part]
      current = ''
    } else {
      current += part
    }
  }
  if (current) {
    total += parseSegment(current)
  }
  return total
}

const kanjiDigitPattern =
  /[零〇一二三四五六七八九十百千万億兆京垓𥝱秭穣溝澗正載極恒河沙阿僧祇那由他不可思議無量大数0-9.]+/g

/**
 * 文字列の中から漢数字または数字を抜き出し、対応する数値に変換する。
 *
 * @param text - 入力文字列
 * @returns 抜き出された数値の配列
 */
export function extractAndConvertNumbers(text: string): number[] {
  const matches = text.match(kanjiDigitPattern)
  if (!matches) return []

  const results: number[] = []
  for (const match of matches) {
    try {
      const num = kanjiToNumber(match)
      results.push(num)
    } catch {
      console.error(match)
    }
  }
  return results
}

/**
 * 文字列中の漢数字・数字を変換し、その他はそのままにして返す。
 *
 * @param text - 入力文字列
 * @returns 数字部分を変換した文字列
 */
export function replaceNumbersInText(text: string): string {
  return text.replace(kanjiDigitPattern, (match) => {
    try {
      const num = kanjiToNumber(match)
      return String(num)
    } catch {
      return match // 変換できなかった場合はそのまま
    }
  })
}
