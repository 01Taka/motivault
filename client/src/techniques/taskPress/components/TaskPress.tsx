import React, { useMemo, useState } from 'react'
import TaskPressTaskList from './list/TaskPressTaskList'
import { mergeTasksWithTemplates } from '../functions/task-press-merge-task'
import useTaskPressCrudHandler from '../services/hooks/useTaskPressCrudHandler'
import Popup from '../../../components/utils/Popup'
import TaskDetailScreen from './detail/TaskDetailScreen'
import { MINUTES_IN_MS } from '../../../constants/datetime-constants'
import useBatchedDebouncedCallback from '../../../hooks/components/useDebouncedCallback'
import { useTaskPressDataStore } from '../services/stores/useTaskPressDataStore'

interface TaskPressProps {}

function separateByCompletionStatus(data: Record<string, boolean>): {
  completed: string[]
  uncompleted: string[]
} {
  const completed: string[] = []
  const uncompleted: string[] = []

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (data[key] === true) {
        completed.push(key)
      } else {
        uncompleted.push(key)
      }
    }
  }

  return { completed, uncompleted }
}

const TaskPress: React.FC<TaskPressProps> = ({}) => {
  const { tasks, templates } = useTaskPressDataStore()
  const mergedTasks = useMemo(() => {
    const result = mergeTasksWithTemplates(tasks, templates)
    return result.successfulMerges
  }, [tasks, templates])

  const [isShowingDetail, setIsShowingDetail] = useState(false)
  const [showingDetailTaskId, setShowingDetailTaskId] = useState<string | null>(
    null
  )
  const [completionDiffs, setCompletionDiffs] = useState<
    Record<string, boolean>
  >({})

  const showingDetailTask = useMemo(() => {
    if (showingDetailTaskId) {
      return (
        mergedTasks.find((task) => task.taskDocId === showingDetailTaskId) ??
        null
      )
    }
    return null
  }, [showingDetailTaskId, mergedTasks])

  const { updateCompletedPages, updateCompletedStepOrders, handleUpdate } =
    useTaskPressCrudHandler()

  const callBatchDebounce = useBatchedDebouncedCallback<[number]>(
    ({ debounceKey, debounceType, mergedArgs }) => {
      const values = mergedArgs[0]
      if (debounceKey && values) {
        if (debounceType === 'problemSet' && debounceKey && values) {
          updateCompletedPages(debounceKey, values)
        } else {
          updateCompletedStepOrders(debounceKey, values)
        }
      }
    },
    { delays: { problemSet: 1500, report: 2000 } }
  )

  const subjects = ['数学', '英語', '物理', '化学']

  const handleCloseDetail = () => {
    if (!showingDetailTask) return
    setIsShowingDetail(false)
    const { completed, uncompleted } =
      separateByCompletionStatus(completionDiffs)
    if (completed.length === 0 && uncompleted.length === 0) return

    const completedNumber = completed.map((data) => Number(data))
    const uncompletedNumber = uncompleted.map((data) => Number(data))

    if (showingDetailTask.type === 'problemSet') {
      updateCompletedPages(
        showingDetailTask.taskDocId,
        completedNumber,
        uncompletedNumber
      )
    } else {
      console.log(completedNumber, uncompletedNumber)

      updateCompletedStepOrders(
        showingDetailTask.taskDocId,
        completedNumber,
        uncompletedNumber
      )
    }
  }

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
        onEdit={(task) => {
          setIsShowingDetail(true)
          setShowingDetailTaskId(task.taskDocId)
        }}
      />

      <Popup open={isShowingDetail} onClose={handleCloseDetail}>
        {showingDetailTask && (
          <TaskDetailScreen
            task={showingDetailTask}
            subjects={subjects}
            onUpdateTask={(update) => {
              handleUpdate(
                showingDetailTask.taskDocId,
                showingDetailTask.templateDocId,
                {
                  ...update,
                  timePerPage: update.timePerPage
                    ? Number(update.timePerPage) * MINUTES_IN_MS
                    : undefined,
                }
              )
            }}
            onCompletionDifferencesChange={(diff) => setCompletionDiffs(diff)}
          />
        )}
      </Popup>
    </div>
  )
}

export default TaskPress
