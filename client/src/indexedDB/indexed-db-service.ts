import { openDB, type IDBPDatabase } from 'idb'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
  BaseMetadata,
} from '../types/db/db-service-document-types'
import type { TransactionalService } from './indexed-db-types'
import type {
  DBWriteTarget,
  IDBService,
  IndexedDBQueryConstraints,
} from '../types/db/db-service-interface'
import { createFirestoreId } from '../functions/services/firestore-id-service'

// IndexedDBのスキーマが動的であるため、unknownを使用。
// より厳密な型付けが必要な場合は、IDBPDatabase<MyDBSchema>のように具体的に定義できます。
type FlexGenericDB = unknown

export abstract class IndexedDBService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
> implements IDBService<Read, Write>
{
  private dbPromise!: Promise<IDBPDatabase<FlexGenericDB>>
  private dbPathComposition: string[]
  private fixedPath: Record<string, string>
  private currentDBName = '' // 現在開いているDB名 (パスとして使用)
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
    // 初期化時にデフォルトのDBを開く。実際のコレクションパスはgetStoreで処理される。
    this.dbPromise = this.initializeDefaultDB()
  }

  /**
   * デフォルトのIndexedDBとオブジェクトストアを初期化します。
   * これは、サービスが最初にインスタンス化されたときに呼び出される基本設定です。
   * 実際のデータは、getStoreを通じて動的に作成されるストアに保存されます。
   */
  private initializeDefaultDB(): Promise<IDBPDatabase<FlexGenericDB>> {
    const defaultName = 'default-indexeddb-service-db' // デフォルトDB名
    const defaultStore = 'default-store' // デフォルトストア名
    this.currentDBName = defaultName // 現在のDB名を更新

    return openDB<FlexGenericDB>(defaultName, this.currentDBVersion, {
      upgrade(db) {
        // デフォルトストアが存在しない場合のみ作成
        if (!db.objectStoreNames.contains(defaultStore)) {
          db.createObjectStore(defaultStore, { keyPath: 'docId' })
        }
      },
    })
  }

  /**
   * dbPathCompositionと動的セグメント、固定パスを組み合わせて、IndexedDBのDB名/ストア名として使用するパスを生成します。
   * @param segments 動的なパスセグメント（例: ['userA', 'post123']）
   * @returns 生成されたパス文字列（例: 'users/userA/posts/post123'）
   */
  private getDBPath(segments: string[]): string {
    const path: string[] = []
    let segmentIndex = 0

    for (let i = 0; i < this.dbPathComposition.length; i++) {
      const key = this.dbPathComposition[i]
      path.push(key) // コレクション名またはドキュメントキー名を追加

      // パスの最後の要素でない場合、対応するIDを追加
      if (i < this.dbPathComposition.length - 1) {
        if (key in this.fixedPath) {
          // 固定パスに定義されている場合はその値を使用
          path.push(this.fixedPath[key])
        } else {
          // 動的セグメントからIDを取得
          if (segmentIndex >= segments.length) {
            throw new Error(
              `Missing dynamic segment for key "${key}". Expected ${
                this.dbPathComposition.length -
                Object.keys(this.fixedPath).length -
                1
              } dynamic segments, got ${segments.length}.`
            )
          }
          path.push(segments[segmentIndex++]!)
        }
      }
    }

    // 動的セグメントが余っている場合はエラー
    if (segmentIndex < segments.length) {
      throw new Error(
        `Too many dynamic segments provided. Expected ${
          this.dbPathComposition.length - Object.keys(this.fixedPath).length - 1
        }, got ${segments.length}.`
      )
    }

    return path.join('/')
  }

  /**
   * 指定されたコレクションパスに基づいてIndexedDBを開きます。
   * DB名が変更された場合、またはバージョンが異なる場合にDBを再オープンします。
   * @param collectionPath コレクションパスのセグメント
   * @param version 開くDBのバージョン（省略可能、デフォルトは1）
   */
  private async open(
    collectionPath: string[],
    version?: number
  ): Promise<void> {
    const path = this.getDBPath(collectionPath) // DB名とストア名として使用するパスを生成

    // 現在のDB名とバージョンが同じであれば、再オープンは不要
    if (path === this.currentDBName && version === this.currentDBVersion) {
      return
    }

    // 既存のDB接続を閉じ、新しいDB接続を開く
    // IndexedDBの仕様上、新しいオブジェクトストアを作成するにはDBを再オープンし、
    // upgradeイベント内でcreateObjectStoreを呼び出す必要があります。
    const oldDb = await this.dbPromise // 既存のプロミスが解決するのを待つ
    oldDb.close() // 既存のDB接続を閉じる

    this.dbPromise = openDB<FlexGenericDB>(path, version ?? 1, {
      upgrade(db) {
        const storeName = path // パスをストア名として使用
        if (!db.objectStoreNames.contains(storeName)) {
          const store = db.createObjectStore(storeName, { keyPath: 'docId' })
          // createdAtインデックスを作成（クエリ用）
          store.createIndex('createdAt', 'createdAt')
          // isActiveインデックスを作成（ソフトデリートされたアイテムのフィルタリング用）
          store.createIndex('isActive', 'isActive')
        }
      },
    })

    this.currentDBName = path
    this.currentDBVersion = version ?? 1
  }

  /**
   * 指定されたコレクションパスに対応するオブジェクトストア名を取得します。
   * オブジェクトストアが存在しない場合は、DBをアップグレードしてストアを作成します。
   * @param collectionPath コレクションパスのセグメント
   * @returns オブジェクトストア名
   */
  private async getStore(collectionPath: string[] = []): Promise<string> {
    const path = this.getDBPath(collectionPath) // ストア名として使用するパスを生成
    const db = await this.dbPromise // 現在のDBインスタンスを取得

    // オブジェクトストアが存在しない場合、DBをアップグレードしてストアを作成
    if (!db.objectStoreNames.contains(path)) {
      const newVersion = db.version + 1 // 新しいバージョン番号
      // DBを閉じ、新しいバージョンで再オープンしてupgradeイベントをトリガー
      await this.open(collectionPath, newVersion)
      await this.dbPromise // 再オープンが完了するのを待つ
    }

    return path // ストア名として使用するパスを返す
  }

  /**
   * Firestoreのパスから1つ上のドキュメントIDを取得します。
   * 例: "users/userA/notes/note123" -> "userA"
   * @param path - Firestoreのドキュメントパス
   * @returns 親ドキュメントID、または無効なパスの場合はnull
   */
  private getParentDocId(path: string): string | null {
    const segments = path.split('/')
    // パスが最低でも collection/doc/collection/doc の形式であることを確認
    // セグメント数が偶数かつ4以上であること（例: users/userA/posts/postB -> 4セグメント）
    if (segments.length < 4 || segments.length % 2 !== 0) {
      console.warn(`Invalid path format for getParentDocId: ${path}`)
      return null
    }
    // 例: users/userA/notes/note123 -> segments[0]=users, segments[1]=userA, segments[2]=notes, segments[3]=note123
    // 親ドキュメントIDは segments[segments.length - 3]
    return segments[segments.length - 3] || null
  }

  /**
   * ドキュメントパスからストア名とドキュメントIDを取得します。
   * @param documentPath ドキュメントパスのセグメント（例: ['users', 'userA', 'posts', 'post123']）
   * @returns ストア名とドキュメントIDを含むオブジェクト
   */
  private async getStoreAndId(documentPath: string[]) {
    // 最後のセグメントがドキュメントID、それ以外がコレクションパス
    const store = await this.getStore(documentPath.slice(0, -1))
    const id = documentPath.slice(-1)[0]
    return { store, id }
  }

  /**
   * IndexedDBから指定されたドキュメントを読み取ります。
   * @param documentPath ドキュメントパスのセグメント
   * @returns 読み取られたドキュメント、または存在しない場合はnull
   */
  private async getFromDB(documentPath: string[]): Promise<Read | null> {
    const { store, id } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    const data = (await db.get(store, id)) as Read | undefined // undefinedの可能性を考慮

    if (!data) return null

    // 親ドキュメントIDを設定 (パスが存在する場合のみ)
    if (data.path) {
      data.parentId = this.getParentDocId(data.path)
    }
    return data
  }

  // サブクラスが不要なフィールドを除外するためのフック
  protected abstract filterWriteData<T extends Write | Partial<Write>>(
    data: T
  ): T

  // サブクラスが作成者のUIDを取得するためのフック
  protected abstract getCreatorUid(): string

  /**
   * 新しいレコードのシステムフィールド（docId, path, タイムスタンプなど）を組み立てます。
   * @param data 書き込みデータ
   * @param id ドキュメントID
   * @returns システムフィールドが追加されたレコード
   */
  private createRecord(data: Write, id: string): any {
    const now = Date.now()
    const fullPath = `${this.currentDBName}/${id}` // 現在のDB名（パス）をベースにパスを生成
    return {
      ...data,
      docId: id,
      path: fullPath,
      createdById: this.getCreatorUid(),
      createdAt: now,
      updatedAt: now,
      isActive: true, // デフォルトでアクティブ
    }
  }

  /**
   * 既存のレコードを更新するためのシステムフィールド（updatedAtなど）を組み立てます。
   * @param existing 既存のレコード
   * @param updates 更新データ
   * @returns 更新されたレコード
   */
  private updateRecord(existing: any, updates: Partial<Write>): any {
    return {
      ...existing,
      ...updates,
      updatedAt: Date.now(),
    }
  }

  /**
   * 新しいドキュメントを作成します。
   * @param data 書き込みデータ
   * @param collectionPath コレクションパスのセグメント（省略可能）
   * @returns 作成されたドキュメントのIDとパス
   */
  public async create(
    data: Write,
    collectionPath: string[] = []
  ): Promise<DBWriteTarget> {
    const store = await this.getStore(collectionPath)
    const id = createFirestoreId() // ユニークなIDを生成
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered, id)
    const db = await this.dbPromise
    await db.put(store, record) // レコードをストアに追加/更新
    return { id, path: `${store}/${id}` }
  }

  /**
   * 指定されたIDで新しいドキュメントを作成します。
   * @param data 書き込みデータ
   * @param documentPath ドキュメントパスのセグメント（IDを含む）
   * @returns 作成されたドキュメントのIDとパス
   */
  public async createWithId(
    data: Write,
    documentPath: string[]
  ): Promise<DBWriteTarget> {
    const { store, id } = await this.getStoreAndId(documentPath)
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered as Write, id) // Write型にキャスト
    const db = await this.dbPromise
    await db.put(store, record)
    return { id, path: `${store}/${id}` }
  }

  /**
   * 指定されたドキュメントを読み取ります。
   * @param documentPath ドキュメントパスのセグメント
   * @returns 読み取られたドキュメント、または存在しない場合はnull
   */
  public async read(documentPath: string[]): Promise<Read | null> {
    return await this.getFromDB(documentPath)
  }

  /**
   * 指定されたドキュメントを更新します。
   * @param data 更新データ
   * @param documentPath ドキュメントパスのセグメント
   * @returns 更新されたドキュメントのIDとパス
   */
  public async update(
    data: Partial<Write>,
    documentPath: string[]
  ): Promise<DBWriteTarget> {
    const existing = await this.getFromDB(documentPath)
    if (!existing) {
      throw new Error(`Document not found at path: ${documentPath.join('/')}`)
    }

    // 既存のデータと更新データをマージし、フィルタリングを適用
    const mergedData = { ...existing, ...data } as Partial<Write> // 型をWriteにキャスト
    const filteredUpdates = this.filterWriteData(mergedData) // マージされたデータ全体をフィルタリング

    // 既存のレコードを更新データで上書きし、updatedAtを更新
    const updated = this.updateRecord(existing, filteredUpdates)

    const { id, store } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    await db.put(store, updated)
    return { id, path: `${store}/${id}` }
  }

  /**
   * 指定されたドキュメントを物理的に削除します。
   * @param documentPath ドキュメントパスのセグメント
   */
  public async hardDelete(documentPath: string[]): Promise<void> {
    const { store, id } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    await db.delete(store, id)
  }

  /**
   * 指定されたドキュメントを論理的に削除します（isActiveをfalseに設定）。
   * @param documentPath ドキュメントパスのセグメント
   * @param updateFields 追加で更新するフィールド（省略可能）
   */
  public async softDelete(
    documentPath: string[],
    updateFields: Partial<Write> = {}
  ): Promise<void> {
    const existing = await this.getFromDB(documentPath)
    if (!existing) {
      throw new Error(
        `Document not found for soft delete at path: ${documentPath.join('/')}`
      )
    }

    // 既存のデータと追加の更新フィールドをマージし、フィルタリングを適用
    const mergedData = { ...existing, ...updateFields } as Partial<Write>
    const filteredUpdates = this.filterWriteData(mergedData)

    // 更新されたレコードを作成し、isActiveとdeletedAtを設定
    const updated = this.updateRecord(existing, filteredUpdates)
    updated.isActive = false
    updated.deletedAt = Date.now()

    const { store } = await this.getStoreAndId(documentPath)
    const db = await this.dbPromise
    await db.put(store, updated)
  }

  /**
   * 指定されたコレクションのすべてのドキュメントを取得します。
   * クエリ制約（インデックス、オフセット、リミット）を適用できます。
   * @param collectionPath コレクションパスのセグメント（省略可能）
   * @param queryConstraints クエリ制約（インデックス、値、オフセット、リミット）
   * @returns フィルタリングされたドキュメントの配列
   */
  public async getAll(
    collectionPath: string[] = [],
    queryConstraints: IndexedDBQueryConstraints<keyof Read> = {
      type: 'indexedDB',
    }
  ): Promise<Read[]> {
    const storeName = await this.getStore(collectionPath)
    const db = await this.dbPromise
    let items: Read[] = []

    const tx = db.transaction(storeName, 'readonly')
    const objectStore = tx.objectStore(storeName)

    if (queryConstraints.index && queryConstraints.value !== undefined) {
      // 指定されたインデックスと値でクエリ
      const index = objectStore.index(queryConstraints.index as string)
      items = await index.getAll(queryConstraints.value)
    } else {
      // 全てのアイテムを取得
      items = await objectStore.getAll()
    }
    await tx.done // トランザクションの完了を待つ

    // オフセットとリミットを適用
    const start = queryConstraints.offset ?? 0
    const end = queryConstraints.limit
      ? start + queryConstraints.limit
      : undefined
    return items.slice(start, end)
  }

  /**
   * 指定されたフィールドと値に一致する最初のドキュメントを取得します。
   * @param field 検索するフィールド名
   * @param value 検索する値
   * @param collectionPath コレクションパスのセグメント（省略可能）
   * @returns 一致する最初のドキュメント、またはnull
   */
  public async getFirstMatch(
    field: keyof (Write | BaseMetadata),
    value: any,
    collectionPath: string[] = []
  ): Promise<Read | null> {
    const results = await this.getAll(collectionPath, {
      type: 'indexedDB',
      index: field,
      value,
    })
    return results[0] ?? null
  }

  /**
   * IndexedDBトランザクション内で一連のアクションを実行します。
   * @param storeNames トランザクションに含めるオブジェクトストア名の配列
   * @param actions トランザクション内で実行する非同期関数。TransactionalServiceインスタンスを受け取ります。
   */
  public async runTransaction(
    storeNames: string[], // トランザクションに含めるストア名を明示的に指定
    actions: (txService: TransactionalService<Read, Write>) => Promise<void>
  ): Promise<void> {
    const db = await this.dbPromise
    // トランザクションのスコープを限定
    const tx = db.transaction(storeNames, 'readwrite')

    // トランザクション内のオブジェクトストアへのアクセスを簡素化するヘルパー
    const getTxStore = (storeName: string) => tx.objectStore(storeName)

    try {
      await actions({
        create: async (data, path = []) => {
          const store = await this.getStore(path) // トランザクション外でストア名を取得
          const id = createFirestoreId()
          const rec = this.createRecord(this.filterWriteData(data), id)
          await getTxStore(store).add(rec) // addを使用（putは既存を上書き）
          return id
        },
        update: async (data, docPath) => {
          const { store, id } = await this.getStoreAndId(docPath) // トランザクション外でストア名とIDを取得
          const existing = await getTxStore(store).get(id)
          if (!existing)
            throw new Error('Document not found in transaction for update')
          const rec = this.updateRecord(existing, this.filterWriteData(data))
          await getTxStore(store).put(rec)
        },
        delete: async (docPath) => {
          const { store, id } = await this.getStoreAndId(docPath) // トランザクション外でストア名とIDを取得
          await getTxStore(store).delete(id)
        },
        read: async (docPath) => {
          const { store, id } = await this.getStoreAndId(docPath) // トランザクション外でストア名とIDを取得
          return (await getTxStore(store).get(id)) ?? null
        },
      })
      await tx.done // トランザクションの完了を待つ
    } catch (err) {
      tx.abort() // エラー発生時はトランザクションを中止
      console.error('IndexedDB transaction failed:', err)
      throw err // エラーを再スロー
    }
  }
}
