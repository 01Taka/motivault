import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../types/db/db-service-document-types'

// Generic service interface mimicking FirestoreService methods (simplified for IndexedDB)

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
