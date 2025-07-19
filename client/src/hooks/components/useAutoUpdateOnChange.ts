import { useEffect } from 'react'
import { debounce } from 'lodash'

export const useAutoUpdateOnChange = <T>(
  value: T,
  onDebouncedChange: (value: T) => void,
  delay = 500
) => {
  useEffect(() => {
    const handler = debounce(() => {
      onDebouncedChange(value)
    }, delay)

    handler()
    return () => handler.cancel()
  }, [value, delay, onDebouncedChange])
}
