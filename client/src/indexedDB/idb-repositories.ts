import { UserIDBRepository } from './repositories/user-repository'

interface IDBRepositories {
  users: UserIDBRepository
}

type RepositoryFactory = (uid: string) => IDBRepositories

export const createIDBRepositories: RepositoryFactory = (uid: string) => ({
  users: new UserIDBRepository(uid),
})

export const idbRepositories = createIDBRepositories('idb-uid')
