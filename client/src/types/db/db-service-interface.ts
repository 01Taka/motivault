import { QueryConstraint } from 'firebase/firestore'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
  BaseMetadata,
} from './db-service-document-types'

export interface DBWriteTarget {
  id: string
  path: string
}

export interface IDBService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> {
  create(data: Write, collectionPath?: string[]): Promise<DBWriteTarget>
  createWithId(data: Write, documentPath: string[]): Promise<DBWriteTarget>
  read(documentPath: string[]): Promise<Read | null>
  update(data: Partial<Write>, documentPath: string[]): Promise<DBWriteTarget>
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
    field: keyof (Write | BaseMetadata),
    value: any,
    collectionPath?: string[]
  ): Promise<Read | null>
  addDocumentSnapshotListener(
    callback: (data: Read | null) => void,
    documentPathSegments: string[],
    callbackId?: string
  ): { callbackId: string; unsubscribe: () => void }
  removeDocumentSnapshotListener(
    callbackId: string,
    documentPathSegments: string[]
  ): void
  addCollectionSnapshotListener(
    callback: (data: Read[]) => void,
    collectionPathSegments: string[],
    callbackId?: string
  ): { callbackId: string; unsubscribe: () => void }
  removeCollectionSnapshotListener(
    callbackId: string,
    collectionPathSegments: string[]
  ): void
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
