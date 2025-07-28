interface ModeDependentColor {
  light: string
  dark: string
}

// ネストされたカラーオブジェクト（'main', 'light', 'dark' などを含むことができる）
// ModeDependentColor と string の両方を許容することで柔軟性を確保
export interface NestedModeDependentColors {
  [key: string]: ModeDependentColor | string | NestedModeDependentColors
}

/**
 * applyModeToColors 関数によってモードが適用された後の型を定義します。
 * ModeDependentColor を string に変換し、ネストされたオブジェクトを再帰的に処理します。
 */
export type ThemedColors<T> = {
  [K in keyof T]: T[K] extends ModeDependentColor
    ? string // light/darkを持つオブジェクトはstringになる
    : T[K] extends Record<string, any> // ネストされたオブジェクトの場合（配列ではない）
      ? ThemedColors<T[K]> // 再帰的に処理
      : T[K] // それ以外の型はそのまま
}

/**
 * applyModeToColors 関数に渡す前の生のカラー定義の型を定義します。
 * ModeDependentColor はそのまま保持し、ネストされたオブジェクトを再帰的に処理します。
 */
export type RawColors<T> = {
  [K in keyof T]: T[K] extends ModeDependentColor
    ? ModeDependentColor // light/darkを持つオブジェクトはそのまま保持
    : T[K] extends Record<string, any> // ネストされたオブジェクトの場合（配列ではない）
      ? RawColors<T[K]> // 再帰的に処理
      : T[K] // それ以外の型はそのまま
}
