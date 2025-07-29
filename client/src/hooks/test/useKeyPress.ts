import { useEffect, useState, useCallback } from 'react'

type KeyHandler = (key: string, isPressed: boolean) => void

export const useKeyPress = (
  targetKeys: string | string[],
  callback?: KeyHandler
): Record<string, boolean> => {
  const [keyStates, setKeyStates] = useState<Record<string, boolean>>(() => {
    const initialStates: Record<string, boolean> = {}
    const keysArray = Array.isArray(targetKeys) ? targetKeys : [targetKeys]
    keysArray.forEach((key) => {
      initialStates[key] = false
    })
    return initialStates
  })

  const keysToWatch = Array.isArray(targetKeys) ? targetKeys : [targetKeys]

  // Memoize the handlers to prevent unnecessary re-creations
  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (keysToWatch.includes(key)) {
        setKeyStates((prevStates) => {
          if (!prevStates[key]) {
            // Only update if state actually changes
            const newStates = { ...prevStates, [key]: true }
            callback?.(key, true) // Call the callback if provided
            return newStates
          }
          return prevStates
        })
      }
    },
    [keysToWatch, callback]
  )

  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (keysToWatch.includes(key)) {
        setKeyStates((prevStates) => {
          if (prevStates[key]) {
            // Only update if state actually changes
            const newStates = { ...prevStates, [key]: false }
            callback?.(key, false) // Call the callback if provided
            return newStates
          }
          return prevStates
        })
      }
    },
    [keysToWatch, callback]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [downHandler, upHandler])

  return keyStates
}
