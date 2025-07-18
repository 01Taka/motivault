// hooks/useTaskPressRepo.ts
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { TaskPressTaskIDBRepository } from '../repositories/task-press-task-idb-repository'
import { TaskPressTemplateIDBRepository } from '../repositories/task-press-template-idb-repository'

export interface TaskPressRepo {
  idbTask: TaskPressTaskIDBRepository
  idbTemplate: TaskPressTemplateIDBRepository
}

export const useTaskPressRepo = () => {
  const [repo, setRepo] = useState<TaskPressRepo | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setRepo({
          idbTask: new TaskPressTaskIDBRepository(user.uid),
          idbTemplate: new TaskPressTemplateIDBRepository(user.uid),
        })
      } else {
        setRepo(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return repo
}
