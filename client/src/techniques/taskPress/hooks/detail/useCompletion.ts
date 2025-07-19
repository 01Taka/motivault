import { useMemo, useCallback, useState } from 'react'

/**
 * A record of differences in completion states, where the key is the item's identifier
 * and the value indicates its current completion status (true for completed, false for incomplete).
 */
type CompletionDifferences = Record<string, boolean>

/**
 * Parameters for the `useCompletion` hook.
 */
interface UseCompletionParams {
  /**
   * An array of all available item identifiers.
   */
  items: (string | number)[]
  /**
   * An array of item identifiers that are initially marked as completed.
   */
  completedItems: (string | number)[]
}

/**
 * Represents the state of a single item.
 */
interface ItemState {
  /**
   * The unique identifier of the item.
   */
  id: string | number
  /**
   * Indicates whether the item is currently marked as completed.
   */
  isCompleted: boolean
}

/**
 * The result object returned by the `useCompletion` hook.
 */
interface UseCompletionResult {
  /**
   * An array of `ItemState` objects, representing the current completion status of all items.
   */
  items: ItemState[]
  /**
   * Toggles the completion status of a specific item.
   * @param id The identifier of the item to toggle.
   */
  toggleCompletion: (id: string | number) => void
  /**
   * A record of current differences in completion states compared to the `completedItems` prop.
   */
  completionDifferences: CompletionDifferences
  /**
   * Resets all recorded completion differences, reverting items to their `completedItems` status.
   */
  resetDifferences: () => void
  /**
   * Sets the completion status for all items.
   * @param completed If true, all items will be marked as completed; otherwise, all will be marked as incomplete.
   */
  setAllCompletion: (completed: boolean) => void
}

/**
 * A custom React hook for managing the completion status of a collection of items.
 * It allows tracking changes to completion states independently of an initial completed list,
 * providing features to toggle individual item completion, reset changes, and set all items' completion status.
 *
 * @param {UseCompletionParams} params - The parameters for the hook, including all items and initially completed items.
 * @returns {UseCompletionResult} An object containing the current item states, functions to manipulate completion, and difference tracking.
 */
export function useCompletion({
  items,
  completedItems,
}: UseCompletionParams): UseCompletionResult {
  const [completionDifferences, setCompletionDifferences] =
    useState<CompletionDifferences>({})

  const itemStates = useMemo<ItemState[]>(() => {
    return items.map((item) => {
      const key = item.toString()
      const isInDiff = key in completionDifferences
      const isOriginallyCompleted = completedItems.includes(item)

      return {
        id: item,
        isCompleted: isInDiff
          ? completionDifferences[key]
          : isOriginallyCompleted,
      }
    })
  }, [items, completedItems, completionDifferences])

  const toggleCompletion = useCallback(
    (id: string | number) => {
      if (!items.includes(id)) return

      const key = id.toString()
      const isOriginallyCompleted = completedItems.includes(id)

      setCompletionDifferences((prev) => {
        const updated = { ...prev }

        if (key in updated) {
          // If a difference already exists for this item, remove it to revert to original state
          delete updated[key]
        } else {
          // If no difference exists, record the new state (opposite of original)
          updated[key] = !isOriginallyCompleted
        }

        return updated
      })
    },
    [items, completedItems]
  )

  const resetDifferences = useCallback(() => {
    setCompletionDifferences({})
  }, [])

  const setAllCompletion = useCallback(
    (completed: boolean) => {
      setCompletionDifferences(() => {
        const newDiffs: CompletionDifferences = {}

        for (const item of items) {
          const isOriginallyCompleted = completedItems.includes(item)
          const shouldChange = completed !== isOriginallyCompleted

          if (shouldChange) {
            newDiffs[item.toString()] = completed
          }
        }

        return newDiffs
      })
    },
    [items, completedItems]
  )

  return {
    items: itemStates,
    toggleCompletion,
    completionDifferences,
    resetDifferences,
    setAllCompletion,
  }
}
