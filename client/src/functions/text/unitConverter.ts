import { unitIdToLabelMap, unitMap } from './unit-constants'

// カタカナ→ひらがな変換 + 小文字変換
function convertToNormalizedHiragana(input: string): string {
  return input
    .replace(/[\u30A1-\u30F6]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0x60)
    )
    .toLowerCase()
}

const toHalfWidth = (str: string): string => {
  return str
    .replace(/[！-～]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/　/g, ' ') // 全角スペースも半角に
}

const katakanaToHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  )
}

// ひらがなをカタカナに変換するヘルパー関数
const hiraganaToKatakana = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) + 0x60)
  )
}

// 単位を正規化してIDを取得
export function normalizeUnit(input: string): string | null {
  const normalizedInput = convertToNormalizedHiragana(input.trim())
  return unitMap[normalizedInput] ?? null
}

// 単位IDから表示用ラベルに変換
export function getUnitLabel(unitId: string): string | null {
  return unitIdToLabelMap[unitId] ?? null
}

// 正規表現用エスケープ関数
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function extractUnitsWithValues(
  input: string
): { value: number; unit: string }[] {
  const normalizedInput = convertToNormalizedHiragana(input.trim())
  const results: { value: number; unit: string }[] = []

  // 数字（全角含む）+ 小数点 + 空白 + 単位キー の正規表現
  const unitKeys = Object.keys(unitMap)
    .map(escapeRegex)
    .sort((a, b) => b.length - a.length)
  const unitPattern = unitKeys.join('|')

  // 数字部：小数点（全角 or 半角）含む
  const regex = new RegExp(
    `([０-９0-9]+(?:[．.][０-９0-9]+)?)\\s*(${unitPattern})`,
    'g'
  )

  let match: RegExpExecArray | null
  while ((match = regex.exec(normalizedInput)) !== null) {
    const rawValue = match[1]
    const unitText = match[2]
    const unitId = unitMap[unitText]

    if (unitId) {
      // 全角数字 + 全角ドット → 半角
      const normalizedValue = rawValue.replace(/[０-９．]/g, (d) => {
        if (d === '．') return '.'
        return String.fromCharCode(d.charCodeAt(0) - 0xfee0)
      })

      const value = parseFloat(normalizedValue)

      results.push({ value, unit: unitId })
    }
  }

  return results
}

const generateUnitPattern = (): string => {
  const allUnitVariations = new Set<string>()

  Object.keys(unitMap).forEach((key) => {
    // 既存のキーをそのまま追加
    allUnitVariations.add(key)

    // 全角半角変換
    allUnitVariations.add(toHalfWidth(key))
    allUnitVariations.add(
      key.replace(/[!-~]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) + 0xfee0)
      )
    ) // 半角を全角に

    // 大文字小文字変換
    allUnitVariations.add(key.toLowerCase())
    allUnitVariations.add(key.toUpperCase())

    // カタカナ・ひらがな相互変換
    allUnitVariations.add(katakanaToHiragana(key))
    allUnitVariations.add(hiraganaToKatakana(key))

    // さらに、全角化したものをひらがな/カタカナ変換するケース
    allUnitVariations.add(
      katakanaToHiragana(
        key.replace(/[!-~]/g, (s) =>
          String.fromCharCode(s.charCodeAt(0) + 0xfee0)
        )
      )
    )
    allUnitVariations.add(
      hiraganaToKatakana(
        key.replace(/[!-~]/g, (s) =>
          String.fromCharCode(s.charCodeAt(0) + 0xfee0)
        )
      )
    )
  })

  // 長いパターンから先にマッチするようにソート
  const sortedUnitKeys = Array.from(allUnitVariations)
    .filter((s) => s.length > 0) // 空文字列を除外
    .map(escapeRegex)
    .sort((a, b) => b.length - a.length)

  return sortedUnitKeys.join('|')
}

/**
 * 入力文字列中の「数値＋単位」を検出し、正規化された単位ラベルに置き換える
 *
 * @param input - 元の文字列
 * @returns 単位が正規化された文字列
 */
export function replaceUnitsWithNormalizedLabels(input: string): {
  match: { value: string; unit: string }[]
  normalizedText: string
} {
  // Helper to convert full-width alphanumeric to half-width
  const fullWidthToHalfWidth = (str: string) => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (match) {
      return String.fromCharCode(match.charCodeAt(0) - 0xfee0)
    })
  }

  const unitPattern = generateUnitPattern()
  const regex = new RegExp(`([０-９0-9]+)\\s*(${unitPattern})`, 'g')
  const result: {
    match: { value: string; unit: string }[]
    normalizedText: string
  } = { match: [], normalizedText: '' }

  input.replace(regex, (match, rawValue, unitText) => {
    // 1. 単位テキストを半角に変換
    let processedUnitText = fullWidthToHalfWidth(unitText)
    // 2. 単位テキストを小文字に変換
    processedUnitText = processedUnitText.toLowerCase()
    // 3. 単位テキストをカタカナからひらがなに変換
    processedUnitText = convertToNormalizedHiragana(processedUnitText)

    const unitId = unitMap[processedUnitText] // Use the processed text for lookup

    const label = getUnitLabel(unitId)

    if (!label) return match // If no label found for the normalized unit, return original match

    // 数値を全角から半角に変換
    const halfWidthValue = rawValue.replace(/[０-９]/g, (d: string) =>
      String.fromCharCode(d.charCodeAt(0) - 0xfee0)
    )

    result.match.push({ value: rawValue, unit: unitText })
    result.normalizedText = `${halfWidthValue}${label}`

    return `${halfWidthValue}${label}`
  })

  return result
}
