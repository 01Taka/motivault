// hooks/useAutoSaveEffectWithStatus.ts (New version, uses external status)
import { useEffect, useRef } from 'react'
import { debounce } from 'lodash'

export type AsyncStatus = 'idle' | 'loading' | 'error' | 'success'

interface Options<T> {
  delay?: number
  onSuccess?: (value: T) => void // These might be less useful here, as status is external
  onError?: (error: any) => void // but kept for consistency
}

export const useAutoSaveEffectWithStatus = <T>(
  value: T,
  triggerSaveFn: (value: T) => void, // synchronous trigger function
  asyncStatus: AsyncStatus, // external status
  options?: Options<T>
) => {
  const { delay = 500, onSuccess, onError } = options || {}
  const latestValue = useRef(value)
  const currentRequestId = useRef(0)

  useEffect(() => {
    latestValue.current = value
    const requestId = ++currentRequestId.current

    const handler = debounce(() => {
      // Only trigger saveFn if not already loading, or if the status allows re-triggering
      if (
        asyncStatus === 'idle' ||
        asyncStatus === 'error' ||
        asyncStatus === 'success'
      ) {
        try {
          triggerSaveFn(latestValue.current)
          // onSuccess/onError for the *completion* of the save will come from
          // changes to asyncStatus, not from this immediate call.
        } catch (e) {
          // Handle synchronous errors from triggerSaveFn itself
          if (requestId === currentRequestId.current) {
            onError?.(e)
          }
        }
      }
    }, delay)

    handler()

    return () => handler.cancel()
  }, [value, delay, asyncStatus, triggerSaveFn, onError]) // Include all dependencies

  // Optional: React to external status changes if you want to call onSuccess/onError from here
  useEffect(() => {
    if (
      asyncStatus === 'success' &&
      currentRequestId.current === currentRequestId.current
    ) {
      onSuccess?.(latestValue.current)
    } else if (
      asyncStatus === 'error' &&
      currentRequestId.current === currentRequestId.current
    ) {
      // You might need a way to pass the actual error from the external process
      onError?.(new Error('External save operation reported an error.'))
    }
  }, [asyncStatus, onSuccess, onError])
}
