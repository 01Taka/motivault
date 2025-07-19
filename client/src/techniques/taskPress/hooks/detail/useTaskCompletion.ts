// src/hooks/useTaskCompletion.ts
import { useCallback } from 'react'
import type { MergedReportStep } from '../../types/task-press-merge-task-types'

export const useTaskCompletion = (
  initialState: number[] | MergedReportStep[],
  onCompletionChange: (updatedState: number[] | MergedReportStep[]) => void
) => {
  // For ProblemSet pages
  const togglePageCompletion = useCallback(
    (pageNumber: number) => {
      if (!Array.isArray(initialState) || typeof initialState[0] !== 'number') {
        console.error(
          'useTaskCompletion: initialState is not an array of numbers for page completion.'
        )
        return
      }
      const currentCompletedPages = initialState as number[]
      const updatedCompletedPages = currentCompletedPages.includes(pageNumber)
        ? currentCompletedPages.filter((p) => p !== pageNumber)
        : [...currentCompletedPages, pageNumber].sort((a, b) => a - b)
      onCompletionChange(updatedCompletedPages)
    },
    [initialState, onCompletionChange]
  )

  // For Report steps
  const toggleStepCompletion = useCallback(
    (stepIndex: number) => {
      if (
        !Array.isArray(initialState) ||
        typeof initialState[0] !== 'object' ||
        !('completed' in initialState[0])
      ) {
        console.error(
          'useTaskCompletion: initialState is not an array of MergedReportStep for step completion.'
        )
        return
      }
      const currentSteps = initialState as MergedReportStep[]
      const updatedSteps = currentSteps.map((step, idx) =>
        idx === stepIndex ? { ...step, completed: !step.completed } : step
      )
      onCompletionChange(updatedSteps)
    },
    [initialState, onCompletionChange]
  )

  return { togglePageCompletion, toggleStepCompletion }
}
