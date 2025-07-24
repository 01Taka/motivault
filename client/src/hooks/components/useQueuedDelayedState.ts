import { useState, useRef, useCallback } from 'react'

type SetValue<T> = (value: T | ((prev: T) => T), delay?: number) => void

type DelayedStateControl = {
  cancelAll: () => void
  pendingCount: number
}

function useQueuedDelayedState<T>(
  initialValue: T
): [T, SetValue<T>, DelayedStateControl] {
  const [value, setValue] = useState<T>(initialValue)
  const queueRef = useRef<{ timeoutId: NodeJS.Timeout; value: T }[]>([])
  const countRef = useRef(0)

  const setDelayedValue: SetValue<T> = useCallback(
    (newValue, delay = 0) => {
      let resolvedValue: T

      if (typeof newValue === 'function') {
        resolvedValue = (newValue as (prev: T) => T)(value)
      } else {
        resolvedValue = newValue
      }

      const timeoutId = setTimeout(() => {
        setValue(resolvedValue)
        countRef.current--
        queueRef.current = queueRef.current.filter(
          (entry) => entry.timeoutId !== timeoutId
        )
      }, delay)

      queueRef.current.push({ timeoutId, value: resolvedValue })
      countRef.current++
    },
    [value]
  )

  const cancelAll = useCallback(() => {
    queueRef.current.forEach((entry) => clearTimeout(entry.timeoutId))
    queueRef.current = []
    countRef.current = 0
  }, [])

  return [
    value,
    setDelayedValue,
    {
      cancelAll,
      pendingCount: countRef.current,
    },
  ]
}

export default useQueuedDelayedState
