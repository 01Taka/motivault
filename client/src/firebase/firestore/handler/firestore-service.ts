import {
  Firestore,
  CollectionReference,
  DocumentSnapshot,
  Transaction,
  QueryConstraint,
  QuerySnapshot,
  DocumentReference,
  WriteBatch,
  FieldValue,
  serverTimestamp,
  doc,
  type DocumentData,
  type SetOptions,
} from 'firebase/firestore'
import BatchHandler from './batch-handler'
import TransactionHandler from './transaction-handler'
import CollectionManager from './collection-manager'
import { parseDocumentSnapshot, parseQuerySnapshot } from '../snapshotUtils'
import { CRUDHandler } from './crud-dandler'
import { CallbacksHandler } from './callbacks-handler'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
  BaseDocument,
  BaseMetadata,
} from '../../../types/db/db-service-document-types'
import type {
  DBWriteTarget,
  FirestoreQueryConstraints,
  IDBService,
} from '../../../types/db/db-service-interface'

abstract class FirestoreService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
  Document extends BaseDocument = Write,
> implements IDBService<Read, Write>
{
  private _callbacksHandler?: CallbacksHandler<Read>
  private firestore: Firestore
  private collectionPathComposition: string | string[]
  private fixedPath: Record<string, string>

  constructor(
    firestore: Firestore,
    collectionPathComposition: string | string[],
    fixedPath: Record<string, string> = {}
  ) {
    this.firestore = firestore
    this.collectionPathComposition = collectionPathComposition
    this.fixedPath = fixedPath
  }

  // ======================================================================
  // Abstract Methods
  // ======================================================================

  /**
   * 不要な情報を除外した書き込みデータを返します。
   * サブクラスで実装してください。
   * @param data 書き込むデータ
   */
  protected abstract filterWriteData<T extends Write | Partial<Write>>(
    data: T
  ): T extends Write ? Document : Partial<Document>

  protected abstract getCreatorUid(): string

  private checkRequiredProperties(properties: Record<string, any>) {
    const missingProperties = Object.keys(properties).filter(
      (key) => properties[key] === undefined
    )
    if (missingProperties.length > 0) {
      throw new Error(
        `必要なプロパティが足りていません: ${missingProperties.join(', ')}`
      )
    }
  }

  /**
   * 作成前の前処理を行う
   * @param data 作成するデータ
   * @param options オプション（setInvalid なら isActive を false に）
   * @returns 前処理後のデータ（createdAt と isActive を付与）
   */
  private addSystemFields<Write>(
    data: Write
  ): Write & { createdAt: FieldValue; isActive: boolean } {
    return {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
    }
  }

  private organizeCreateData(data: Write): Document & { createdById: string } {
    const formatData = this.filterWriteData(data) as Document & {
      createdById: string
    }
    formatData.createdById = this.getCreatorUid()
    this.checkRequiredProperties(formatData)
    return this.addSystemFields(formatData)
  }

  private removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as Partial<T>
  }

  private organizeUpdateData(data: Partial<Write>): Partial<Document> {
    const filterData = this.filterWriteData(data)
    const formatData = this.removeUndefined(filterData)
    return { ...formatData, updatedAt: serverTimestamp() }
  }

  // ======================================================================
  // Collection Reference
  // ======================================================================

  /**
   * コレクションまたはドキュメントを動的に取得。
   * @param path コレクション間に挟む親ドキュメントIDの配列
   * @param refType trueでDocumentRefを返す
   */
  public getReference(
    path: string[],
    refType: 'collection'
  ): CollectionReference<DocumentData>
  public getReference(
    path: string[],
    refType: 'doc'
  ): DocumentReference<DocumentData>
  public getReference(
    path: string[],
    refType: 'doc' | 'collection'
  ): CollectionReference<DocumentData> | DocumentReference<DocumentData> {
    return CollectionManager.getReference(
      this.firestore,
      this.collectionPathComposition,
      path ?? [],
      this.fixedPath,
      refType
    )
  }

  public getDocumentRefWithAutoId(collectionPath: string[] = []) {
    return doc(this.getReference(collectionPath, 'collection'))
  }

  // ======================================================================
  // Lazy Initialization: Batch / Transaction Handlers
  // ======================================================================

  private get callbacksHandler(): CallbacksHandler<Read> {
    if (!this._callbacksHandler) {
      this._callbacksHandler = new CallbacksHandler<Read>()
    }
    return this._callbacksHandler
  }

  // ======================================================================
  // CRUD Methods
  // ======================================================================

  async create(
    data: Write,
    collectionPath: string[] = []
  ): Promise<DBWriteTarget> {
    console.log('called create')
    const collectionRef = this.getReference(collectionPath, 'collection')
    const docRef = await CRUDHandler.create<Document>(
      collectionRef,
      this.organizeCreateData(data)
    )
    return { id: docRef.id, path: docRef.path }
  }

  async createWithId(
    data: Write,
    documentPath: string[],
    options?: SetOptions
  ): Promise<DBWriteTarget> {
    console.log('called createWithId')
    const docRef = this.getReference(documentPath, 'doc')
    await CRUDHandler.createWithId(
      docRef,
      this.organizeCreateData(data),
      options
    )
    return { id: docRef.id, path: docRef.path }
  }

  protected async readAsDocumentSnapshot(
    documentPath: string[]
  ): Promise<DocumentSnapshot<Read>> {
    const docRef = this.getReference(
      documentPath,
      'doc'
    ) as DocumentReference<Read>
    return CRUDHandler.readAsDocumentSnapshot<Read>(docRef)
  }

  async read(documentPath: string[]): Promise<Read | null> {
    console.error('called read')
    const docRef = this.getReference(documentPath, 'doc')
    return CRUDHandler.read<Read>(docRef)
  }

  async update(
    data: Partial<Write>,
    documentPath: string[]
  ): Promise<DBWriteTarget> {
    console.log('called update')
    const docRef = this.getReference(documentPath, 'doc')
    CRUDHandler.update(docRef, this.organizeUpdateData(data))
    return { id: docRef.id, path: docRef.path }
  }

  async hardDelete(documentPath: string[]): Promise<void> {
    console.log('called hard delete')
    const docRef = this.getReference(documentPath, 'doc')
    await CRUDHandler.delete(docRef)
  }

  async softDelete(
    documentPath: string[],
    updateFields: Partial<Write> = {}
  ): Promise<void> {
    console.log('called soft delete')
    const docRef = this.getReference(documentPath, 'doc')
    const data = {
      isActive: false,
      deletedAt: serverTimestamp(),
      ...updateFields,
    }
    await CRUDHandler.update(docRef, this.organizeUpdateData(data))
  }

  async getAllAsQuerySnapshot(
    collectionPath: string[] = [],
    queryConstraints: QueryConstraint[] = []
  ): Promise<QuerySnapshot<Read>> {
    const collectionRef = this.getReference(
      collectionPath,
      'collection'
    ) as CollectionReference<Read>
    return CRUDHandler.getAllAsQuerySnapshot<Read>(
      collectionRef,
      ...queryConstraints
    )
  }

  async getAll(
    collectionPath: string[] = [],
    queryConstraints: FirestoreQueryConstraints = {
      type: 'firestore',
      constraints: [],
    }
  ): Promise<Read[]> {
    console.log('called get all')
    const collectionRef = this.getReference(collectionPath, 'collection')
    return CRUDHandler.getAll<Read>(
      collectionRef,
      ...queryConstraints.constraints
    )
  }

  async getFirstMatch(
    field: keyof (Write | BaseMetadata),
    value: any,
    collectionPath: string[] = []
  ): Promise<Read | null> {
    console.log('called get first match')
    const collectionRef = this.getReference(collectionPath, 'collection')
    return CRUDHandler.getFirstMatch<Read, Write>(collectionRef, field, value)
  }

  async getAllWithPagination(
    collectionPath: string[] = [],
    startAfterDoc?: DocumentSnapshot<Read>,
    limitCount?: number,
    ...queryConstraints: QueryConstraint[]
  ): Promise<Read[]> {
    const collectionRef = this.getReference(collectionPath, 'collection')
    return CRUDHandler.getAllWithPagination<Read>(
      collectionRef,
      startAfterDoc,
      limitCount,
      ...queryConstraints
    )
  }

  // ======================================================================
  // Callbacks Methods
  // ======================================================================

  addDocumentSnapshotListenerWithSnapshot(
    callback: (snapshot: DocumentSnapshot<Read, DocumentData>) => void,
    documentPath: string[],
    callbackId?: string
  ): { callbackId: string; unsubscribe: () => void } {
    const docRef = this.getReference(
      documentPath,
      'doc'
    ) as DocumentReference<Read>
    return this.callbacksHandler.addCallback(docRef, callback, callbackId)
  }

  addDocumentSnapshotListener(
    callback: (data: Read | null) => void,
    documentPath: string[],
    callbackId?: string
  ): { callbackId: string; unsubscribe: () => void } {
    return this.addDocumentSnapshotListenerWithSnapshot(
      (snapshot) => callback(parseDocumentSnapshot(snapshot)),
      documentPath,
      callbackId
    )
  }

  removeDocumentSnapshotListener(
    callbackId: string,
    documentPath: string[]
  ): void {
    const docRef = this.getReference(
      documentPath,
      'doc'
    ) as DocumentReference<Read>
    this.callbacksHandler.removeCallback(docRef, callbackId)
  }

  addCollectionSnapshotListenerWithSnapshot(
    callback: (snapshot: QuerySnapshot<Read, DocumentData>) => void,
    collectionPath: string[] = [],
    callbackId?: string
  ): { callbackId: string; unsubscribe: () => void } {
    const collectionRef = this.getReference(
      collectionPath,
      'collection'
    ) as CollectionReference<Read>
    return this.callbacksHandler.addCollectionCallback(
      collectionRef,
      callback,
      callbackId
    )
  }

  addCollectionSnapshotListener(
    callback: (data: Read[]) => void,
    collectionPath: string[] = [],
    callbackId?: string
  ): { callbackId: string; unsubscribe: () => void } {
    return this.addCollectionSnapshotListenerWithSnapshot(
      (snapshot) => callback(parseQuerySnapshot(snapshot)),
      collectionPath,
      callbackId
    )
  }

  removeCollectionSnapshotListener(
    callbackId: string,
    collectionPath: string[] = []
  ): void {
    const collectionRef = this.getReference(
      collectionPath,
      'collection'
    ) as CollectionReference<Read>
    this.callbacksHandler.removeCollectionCallback(collectionRef, callbackId)
  }

  // ======================================================================
  // BatchHandler Methods
  // ======================================================================

  private batch: WriteBatch | null = null

  setBatch(batch: WriteBatch) {
    this.batch = batch
  }

  clearBatch() {
    this.batch = null
  }

  private getBatch(methodName: string): WriteBatch {
    if (!this.batch) {
      throw new Error(
        `No active batch. Call setBatch() before using ${methodName}.`
      )
    }
    return this.batch
  }

  setInBatch(
    data: Write,
    documentPath: string[],
    batch = this.getBatch('setInBatch()')
  ): DocumentReference<DocumentData, DocumentData> {
    const docRef = this.getReference(documentPath, 'doc')
    BatchHandler.set(batch, this.organizeCreateData(data), docRef)
    return docRef
  }

  updateInBatch(
    data: Partial<Write>,
    documentPath: string[],
    batch = this.getBatch('updateInBatch()')
  ): DocumentReference<DocumentData, DocumentData> {
    const docRef = this.getReference(documentPath, 'doc')
    BatchHandler.update(batch, this.organizeUpdateData(data), docRef)
    return docRef
  }

  deleteInBatch(
    documentPath: string[],
    batch = this.getBatch('deleteInBatch()')
  ): DocumentReference<DocumentData, DocumentData> {
    const docRef = this.getReference(documentPath, 'doc')
    BatchHandler.delete(batch, docRef)
    return docRef
  }

  // ======================================================================
  // TransactionHandler Methods
  // ======================================================================

  protected transaction: Transaction | null = null

  setTransaction(transaction: Transaction): void {
    this.transaction = transaction
  }

  clearTransaction(): void {
    this.transaction = null
  }

  private getTransaction(methodName: string): Transaction {
    if (!this.transaction) {
      throw new Error(
        `No active transaction. Call setTransaction() before using ${methodName}.`
      )
    }
    return this.transaction
  }

  async getInTransaction(
    documentPath: string[],
    transaction = this.getTransaction('getInTransaction()')
  ): Promise<Read | null> {
    const docRef = this.getReference(documentPath, 'doc')
    const result = await TransactionHandler.get(transaction, docRef)
    return parseDocumentSnapshot<Read>(result)
  }

  setInTransaction(
    data: Write,
    documentPath: string[],
    transaction = this.getTransaction('setInTransaction()')
  ): DocumentReference<DocumentData, DocumentData> {
    const docRef = this.getReference(documentPath, 'doc')
    TransactionHandler.set(transaction, this.organizeCreateData(data), docRef)
    return docRef
  }

  updateInTransaction(
    data: Partial<Write>,
    documentPath: string[],
    transaction = this.getTransaction('updateInTransaction()')
  ): DocumentReference<DocumentData, DocumentData> {
    const docRef = this.getReference(documentPath, 'doc')
    TransactionHandler.update(
      transaction,
      this.organizeUpdateData(data),
      docRef
    )
    return docRef
  }

  deleteInTransaction(
    documentPath: string[],
    transaction = this.getTransaction('deleteInTransaction()')
  ): DocumentReference<DocumentData, DocumentData> {
    const docRef = this.getReference(documentPath, 'doc')
    TransactionHandler.delete(transaction, docRef)
    return docRef
  }
}

export default FirestoreService
