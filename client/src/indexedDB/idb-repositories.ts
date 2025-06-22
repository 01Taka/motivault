import { TimeBlockingIDBRepository } from './repositories/techniques/timeBroking/time-broking-repository'
import { TimeBlockingTaskIDBRepository } from './repositories/techniques/timeBroking/time-broking-task-repository'
import { UserIDBRepository } from './repositories/user-repository'

interface IDBRepositories {
  users: UserIDBRepository
  timeBlocking: TimeBlockingIDBRepository
  timeBlockingTask: TimeBlockingTaskIDBRepository
}

type RepositoryFactory = (uid: string) => IDBRepositories

export const createIDBRepositories: RepositoryFactory = (uid: string) => ({
  users: new UserIDBRepository(uid),
  timeBlocking: new TimeBlockingIDBRepository(uid),
  timeBlockingTask: new TimeBlockingTaskIDBRepository(uid),
})

export const idbRepositories = createIDBRepositories('idb-uid')
