import { useState, useEffect, useMemo } from 'react'
import { debounce } from 'lodash'
import { db } from './db'

interface UsePersistedStateSettings<T> {
  key: string
  initialValue: T
  debounceMs?: number
  onReady?: (value: T) => void
}

export function usePersistedState<T>({
  key,
  initialValue,
  debounceMs,
  onReady,
}: UsePersistedStateSettings<T>) {
  const [value, setValue] = useState<T>(initialValue)

  const saveFn = useMemo(() => {
    const fn = async (val: T) => {
      await db.input.put({ key, value: val })
    }
    return debounceMs ? debounce(fn, debounceMs) : fn
  }, [key, debounceMs])

  const updateValue = (valOrUpdater: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next =
        typeof valOrUpdater === 'function'
          ? (valOrUpdater as (prev: T) => T)(prev)
          : valOrUpdater
      saveFn(next)
      return next
    })
  }

  const deleteKey = async () => {
    if (typeof (saveFn as any).cancel === 'function') {
      ;(saveFn as any).cancel()
    }
    await db.input.delete(key)
    setValue(initialValue)
  }

  useEffect(() => {
    const load = async () => {
      const entry = await db.input.get(key)
      if (entry?.value !== undefined) {
        setValue(entry.value as T)
        onReady?.(entry.value as T)
      } else {
        onReady?.(initialValue)
      }
    }
    load()
  }, [key, initialValue])

  return [value, updateValue, deleteKey] as const
}
