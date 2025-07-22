// src/utils/japaneseTextConverters.ts
import { toHiragana, toKatakana } from 'wanakana'
import { createFilterOptions as muiCreateFilterOptions } from '@mui/material'

/**
 * 日本語文字列をひらがなとカタカナに変換したペアを返します。
 * 検索ロジックで利用することを想定しています。
 * @param text 変換する日本語文字列
 * @returns ひらがなとカタカナに変換された文字列のペア
 */
export const getJapaneseSearchForms = (text: string) => {
  const hiragana = toHiragana(text)
  const katakana = toKatakana(text)
  return { hiragana, katakana }
}

/**
 * 2つの日本語検索フォーム（ひらがな/カタカナ）が一致するかどうかを判定します。
 * ターゲット文字列が入力文字列を含む場合にtrueを返します。
 * @param targetForms 比較対象の文字列のひらがな/カタカナ形式
 * @param inputForms ユーザー入力のひらがな/カタカナ形式
 * @returns ターゲットが入力を含む場合はtrue、そうでない場合はfalse
 */
export const containsJapaneseForms = (
  targetForms: { hiragana: string; katakana: string },
  inputForms: { hiragana: string; katakana: string }
) => {
  return (
    targetForms.hiragana.includes(inputForms.hiragana) ||
    targetForms.katakana.includes(inputForms.katakana)
  )
}

/**
 * 日本語検索に対応したAutocompleteのfilterOptionsを生成します。
 * オプションの指定されたキー（文字列または文字列の配列）に基づいて、
 * ユーザー入力（ひらがな/カタカナ変換後）との部分一致を判定します。
 * @param searchKeys オプションが持つ検索対象のプロパティ名を指定します（例: ['label', 'keywords']）
 * @returns AutocompleteのfilterOptionsに直接渡せる関数
 */
export const createJapaneseFilterOptions = <T>(searchKeys: Array<keyof T>) => {
  // MUIのcreateFilterOptionsをベースにすることで、デフォルトの挙動（大文字小文字の区別など）も考慮できる
  // 現在は直接使用していませんが、必要に応じてカスタムロジックと組み合わせることができます。
  const defaultFilter = muiCreateFilterOptions<T>()

  return (options: T[], { inputValue }: { inputValue: string }) => {
    // 入力値をひらがなとカタカナの形式に変換
    const inputForms = getJapaneseSearchForms(inputValue)
    console.log(inputForms)

    /**
     * 単一の値（文字列または文字列の配列）が入力フォームと一致するかをチェックするヘルパー関数
     * @param value チェックする値
     * @returns 一致する場合はtrue、そうでない場合はfalse
     */
    const checkValueAgainstInput = (value: T[keyof T]): boolean => {
      if (typeof value === 'string') {
        const optionForms = getJapaneseSearchForms(value)
        return containsJapaneseForms(optionForms, inputForms)
      } else if (Array.isArray(value)) {
        // 配列の場合は各要素をチェック（keywordsの場合など）
        return value.some((item) => {
          // 配列の要素が文字列であることを想定
          if (typeof item === 'string') {
            const itemForms = getJapaneseSearchForms(item)
            return containsJapaneseForms(itemForms, inputForms)
          }
          return false
        })
      }
      return false // 文字列でも配列でもない場合はスキップ
    }

    const filtered = options.filter((option) => {
      // 検索キーに基づいてオプションをフィルタリング
      return searchKeys.some((key) => {
        const valueToSearch = option[key]
        return checkValueAgainstInput(valueToSearch)
      })
    })

    // 必要に応じて、カスタムフィルタリングの後にMUIのデフォルトフィルタリングを適用することもできます。
    // 例: return defaultFilter(filtered, { inputValue });

    return filtered
  }
}
