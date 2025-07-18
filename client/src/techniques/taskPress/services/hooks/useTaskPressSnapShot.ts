import { useState, useEffect } from 'react'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { TaskPressTaskRead } from '../documents/task-press-task-document'
import type { TaskPressTemplateRead } from '../documents/task-press-template-document'
import { useTaskPressRepo } from './useTaskPressRepo'

const useTaskPressSnapShot = () => {
  const { uid } = useCurrentUserStore()
  const repo = useTaskPressRepo()

  const [tasks, setTasks] = useState<TaskPressTaskRead[]>([])
  const [templates, setTemplates] = useState<TaskPressTemplateRead[]>([])

  useEffect(() => {
    if (repo && uid) {
      const { unsubscribe: unsubscribeTasksListener } =
        repo.idbTask.addCollectionSnapshotListener(
          (tasks) => setTasks(tasks),
          [uid]
        )

      const { unsubscribe: unsubscribeTemplatesListener } =
        repo.idbTemplate.addCollectionSnapshotListener(
          (templates) => setTemplates(templates),
          [uid]
        )
      return () => {
        unsubscribeTasksListener()
        unsubscribeTemplatesListener()
      }
    }
  }, [uid, repo])

  return { tasks, templates }
}

export default useTaskPressSnapShot
