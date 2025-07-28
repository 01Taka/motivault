// src/theme/palette/utils.ts
import type { PaletteMode } from '@mui/material'

// ModeDependentColor型定義（型安全性向上のため）
interface ModeDependentColor {
  light: string
  dark: string
}

// 型ガード: 効率化とシンプル化
function isModeDependentColor(obj: any): obj is ModeDependentColor {
  return (
    obj &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    typeof obj.light === 'string' &&
    typeof obj.dark === 'string' &&
    Object.keys(obj).length === 2
  )
}

/**
 * カスタムカラーオブジェクトから現在のモードに応じた色を抽出する再帰関数
 * @param colorDefinition カラー定義オブジェクト
 * @param mode パレットモード
 * @returns モードが適用されたカラーオブジェクト
 */
export function applyModeToColors<T extends Record<string, any>>(
  colorDefinition: T,
  mode: PaletteMode
): Record<string, any> {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(colorDefinition)) {
    if (isModeDependentColor(value)) {
      // ModeDependentColorの場合は直接モードの値を取得
      result[key] = value[mode]
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // ネストされたオブジェクトの場合、再帰的に処理
      result[key] = applyModeToColors(value, mode)
    } else {
      // プリミティブ値はそのまま代入
      result[key] = value
    }
  }

  return result
}
