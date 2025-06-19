import { openDB, type IDBPDatabase } from 'idb'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../types/firebase/firestore/firestore-document-types'
import type { DataService, TransactionalService } from './indexed-db-types'

type FlexGenericDB = unknown

export abstract class IndexedDBService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> implements DataService<Read, Write>
{
  private dbPromise: Promise<IDBPDatabase<FlexGenericDB>>
  private callbacks = new Map<string, Function>()
  private dbName: string

  constructor(dbName: string | string[]) {
    this.dbPromise = this.initDB()
    this.dbName = Array.isArray(dbName) ? dbName.join('/') : dbName
  }

  // Initialize or upgrade database
  private initDB(version?: number): Promise<IDBPDatabase<FlexGenericDB>> {
    return openDB<FlexGenericDB>(this.dbName, version ?? 1, {
      upgrade(db) {
        // object stores created on demand in ensureStore()
      },
    })
  }

  // Extract store name from path segments
  private pathToStoreName(path: string[] = []): string {
    return path.length ? path.join('_') : 'default'
  }

  // Ensure object store exists, upgrading DB if needed
  private async ensureStore(name: string): Promise<void> {
    const db = await this.dbPromise
    if (!db.objectStoreNames.contains(name)) {
      const newVersion = db.version + 1
      db.close()
      this.dbPromise = this.initDB(newVersion)
      await this.dbPromise
      const upgradeDb = await this.dbPromise
      if (!upgradeDb.objectStoreNames.contains(name)) {
        const store = upgradeDb.createObjectStore(name, { keyPath: 'docId' })
        store.createIndex('createdAt', 'createdAt')
      }
    }
  }

  // Hook for subclasses to strip unwanted fields
  protected abstract filterWriteData<T extends Write | Partial<Write>>(
    data: T
  ): T

  protected abstract getUid(): string

  // Common method to assemble record system fields
  private createRecord(data: Write, id: string): any {
    const now = Date.now()
    return {
      ...data,
      docId: id,
      createdById: this.getUid(),
      createdAt: now,
      updatedAt: now,
      isActive: true,
    }
  }

  private updateRecord(existing: any, updates: Partial<Write>): any {
    return {
      ...existing,
      ...updates,
      updatedAt: Date.now(),
    }
  }

  // Notify listeners
  private notifyDocument(id: string, record: Read | null) {
    for (const [key, fn] of this.callbacks) {
      if (key.startsWith(`doc:`) && key.endsWith(`:${id}`)) {
        fn(record, id)
      }
    }
  }

  private async notifyCollection(storeName: string) {
    const all = await this.getAll([storeName])
    for (const [key, fn] of this.callbacks) {
      if (key.startsWith(`col:`) && key.endsWith(`:${storeName}`)) {
        fn(all)
      }
    }
  }

  public async create(
    data: Write,
    collectionPath: string[] = []
  ): Promise<string> {
    const store = this.pathToStoreName(collectionPath)
    await this.ensureStore(store)
    const id = crypto.randomUUID()
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered, id)
    const db = await this.dbPromise
    await db.put(store, record)
    this.notifyDocument(id, record)
    this.notifyCollection(store)
    return id
  }

  public async createWithId(
    data: Write,
    documentPath: string[]
  ): Promise<string> {
    const store = this.pathToStoreName(documentPath.slice(0, -1))
    await this.ensureStore(store)
    const id = documentPath.slice(-1)[0]
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered as Write, id)
    const db = await this.dbPromise
    await db.put(store, record)
    this.notifyDocument(id, record)
    this.notifyCollection(store)
    return id
  }

  public async read(documentPath: string[]): Promise<Read | null> {
    const store = this.pathToStoreName(documentPath.slice(0, -1))
    await this.ensureStore(store)
    const id = documentPath.slice(-1)[0]
    const db = await this.dbPromise
    return (await db.get(store, id)) ?? null
  }

  public async update(
    data: Partial<Write>,
    documentPath: string[]
  ): Promise<void> {
    const store = this.pathToStoreName(documentPath.slice(0, -1))
    const id = documentPath.slice(-1)[0]
    await this.ensureStore(store)
    const db = await this.dbPromise
    const existing = await db.get(store, id)
    if (!existing) throw new Error('Document not found')
    const filtered = this.filterWriteData(data)
    const updated = this.updateRecord(existing, filtered)
    await db.put(store, updated)
    this.notifyDocument(id, updated)
    this.notifyCollection(store)
  }

  public async hardDelete(documentPath: string[]): Promise<void> {
    const store = this.pathToStoreName(documentPath.slice(0, -1))
    const id = documentPath.slice(-1)[0]
    await this.ensureStore(store)
    const db = await this.dbPromise
    await db.delete(store, id)
    this.notifyDocument(id, null)
    this.notifyCollection(store)
  }

  public async softDelete(
    documentPath: string[],
    updateFields: Partial<Write> = {}
  ): Promise<void> {
    const store = this.pathToStoreName(documentPath.slice(0, -1))
    const id = documentPath.slice(-1)[0]
    await this.ensureStore(store)
    const db = await this.dbPromise
    const existing = await db.get(store, id)
    if (!existing) throw new Error('Document not found')
    const filtered = this.filterWriteData(updateFields)
    const updated = this.updateRecord(existing, filtered)
    updated.isActive = false
    updated.deletedAt = Date.now()
    await db.put(store, updated)
    this.notifyDocument(id, updated)
    this.notifyCollection(store)
  }

  public async getAll(
    collectionPath: string[] = [],
    queryOptions: {
      index?: keyof Write
      value?: any
      limit?: number
      offset?: number
    } = {}
  ): Promise<Read[]> {
    const store = this.pathToStoreName(collectionPath)
    await this.ensureStore(store)
    const db = await this.dbPromise
    let items: Read[] = []
    if (queryOptions.index && queryOptions.value !== undefined) {
      const indexStore = db
        .transaction(store)
        .store.index(queryOptions.index as string)
      items = await indexStore.getAll(queryOptions.value)
    } else {
      items = await db.getAll(store)
    }
    const start = queryOptions.offset ?? 0
    const end = queryOptions.limit ? start + queryOptions.limit : undefined
    return items.slice(start, end)
  }

  public async getFirstMatch(
    field: keyof Read,
    value: any,
    collectionPath: string[] = []
  ): Promise<Read | null> {
    const results = await this.getAll(collectionPath, {
      index: field as keyof Write,
      value,
    })
    return results[0] ?? null
  }

  public addReadCallback(
    callback: (data: Read | null, id: string) => void,
    documentPath: string[],
    callbackId?: string
  ) {
    const store = this.pathToStoreName(documentPath.slice(0, -1))
    const id = documentPath.slice(-1)[0]
    const key = `doc:${callbackId ?? crypto.randomUUID()}:${store}:${id}`
    this.callbacks.set(key, callback)
    return { callbackId: key, unsubscribe: () => this.callbacks.delete(key) }
  }

  public addReadCollectionCallback(
    callback: (data: Read[]) => void,
    collectionPath: string[] = [],
    callbackId?: string
  ) {
    const store = this.pathToStoreName(collectionPath)
    const key = `col:${callbackId ?? crypto.randomUUID()}:${store}`
    this.callbacks.set(key, callback)
    return { callbackId: key, unsubscribe: () => this.callbacks.delete(key) }
  }

  public removeCallback(callbackId: string): void {
    this.callbacks.delete(callbackId)
  }

  public async runTransaction(
    actions: (txService: TransactionalService<Read, Write>) => Promise<void>
  ): Promise<void> {
    const db = await this.dbPromise
    const storeNames = Array.from(db.objectStoreNames)
    const tx = db.transaction(storeNames, 'readwrite')
    const txDb = tx.objectStore.bind(tx)
    try {
      await actions({
        create: async (data, path = []) => {
          const store = this.pathToStoreName(path)
          const id = crypto.randomUUID()
          const rec = this.createRecord(this.filterWriteData(data), id)
          await txDb(store).put(rec)
          return id
        },
        update: async (data, docPath) => {
          const store = this.pathToStoreName(docPath.slice(0, -1))
          const id = docPath.slice(-1)[0]
          const existing = await txDb(store).get(id)
          if (!existing) throw new Error('Document not found')
          const rec = this.updateRecord(existing, this.filterWriteData(data))
          await txDb(store).put(rec)
        },
        delete: async (docPath) => {
          const store = this.pathToStoreName(docPath.slice(0, -1))
          const id = docPath.slice(-1)[0]
          await txDb(store).delete(id)
        },
        read: async (docPath) => {
          const store = this.pathToStoreName(docPath.slice(0, -1))
          const id = docPath.slice(-1)[0]
          return (await txDb(store).get(id)) ?? null
        },
      })
      await tx.done
      for (const store of storeNames) {
        await this.notifyCollection(store)
      }
    } catch (err) {
      tx.abort()
      throw err
    }
  }
}
