import { useRef, useEffect } from 'react'

/**
 * オブジェクトの変更点を検出するヘルパー関数
 * @param oldObj 変更前のオブジェクト
 * @param newObj 変更後のオブジェクト
 * @returns 変更されたプロパティとその新しい値を含むオブジェクト
 */
const getChangedProperties = <T extends Record<string, any>>(
  oldObj: T,
  newObj: T
): Partial<T> => {
  const changed: Partial<T> = {}

  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      // oldObjに同じキーがない、または値が異なる場合
      if (
        !Object.prototype.hasOwnProperty.call(oldObj, key) ||
        oldObj[key] !== newObj[key]
      ) {
        changed[key] = newObj[key] // 変更されたキーと新しい値を記録
      }
    }
  }

  // oldObjにあってnewObjにない（削除された）プロパティも考慮する場合
  for (const key in oldObj) {
    if (Object.prototype.hasOwnProperty.call(oldObj, key)) {
      if (!Object.prototype.hasOwnProperty.call(newObj, key)) {
        changed[key] = undefined // あるいは特別な値（例: 'DELETED'）を設定
      }
    }
  }

  return changed
}

/**
 * オブジェクトの変更を監視し、変更があった場合にコールバックを実行するカスタムフック
 *
 * @template T 監視対象オブジェクトの型
 * @param {T} targetObject 監視対象のオブジェクト
 * @param {(changes: Partial<T>) => void} callback 変更があったときに呼び出される関数 (引数: 変更されたプロパティのオブジェクト)
 */
const useObjectChanges = <T extends Record<string, any>>(
  targetObject: T,
  callback: (changes: Partial<T>) => void
) => {
  // useRefに型引数を渡して、参照される値の型を明示
  const previousObjectRef = useRef<T | undefined>(targetObject)

  useEffect(() => {
    // previousObjectRef.current が undefined でないことを確認
    if (previousObjectRef.current !== undefined) {
      const changedProperties = getChangedProperties(
        previousObjectRef.current,
        targetObject
      )

      if (Object.keys(changedProperties).length > 0) {
        callback(changedProperties)
      }
    }
    // 現在のオブジェクトを次回の比較のために保存
    previousObjectRef.current = targetObject
  }, [targetObject, callback])
}

export default useObjectChanges
