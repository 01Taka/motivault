/**
 * Autocompleteのオプションの基本構造。
 * Tはオプションが保持する追加のデータ型です。
 */
export interface AutocompleteOption<T = Record<string, unknown>> {
  label: string
  keywords: string[]
  data?: T // 任意の追加データを格納するプロパティ
}
