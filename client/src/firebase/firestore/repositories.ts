import type { Firestore } from 'firebase/firestore'
import { db } from '../firebase'
import { UserRepository } from './repositories/users/user-repository'

interface Repositories {
  users: UserRepository
}

type RepositoryFactory = (db: Firestore) => Repositories

export const createRepositories: RepositoryFactory = (db) => ({
  users: new UserRepository(db),
})

export const repositories = createRepositories(db)
