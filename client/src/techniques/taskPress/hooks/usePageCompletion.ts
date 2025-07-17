import { useState, useCallback, useMemo } from 'react'
import { debounce } from 'lodash'
import { getNextPages } from '../functions/task-press-task-utils'
import type { TaskPressMergedTask } from '../types/task-press-merge-task-types'

const DEFAULT_NEXT_PAGES_LENGTH = 3

const usePageCompletion = (
  task: TaskPressMergedTask,
  onPageComplete: (pages: number[]) => void
) => {
  const [completedPages, setCompletedPages] = useState<number[]>([])

  // ページ完了の遅延処理を管理するためのdebounce
  const debouncedCompletePages = useCallback(
    debounce((pages: number[]) => {
      onPageComplete(pages)
    }, 1000), // 1秒後に送信
    [onPageComplete]
  )

  const handlePageComplete = (delay: number, page: number) => {
    setTimeout(() => {
      setCompletedPages((prev) => {
        const newCompletedPages = [...prev, page]
        debouncedCompletePages(newCompletedPages) // 完了したページをdebounceで送信
        return newCompletedPages
      })
    }, delay)
  }

  const nextPages = useMemo(() => {
    return task.type === 'problemSet'
      ? getNextPages(
          task.pages,
          [...task.completedPages, ...completedPages],
          DEFAULT_NEXT_PAGES_LENGTH
        )
      : []
  }, [task, completedPages])

  return {
    nextPages,
    completedPages,
    handlePageComplete,
  }
}

export default usePageCompletion
