import { useEffect, useState, useCallback } from 'react'
import { useCurrentUserStore } from '../../../stores/user/currentUserStore'
import type {
  TimeBlockingTaskRead,
  TimeBlockingTaskWrite,
} from './documents/task-documents'
import type {
  TimeBlockingRead,
  TimeBlockingTag,
} from './documents/time-blocking-document'

const useTimeBlockingTask = () => {
  const { uid } = useCurrentUserStore()
  const [tasks, _setTasks] = useState<TimeBlockingTaskRead[]>([])
  const [doc, _setDoc] = useState<TimeBlockingRead | null>(null)
  const [loading, setLoading] = useState(true)

  const reloadTasks = useCallback(async () => {
    if (!uid) {
      console.error('UID is null')
      return
    }

    setLoading(true)
    try {
      // const doc = await timeBlockingService.initDocIfNeeded(uid)
      // const taskList = await timeBlockingService.fetchTasks(uid)
      // setDoc(doc)
      // setTasks(taskList)
    } catch (e) {
      console.error('Failed to reload tasks:', e)
    } finally {
      setLoading(false)
    }
  }, [uid])

  const createTask = useCallback(
    async (_data: TimeBlockingTaskWrite) => {
      if (!uid) return
      // await timeBlockingService.createTask(uid, data)
      await reloadTasks()
    },
    [uid, reloadTasks]
  )

  const setTaskCompleted = useCallback(
    async (_taskId: string, _state: boolean) => {
      if (!uid) return
      // await timeBlockingService.updateTaskCompleted(uid, taskId, state)
      await reloadTasks()
    },
    [uid, reloadTasks]
  )

  const createTag = useCallback(
    async (_tag: TimeBlockingTag) => {
      // if (!uid) return
      // await timeBlockingService.createTag(uid, tag)
      // await reloadTasks()
    },
    [uid, reloadTasks]
  )

  useEffect(() => {
    void reloadTasks()
  }, [reloadTasks])

  const tags = doc?.tags ?? {}

  return {
    timeBlockingData: doc,
    tasks,
    tags,
    loading,
    reloadTasks,
    createTask,
    setTaskCompleted,
    createTag,
  }
}

export default useTimeBlockingTask
