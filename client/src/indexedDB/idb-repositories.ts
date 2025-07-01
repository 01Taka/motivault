import { onAuthStateChanged } from 'firebase/auth'
import type { IDBRepositories } from '../types/db/db-service-interface'
import { TimeBlockingIDBRepository } from './repositories/techniques/timeBlocking/time-blocking-repository'
import { TimeBlockingTaskIDBRepository } from './repositories/techniques/timeBlocking/time-blocking-task-repository'
import { UserIDBRepository } from './repositories/user-repository'
import { auth } from '../firebase/firebase'

interface IdxDBRepositories extends IDBRepositories {
  users: UserIDBRepository
  timeBlocking: TimeBlockingIDBRepository
  timeBlockingTask: TimeBlockingTaskIDBRepository
}

type RepositoryFactory = (uid: string) => IdxDBRepositories

export const createIDBRepositories: RepositoryFactory = (uid: string) => ({
  users: new UserIDBRepository(uid),
  timeBlocking: new TimeBlockingIDBRepository(uid),
  timeBlockingTask: new TimeBlockingTaskIDBRepository(uid),
})

// 内部状態を保持
let currentUid = '=offline'
let repositories: IdxDBRepositories | null = null

// 読み取り専用のゲッターを用意（初回アクセス時に生成）
export const getIDBRepositories = (): IdxDBRepositories => {
  if (!repositories) {
    repositories = createIDBRepositories(currentUid)
  }
  return repositories
}

// UIDの変更時に再初期化
onAuthStateChanged(auth, (user) => {
  const newUid = user?.uid ?? '=offline'

  if (newUid !== currentUid) {
    currentUid = newUid
    repositories = null // 次回アクセス時に再生成される
  }
})
