// usePersistedState.ts
import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { db } from './db'

interface UsePersistedStateSettings<T> {
  key: string
  initialValue: T
  debounceMs?: number
}

export function usePersistedState<T>({
  key,
  initialValue,
  debounceMs = 500,
}: UsePersistedStateSettings<T>) {
  const [value, setValue] = useState<T>(initialValue)

  // IndexedDBに保存（debounced）
  const saveToDB = useCallback(
    debounce(async (val: T) => {
      await db.input.put({ key, value: val })
    }, debounceMs),
    [key, debounceMs]
  )

  // 値を変更して保存も行う
  const updateValue = (val: T) => {
    setValue(val)
    saveToDB(val)
  }

  // 初期化時にDBから読み込み
  useEffect(() => {
    const load = async () => {
      const entry = await db.input.get(key)
      if (entry?.value !== undefined) {
        setValue(entry.value as T)
      }
    }
    load()
  }, [key])

  return [value, updateValue] as const
}
