import type { Firestore } from 'firebase/firestore'
import { firestore } from '../firebase'
import { UserRepository } from './repositories/users/user-repository'
import type { IDBRepositories } from '../../types/db/db-service-interface'

interface FirestoreRepositories extends IDBRepositories {
  users: UserRepository
}

type RepositoryFactory = (firestore: Firestore) => FirestoreRepositories

export const createRepositories: RepositoryFactory = (firestore) => ({
  users: new UserRepository(firestore),
})

let repositories: FirestoreRepositories | null = null

export const getRepositories = (): FirestoreRepositories => {
  if (!repositories) {
    repositories = createRepositories(firestore)
  }
  return repositories
}
