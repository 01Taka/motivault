import { type Unsubscribe } from 'firebase/firestore'
import FirestoreService from './firestore-service'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
  BaseDocument,
} from '../../../types/db/db-service-document-types'
import type {
  CreateWithIdOptions,
  DBWriteTarget,
} from '../../../types/db/db-service-interface'

class NamedDocumentService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
  Document extends BaseDocument = Write,
> {
  private readonly docName: string
  private readonly baseService: FirestoreService<Read, Write, Document>

  constructor(
    baseService: FirestoreService<Read, Write, Document>,
    docName: string // 例: "main"
  ) {
    this.baseService = baseService
    this.docName = docName
  }

  private getPath(basePath: string[]): string[] {
    return [...basePath, this.docName]
  }

  async read(basePath: string[]): Promise<Read | null> {
    return this.baseService.read(this.getPath(basePath))
  }

  async update(
    data: Partial<Write>,
    basePath: string[]
  ): Promise<DBWriteTarget> {
    return this.baseService.update(data, this.getPath(basePath))
  }

  async create(
    data: Write,
    basePath: string[],
    options?: CreateWithIdOptions
  ): Promise<DBWriteTarget> {
    return this.baseService.createWithId(data, this.getPath(basePath), options)
  }

  async delete(basePath: string[]): Promise<void> {
    return this.baseService.hardDelete(this.getPath(basePath))
  }

  async softDelete(
    basePath: string[],
    updateFields: Partial<Write> = {}
  ): Promise<void> {
    return this.baseService.softDelete(this.getPath(basePath), updateFields)
  }

  addCallback(
    callback: (data: Read | null) => void,
    basePath: string[],
    callbackId?: string
  ): { callbackId: string; unsubscribe: Unsubscribe } {
    return this.baseService.addDocumentSnapshotListener(
      callback,
      this.getPath(basePath),
      callbackId
    )
  }

  removeCallback(callbackId: string, basePath: string[]): void {
    this.baseService.removeDocumentSnapshotListener(
      callbackId,
      this.getPath(basePath)
    )
  }
}

export default NamedDocumentService
