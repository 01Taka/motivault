import React, { useMemo } from 'react'
import TaskPressTaskList from './TaskPressTaskList'
import { mergeTasksWithTemplates } from '../functions/task-press-merge-task'
import useBatchedDebouncedCallback from '../../../hooks/components/useDebouncedCallback'
import useTaskPressCrudHandler from '../services/hooks/useTaskPressCrudHandler'
import { useTaskPressStore } from '../services/stores/useTaskPressStore'

interface TaskPressProps {}

const TaskPress: React.FC<TaskPressProps> = ({}) => {
  const { tasks, templates } = useTaskPressStore()
  const mergedTasks = useMemo(() => {
    try {
      return mergeTasksWithTemplates(tasks, templates)
    } catch {
      return []
    }
  }, [tasks, templates])

  const { pushCompletedPages, pushCompletedStepOrders } =
    useTaskPressCrudHandler()

  const callBatchDebounce = useBatchedDebouncedCallback<[number]>(
    ({ debounceKey, debounceType, mergedArgs }) => {
      const values = mergedArgs[0]
      if (debounceKey && values) {
        if (debounceType === 'problemSet' && debounceKey && values) {
          pushCompletedPages(debounceKey, values)
        } else {
          pushCompletedStepOrders(debounceKey, values)
        }
      }
    },
    { delays: { problemSet: 1500, report: 2000 } }
  )

  return (
    <div>
      <TaskPressTaskList
        tasks={mergedTasks}
        onPageComplete={(task, page) =>
          callBatchDebounce({
            debounceKey: task.taskDocId,
            debounceType: task.type,
            args: [page],
          })
        }
        onCompleteStep={(task, step) =>
          callBatchDebounce({
            debounceKey: task.taskDocId,
            debounceType: task.type,
            args: [step.order],
          })
        }
        onEdit={() => {}}
      />
    </div>
  )
}

export default TaskPress
