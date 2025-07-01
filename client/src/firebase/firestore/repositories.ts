import type { Firestore } from 'firebase/firestore'
import { db } from '../firebase'
import { UserRepository } from './repositories/users/user-repository'
import type { IDBRepositories } from '../../types/db/db-service-interface'

interface FirestoreRepositories extends IDBRepositories {
  users: UserRepository
}

type RepositoryFactory = (db: Firestore) => FirestoreRepositories

export const createRepositories: RepositoryFactory = (db) => ({
  users: new UserRepository(db),
})

let repositories: FirestoreRepositories | null = null

export const getRepositories = (): FirestoreRepositories => {
  if (!repositories) {
    repositories = createRepositories(db)
  }
  return repositories
}
