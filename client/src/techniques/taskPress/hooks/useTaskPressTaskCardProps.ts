import { useMemo, useState, useCallback } from 'react'
import {
  getRemainingDays,
  getDailyEstimatedTime,
  getRemainingItemCount,
} from '../functions/task-press-task-utils'
import type {
  MergedReportStep,
  TaskPressMergedTask,
} from '../types/task-press-merge-task-types'
import useDelayedRemovalArray from '../../../hooks/components/useDelayedRemovalArray'

interface UseTaskPressTaskCardProps {
  task: TaskPressMergedTask
}

const DEFAULT_NEXT_PAGES_LENGTH = 3

const useTaskPressTaskCardProps = ({ task }: UseTaskPressTaskCardProps) => {
  // Manages pages that are currently animating their completion.
  const { items: animatingPages, addItems: addAnimatingPages } =
    useDelayedRemovalArray<number>()

  // Manages steps that are currently animating their completion.
  const { items: animatingSteps, addItems: addAnimatingSteps } =
    useDelayedRemovalArray<MergedReportStep>()

  // Caches page numbers that have been marked as completed.
  const [completedPagesCache, setCompletedPagesCache] = useState<number[]>([])
  // Caches the 'order' property of steps that have been marked as completed.
  const [completedStepOrdersCache, setCompletedStepOrdersCache] = useState<
    number[]
  >([])

  /**
   * Handles the completion of one or more pages.
   * Adds pages to animation queue and updates the completed pages cache.
   * @param delay The delay for animation removal.
   * @param pages The page numbers that are completed.
   */
  const handlePageComplete = useCallback(
    (delay: number, pages: number[]) => {
      addAnimatingPages(pages, delay)
      setCompletedPagesCache((prev) => {
        // Filter out pages already in the cache to avoid duplicates.
        const newPages = pages.filter((page) => !prev.includes(page))
        return [...prev, ...newPages]
      })
    },
    [addAnimatingPages]
  )

  /**
   * Handles the completion of one or more steps.
   * Adds steps to animation queue and updates the completed step orders cache.
   * @param delay The delay for animation removal.
   * @param steps The steps that are completed.
   */
  const handleStepComplete = useCallback(
    (delay: number, steps: MergedReportStep[]) => {
      addAnimatingSteps(steps, delay)
      setCompletedStepOrdersCache((prev) => {
        // Filter out step orders already in the cache to avoid duplicates.
        const newStepOrders = steps
          .filter((step) => !prev.includes(step.order))
          .map((step) => step.order)
        return [...prev, ...newStepOrders]
      })
    },
    [addAnimatingSteps]
  )

  /**
   * Determines the next set of pages to display, considering completed and animating pages.
   */
  const nextPages = useMemo(() => {
    // Only 'problemSet' tasks have pages.
    if (task.type !== 'problemSet') {
      return []
    }

    const taskPages = task.pages || [] // Ensure it's an array
    const incompletePages = taskPages.filter(
      (page) =>
        !task.completedPages.includes(page) &&
        !completedPagesCache.includes(page)
    )

    // Combine animating and incomplete pages, then sort them for consistent order.
    const displayPages = [...animatingPages, ...incompletePages].sort(
      (a, b) => a - b
    )

    // Return a slice based on the default display length.
    return displayPages.slice(0, DEFAULT_NEXT_PAGES_LENGTH) // Changed slice end for "next" pages
  }, [task, completedPagesCache, animatingPages])

  /**
   * Determines the next incomplete step to display, prioritizing animating steps.
   */
  const nextStep = useMemo(() => {
    // If there are steps currently animating, the first one is considered the next step.
    if (animatingSteps.length > 0) {
      return animatingSteps[0]
    }

    // Only 'report' tasks have steps.
    if (task.type !== 'report') {
      return null
    }

    // Find the first incomplete step that hasn't been completed or isn't currently animating.
    const incompleteSteps = task.steps.filter(
      (step) =>
        !step.completed && !completedStepOrdersCache.includes(step.order)
    )

    return incompleteSteps.length > 0 ? incompleteSteps[0] : null
  }, [task, animatingSteps, completedStepOrdersCache])

  const remainingDays = useMemo(
    () => getRemainingDays(task.deadline),
    [task.deadline]
  )

  const dailyEstimatedTime = useMemo(
    () =>
      Math.round(
        getDailyEstimatedTime(
          task,
          remainingDays > 0 ? remainingDays : 1, // Ensure remainingDays is at least 1 to avoid division by zero
          completedPagesCache,
          completedStepOrdersCache
        )
      ),
    [task, remainingDays, completedPagesCache, completedStepOrdersCache]
  )

  const remainingCount = useMemo(() => {
    return getRemainingItemCount(
      task,
      completedPagesCache,
      completedStepOrdersCache
    )
  }, [task, completedPagesCache, completedStepOrdersCache])

  return {
    animatingPages,
    animatingSteps,
    nextPages,
    nextStep,
    completedPagesCache,
    completedStepOrdersCache,
    remainingDays,
    dailyEstimatedTime,
    remainingCount,
    handlePageComplete,
    handleStepComplete,
  }
}

export default useTaskPressTaskCardProps
