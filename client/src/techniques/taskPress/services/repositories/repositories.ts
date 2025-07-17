import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { TaskPressTemplateIDBRepository } from './task-press-task-idb-repository'
import { TaskPressTaskIDBRepository } from './task-press-template-idb-repository'

let repositories: {
  idbTask: TaskPressTaskIDBRepository
  idbTemplate: TaskPressTemplateIDBRepository
} | null = null

const createRepositories = (uid: string) => ({
  idbTask: new TaskPressTaskIDBRepository(uid),
  idbTemplate: new TaskPressTemplateIDBRepository(uid),
})

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    repositories = createRepositories(uid)
  } else {
    repositories = null // ログアウト時は破棄
  }
})

export const getIDBRepositories = () => repositories
