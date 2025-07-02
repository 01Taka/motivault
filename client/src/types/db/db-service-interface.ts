import { QueryConstraint } from 'firebase/firestore'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from './db-service-document-types'

export interface IDBService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> {
  create(data: Write, collectionPath?: string[]): Promise<string>
  createWithId(data: Write, documentPath: string[]): Promise<string>
  read(documentPath: string[]): Promise<Read | null>
  update(data: Partial<Write>, documentPath: string[]): Promise<string>
  hardDelete(documentPath: string[]): Promise<void>
  softDelete(
    documentPath: string[],
    updateFields?: Partial<Write>
  ): Promise<void>
  getAll(
    collectionPath?: string[],
    queryConstraints?: QueryConstraints
  ): Promise<Read[]>
  getFirstMatch(
    field: keyof Read,
    value: any,
    collectionPath?: string[]
  ): Promise<Read | null>
}

interface BaseQueryConstraint {
  type: 'indexedDB' | 'firestore'
}

export interface IndexedDBQueryConstraints<T> extends BaseQueryConstraint {
  type: 'indexedDB'
  index?: T
  value?: any
  limit?: number
  offset?: number
}

export interface FirestoreQueryConstraints extends BaseQueryConstraint {
  type: 'firestore'
  constraints: QueryConstraint[]
}

type QueryConstraints<T = any> =
  | IndexedDBQueryConstraints<T>
  | FirestoreQueryConstraints

export type IDBRepositories<T extends string = string> = Record<
  T,
  IDBService<any, any>
>

// export type IDBRepositories = Record<string, IDBService<any, any>>
