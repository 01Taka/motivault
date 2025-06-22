import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../types/firebase/firestore/firestore-document-types'

// Generic service interface mimicking FirestoreService methods (simplified for IndexedDB)
export interface DataService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> {
  create(data: Write, collectionPath?: string[]): Promise<string>
  createWithId(data: Write, documentPath: string[]): Promise<string>
  read(documentPath: string[]): Promise<Read | null>
  update(data: Partial<Write>, documentPath: string[]): Promise<void>
  hardDelete(documentPath: string[]): Promise<void>
  softDelete(
    documentPath: string[],
    updateFields?: Partial<Write>
  ): Promise<void>
  getAll(
    collectionPath?: string[],
    queryOptions?: {
      index?: keyof Write
      value?: any
      limit?: number
      offset?: number
    }
  ): Promise<Read[]>
  getFirstMatch(
    field: keyof Read,
    value: any,
    collectionPath?: string[]
  ): Promise<Read | null>
  // addReadCallback(
  //   callback: (data: Read | null, id: string) => void,
  //   documentPath: string[],
  //   callbackId?: string
  // ): Promise<{ callbackId: string; unsubscribe: () => void }>
  // addReadCollectionCallback(
  //   callback: (data: Read[]) => void,
  //   collectionPath?: string[],
  //   callbackId?: string
  // ): Promise<{ callbackId: string; unsubscribe: () => void }>
  // removeCallback(callbackId: string): void
  runTransaction(
    actions: (txService: TransactionalService<Read, Write>) => Promise<void>
  ): Promise<void>
}

// TransactionalService provides methods within a transaction
export interface TransactionalService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> {
  create(data: Write, collectionPath?: string[]): Promise<string>
  update(data: Partial<Write>, documentPath: string[]): Promise<void>
  delete(documentPath: string[]): Promise<void>
  read(documentPath: string[]): Promise<Read | null>
}
