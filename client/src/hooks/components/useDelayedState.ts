import { useEffect, useRef, useState } from 'react'

/**
 * Options for delaying a state update.
 */
type DelayOptions = {
  /**
   * The delay in milliseconds before the state update is applied.
   * If not provided, the `defaultDelay` from `UseDelayedStateOptions` will be used.
   */
  delay?: number
}

/**
 * A function to set the new state value, optionally with a specific delay.
 * @template T The type of the state.
 * @param newValue The new value to set the state to.
 * @param options Optional settings for the delay of this specific update.
 */
type SetValue<T> = (newValue: T, options?: DelayOptions) => void

/**
 * Options for the `useDelayedState` hook.
 * @template T The type of the state.
 */
type UseDelayedStateOptions<T> = {
  /**
   * The default delay in milliseconds for state updates. Defaults to 0.
   */
  defaultDelay?: number
  /**
   * An array of keys from the state object to watch for changes.
   * If any of these keys change their value in `currentRef.current` compared to the
   * current `state`, an update will be triggered for that specific key after `defaultDelay`.
   * This is implemented via polling.
   */
  watchKeys?: (keyof NonNullable<T>)[]

  pollingInterval?: number
  /**
   * Keys to update immediately without delay when detected as changed.
   */
  realtimeKeys?: (keyof NonNullable<T>)[]
}

/**
 * A custom React hook that provides a state variable and a function to update it
 * with an optional delay. It also supports watching specific keys within an object state
 * for changes and applying them after a delay.
 *
 * This hook is useful for scenarios where you want to debounce state updates
 * or introduce a controlled delay in reflecting state changes in your UI.
 *
 * @template T The type of the state managed by the hook.
 * @param initialValue The initial value of the state.
 * @param options Configuration options for the hook, including default delay and keys to watch.
 * @returns An array containing:
 * - The current state value.
 * - A `setValue` function to update the state, with an optional per-call delay.
 *
 * @example
 * // Basic usage with a default delay
 * const [count, setCount] = useDelayedState(0, { defaultDelay: 500 });
 * // ... inside a component
 * <button onClick={() => setCount(count + 1)}>Increment (delayed by 500ms)</button>
 *
 * @example
 * // Setting a specific delay for an update
 * const [message, setMessage] = useDelayedState("Hello");
 * // ... inside a component
 * <button onClick={() => setMessage("Goodbye", { delay: 1000 })}>Change Message (delayed by 1000ms)</button>
 *
 * @example
 * // Watching specific keys in an object state
 * type UserProfile = { name: string; age: number; };
 * const [user, setUser] = useDelayedState<UserProfile>(
 * { name: "John Doe", age: 30 },
 * { defaultDelay: 300, watchKeys: ["name", "age"] }
 * );
 * // If `user.currentRef.current.name` changes externally (e.g., via a direct mutation
 * // outside of `setValue`, though generally discouraged), this hook will detect it
 * // and update the `name` property in the component's state after 300ms.
 */
export function useDelayedState<T>(
  initialValue: T,
  options: UseDelayedStateOptions<T> = {}
): [T, SetValue<T>] {
  const {
    defaultDelay = 0,
    watchKeys = [],
    realtimeKeys = [],
    pollingInterval = 50,
  } = options

  const [state, setState] = useState<T>(initialValue)
  const currentRef = useRef<T>(initialValue)
  const queueRef = useRef<number[]>([])

  // ID counter for each delayed update
  const updateId = useRef(0)

  const setValue: SetValue<T> = (newValue, { delay } = {}) => {
    const effectiveDelay = delay ?? defaultDelay
    const id = updateId.current++
    queueRef.current.push(id)

    setTimeout(() => {
      // apply only if still in queue
      if (queueRef.current.includes(id)) {
        currentRef.current = newValue
        setState(newValue)
        queueRef.current = queueRef.current.filter((q) => q !== id)
      }
    }, effectiveDelay)
  }

  // Watch for changes in specific keys (if object)
  // This MutationObserver block seems to be a placeholder as it's not fully implemented
  // to react to specific property changes in a generic object without specific proxy setups.
  // The `watchKeys` useEffect below handles the polling for key changes.
  useEffect(() => {
    if (typeof initialValue !== 'object' || initialValue === null) return

    const observer = new MutationObserver(() => {
      // Note: this won't catch deep changes; only works in specific setups (e.g. with proxies)
    })

    return () => observer.disconnect()
  }, [])

  // Watch keys manually (polling alternative)
  useEffect(() => {
    if (!watchKeys.length) return

    const interval = setInterval(() => {
      const curr = currentRef.current
      if (curr == null || state == null) return

      const safeCurr = curr as NonNullable<T>
      const safeState = state as NonNullable<T>
      const updates: Partial<NonNullable<T>> = {}

      for (const key of watchKeys) {
        if (safeCurr[key] !== safeState[key]) {
          updates[key] = safeCurr[key]
        }
      }

      if (Object.keys(updates).length) {
        for (const key of Object.keys(updates) as (keyof NonNullable<T>)[]) {
          const val = safeCurr[key]
          const id = updateId.current++
          queueRef.current.push(id)

          const isRealtime =
            realtimeKeys?.includes(key as keyof NonNullable<T>) ?? false

          const delay = isRealtime ? 0 : defaultDelay

          setTimeout(() => {
            if (queueRef.current.includes(id)) {
              setState((prev) => ({
                ...prev,
                [key]: val,
              }))
              queueRef.current = queueRef.current.filter((q) => q !== id)
            }
          }, delay)
        }
      }
    }, pollingInterval)

    return () => clearInterval(interval)
  }, [watchKeys, realtimeKeys, pollingInterval, defaultDelay, state])

  return [state, setValue]
}
