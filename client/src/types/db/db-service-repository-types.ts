import type { Firestore } from 'firebase/firestore' // Client SDK の Firestore
import { type Functions } from 'firebase/functions'

export type RepositoryType = 'indexedDB' | 'firestore' | 'functions'

export interface RepositoryArgsBaseMap {
  indexedDB: [uid: string]
  firestore: [firestore: Firestore, uid: string]
  functions: [functions: Functions]
}

export type RepositoryArgsBase = RepositoryArgsBaseMap[RepositoryType]
