import { useEffect, useState } from 'react'
import type {
  TimeBlockingTaskRead,
  TimeBlockingTaskWrite,
} from './documents/task-documents'
import type {
  TimeBlockingRead,
  TimeBlockingTag,
} from './documents/time-blocking-document'
import { getIDBRepositories } from '../../../indexedDB/idb-repositories'

const idbRepositories = getIDBRepositories()

const useTimeBlockingTask = () => {
  const [tasks, setTasks] = useState<TimeBlockingTaskRead[]>([])
  const [timeBlockingDoc, setTimeBlockingDoc] =
    useState<TimeBlockingRead | null>(null)
  const [loading, setLoading] = useState(true)

  const generateUniqueId = (existingIds: string[]): string => {
    let id: string
    do {
      id = crypto.randomUUID().slice(0, 8)
    } while (existingIds.includes(id))
    return id
  }

  const initTimeBlockingDocIfNeeded =
    async (): Promise<TimeBlockingRead | null> => {
      const doc = await idbRepositories.timeBlocking.read(['timeBlocking'])
      if (doc === null) {
        const newDoc = { tags: {} }
        await idbRepositories.timeBlocking.createWithId(newDoc, [
          'timeBlocking',
        ])
        // 自動で追加情報が保存されるので再取得して返す
        return await idbRepositories.timeBlocking.read(['timeBlocking'])
      }
      return doc
    }

  const reloadTasks = async () => {
    setLoading(true)
    try {
      const doc = await initTimeBlockingDocIfNeeded()
      const allTasks = await idbRepositories.timeBlockingTask.getAll()
      setTimeBlockingDoc(doc)
      setTasks(allTasks)
      return allTasks
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (data: TimeBlockingTaskWrite) => {
    await idbRepositories.timeBlockingTask.create(data)
    await reloadTasks()
  }

  const setTaskCompleted = async (taskId: string, state: boolean) => {
    await idbRepositories.timeBlockingTask.update({ completed: state }, [
      taskId,
    ])
    reloadTasks()
  }

  const createTag = async (tag: TimeBlockingTag) => {
    try {
      const doc = await idbRepositories.timeBlocking.read(['timeBlocking'])
      const tags = doc?.tags ?? {}
      const id = generateUniqueId(Object.keys(tags))
      const updatedTags = { ...tags, [id]: tag }

      await idbRepositories.timeBlocking.update({ tags: updatedTags }, [
        'timeBlocking',
      ])
      await reloadTasks()
    } catch (error) {
      console.error('Tag creation failed:', error)
    }
  }

  useEffect(() => {
    void reloadTasks()
  }, [])

  const tags = timeBlockingDoc?.tags ?? {}

  return {
    timeBlockingData: timeBlockingDoc,
    tasks,
    tags,
    loading,
    reloadTasks,
    setTaskCompleted,
    createTask,
    createTag,
  }
}

export default useTimeBlockingTask
