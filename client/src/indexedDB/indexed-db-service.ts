import { openDB, type IDBPDatabase } from 'idb'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../types/db/db-service-document-types'
import type { TransactionalService } from './indexed-db-types'
import type {
  IDBService,
  IndexedDBQueryConstraints,
} from '../types/db/db-service-interface'
import { createFirestoreId } from '../functions/services/firestore-id-service'

type FlexGenericDB = unknown

export abstract class IndexedDBService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> implements IDBService<Read, Write>
{
  private dbPromise!: Promise<IDBPDatabase<FlexGenericDB>>
  private dbPathComposition: string[]
  private fixedPath: Record<string, string>
  private currentDBPath = ''
  private currentDBVersion: number

  /**
   * @param dbPathComposition 例: ['users', 'userId', 'posts', 'postId']
   * @param fixedPath 固定キー（例: { userId: 'abc123' }）
   * @param version 初期バージョン（任意）
   */

  constructor(
    dbPathComposition: string | string[],
    fixedPath: Record<string, string> = {},
    version = 1
  ) {
    this.dbPathComposition = Array.isArray(dbPathComposition)
      ? dbPathComposition
      : [dbPathComposition]
    if (!this.dbPathComposition.length) {
      throw new Error('dbPathComposition must contain at least one element')
    }

    this.fixedPath = fixedPath
    this.currentDBVersion = version
    this.dbPromise = this.initializeDB()
  }

  private initializeDB(): Promise<IDBPDatabase<FlexGenericDB>> {
    const defaultName = 'default-db'
    const defaultStore = 'default-store'
    this.currentDBPath = defaultName
    return openDB<FlexGenericDB>(defaultName, this.currentDBVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(defaultStore)) {
          db.createObjectStore(defaultStore, { keyPath: 'docId' })
        }
      },
    })
  }

  private getDBPath(segments: string[]): string {
    const fixedKeys = Object.keys(this.fixedPath)
    const dynamicCount = this.dbPathComposition.length - 1 - fixedKeys.length
    if (segments.length !== dynamicCount) {
      throw new Error(
        `Expected ${dynamicCount} dynamic segments, got ${segments.length}`
      )
    }

    const path: string[] = []
    let si = 0
    for (let i = 0; i < this.dbPathComposition.length; i++) {
      const key = this.dbPathComposition[i]
      path.push(key)
      if (i === this.dbPathComposition.length - 1) break

      if (key in this.fixedPath) {
        path.push(this.fixedPath[key])
      } else {
        path.push(segments[si++]!)
      }
    }
    return path.join('/')
  }

  private open(collectionPath: string[], version?: number): void {
    const path = this.getDBPath(collectionPath)

    if (path === this.currentDBPath && version === this.currentDBVersion) return

    this.dbPromise = openDB<FlexGenericDB>(path, version ?? 1, {
      upgrade(db) {
        const storeName = path
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: 'docId' })
          store.createIndex('createdAt', 'createdAt')
        }
      },
    })

    this.currentDBPath = path
    this.currentDBVersion = version ?? 1
  }

  private async getStore(collectionPath: string[] = []): Promise<string> {
    const path = this.getDBPath(collectionPath)
    const db = await this.dbPromise

    if (!db.objectStoreNames.contains(path)) {
      const newVersion = db.version + 1
      db.close()
      this.open(collectionPath, newVersion)
      await this.dbPromise // 開き直し完了を待つ
    }

    return path // store 名として使う
  }

  /**
   * Firestoreのパスから1つ上のドキュメントIDを取得する
   * @param path - Firestoreのドキュメントパス（例: "users/userA/notes/note123"）
   * @returns 親ドキュメントID（例: "userA"） or null
   */
  private getParentDocId(path: string): string {
    const segments = path.split('/')
    // パスが最低でも collection/doc/collection/doc の形式であることを確認
    if (segments.length < 4 || segments.length % 2 !== 0) {
      return ''
    }
    return segments[segments.length - 3] ?? ''
  }

  private async getStoreAndId(documentPath: string[]) {
    const store = await this.getStore(documentPath.slice(0, -1))
    const id = documentPath.slice(-1)[0]
    return { store, id }
  }

  private async getFromDB(documentPath: string[]): Promise<Read | null> {
    const { store, id } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    const data = (await db.get(store, id)) as Read
    if (!data) return null
    data.parentId = this.getParentDocId(data.path ?? '')
    return data
  }

  // Hook for subclasses to strip unwanted fields
  protected abstract filterWriteData<T extends Write | Partial<Write>>(
    data: T
  ): T

  protected abstract getCreatorUid(): string

  // Common method to assemble record system fields
  private createRecord(data: Write, id: string): any {
    const now = Date.now()
    return {
      ...data,
      docId: id,
      path: `${this.currentDBPath}/${id}`,
      createdById: this.getCreatorUid(),
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

  public async create(
    data: Write,
    collectionPath: string[] = []
  ): Promise<string> {
    const store = await this.getStore(collectionPath)
    const id = createFirestoreId()
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered, id)
    const db = await this.dbPromise
    await db.put(store, record)
    return `${store}/${id}`
  }

  public async createWithId(
    data: Write,
    documentPath: string[]
  ): Promise<string> {
    const { store, id } = await this.getStoreAndId(documentPath)
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered as Write, id)
    const db = await this.dbPromise
    await db.put(store, record)
    return `${store}/${id}`
  }

  public async read(documentPath: string[]): Promise<Read | null> {
    return await this.getFromDB(documentPath)
  }

  public async update(
    data: Partial<Write>,
    documentPath: string[]
  ): Promise<string> {
    const existing = await this.getFromDB(documentPath)
    if (!existing) throw new Error('Document not found')
    const prevData = await this.read(documentPath)
    const newData = { ...prevData, ...data } as Write
    const filtered = this.filterWriteData(newData)
    const updated = this.updateRecord(existing, filtered)
    const { id, store } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    await db.put(store, updated)
    return `${store}/${id}`
  }

  public async hardDelete(documentPath: string[]): Promise<void> {
    const { store, id } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    await db.delete(store, id)
  }

  public async softDelete(
    documentPath: string[],
    updateFields: Partial<Write> = {}
  ): Promise<void> {
    const existing = await this.getFromDB(documentPath)
    if (!existing) throw new Error('Document not found')
    const filtered = this.filterWriteData(updateFields)
    const updated = this.updateRecord(existing, filtered)
    updated.isActive = false
    updated.deletedAt = Date.now()
    const { store } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    await db.put(store, updated)
  }

  public async getAll(
    collectionPath: string[] = [],
    queryConstraints: IndexedDBQueryConstraints<keyof Write> = {
      type: 'indexedDB',
    }
  ): Promise<Read[]> {
    const store = await this.getStore(collectionPath)
    const db = await this.dbPromise
    let items: Read[] = []
    if (queryConstraints.index && queryConstraints.value !== undefined) {
      const indexStore = db
        .transaction(store)
        .store.index(queryConstraints.index as string)
      items = await indexStore.getAll(queryConstraints.value)
    } else {
      items = await db.getAll(store)
    }
    const start = queryConstraints.offset ?? 0
    const end = queryConstraints.limit
      ? start + queryConstraints.limit
      : undefined
    return items.slice(start, end)
  }

  public async getFirstMatch(
    field: keyof Read,
    value: any,
    collectionPath: string[] = []
  ): Promise<Read | null> {
    const results = await this.getAll(collectionPath, {
      type: 'indexedDB',
      index: field as keyof Write,
      value,
    })
    return results[0] ?? null
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
          const store = await this.getStore(path)
          const id = createFirestoreId()
          const rec = this.createRecord(this.filterWriteData(data), id)
          await txDb(store).put(rec)
          return id
        },
        update: async (data, docPath) => {
          const { store, id } = await this.getStoreAndId(docPath)
          const existing = await txDb(store).get(id)
          if (!existing) throw new Error('Document not found')
          const rec = this.updateRecord(existing, this.filterWriteData(data))
          await txDb(store).put(rec)
        },
        delete: async (docPath) => {
          const { store, id } = await this.getStoreAndId(docPath)
          await txDb(store).delete(id)
        },
        read: async (docPath) => {
          const { store, id } = await this.getStoreAndId(docPath)
          return (await txDb(store).get(id)) ?? null
        },
      })
      await tx.done
    } catch (err) {
      tx.abort()
      throw err
    }
  }
}
