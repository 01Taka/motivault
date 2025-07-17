import { openDB, type IDBPDatabase, type IDBPObjectStore } from 'idb'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
  BaseDocument,
  BaseMetadata, // BaseDocument型を追加
} from '../types/db/db-service-document-types'
import type { TransactionalService } from './indexed-db-types'
import type {
  DBWriteTarget,
  IDBService,
  IndexedDBQueryConstraints,
} from '../types/db/db-service-interface'
import { createFirestoreId } from '../functions/services/firestore-id-service'
import CollectionManager from '../firebase/firestore/handler/collection-manager'

// IndexedDBのスキーマが動的であるため、unknownを使用。
// より厳密な型付けが必要な場合は、IDBPDatabase<MyDBSchema>のように具体的に定義できます。
type FlexGenericDB = unknown

export abstract class IndexedDBService<
  Read extends BaseDocumentRead,
  Write extends BaseDocumentWrite,
  Document extends BaseDocument = Write, // Document型をジェネリクスに追加
> implements IDBService<Read, Write>
{
  // IndexedDBのデータベース名とオブジェクトストア名（アプリケーション全体で共有）
  private static dbName = 'appCacheDB' // データベース名
  private static storeName = 'documents' // 全てのドキュメントを保存する単一のオブジェクトストア

  private dbPromise!: Promise<IDBPDatabase<FlexGenericDB>>
  private collectionPathComposition: string[] // 例: ['users', 'userId', 'posts', 'postId']
  private fixedPath: Record<string, string> // 例: { userId: 'abc123' }
  private currentDBVersion: number // 現在のデータベースバージョン

  /**
   * IndexedDBServiceのコンストラクタ。
   * アプリケーションのデータ構造を定義し、IndexedDB接続を初期化します。
   *
   * @param dbPathComposition Firestoreライクなコレクションパスの構成要素。例: ['users', 'userId', 'posts', 'postId']
   * @param fixedPath 固定ドキュメントIDのマップ。例: { userId: 'abc123' }
   * @param version IndexedDBの初期バージョン。スキーマ変更時に必要。
   */
  constructor(
    dbPathComposition: string | string[],
    fixedPath: Record<string, string> = {},
    version = 1
  ) {
    this.collectionPathComposition = Array.isArray(dbPathComposition)
      ? dbPathComposition
      : [dbPathComposition]
    if (!this.collectionPathComposition.length) {
      throw new Error('dbPathComposition must contain at least one element')
    }

    this.fixedPath = fixedPath
    this.currentDBVersion = version
    // アプリケーション全体で共有される単一のIndexedDBデータベースを初期化
    this.dbPromise = this.initializeDB()
  }

  /**
   * IndexedDBデータベースと、全てのドキュメントを保存する単一のオブジェクトストアを初期化します。
   * このメソッドは、データベースのバージョンアップグレード時に、新しいインデックスやストアの作成を処理します。
   */
  private initializeDB(): Promise<IDBPDatabase<FlexGenericDB>> {
    return openDB<FlexGenericDB>(
      IndexedDBService.dbName,
      this.currentDBVersion,
      {
        upgrade: (db, oldVersion, newVersion, transaction) => {
          console.log(`IndexedDB upgrade: from ${oldVersion} to ${newVersion}`)
          let store: IDBPObjectStore<
            unknown,
            ArrayLike<string>,
            string,
            'versionchange'
          >

          // 'documents'ストアが存在しない場合のみ作成
          if (!db.objectStoreNames.contains(IndexedDBService.storeName)) {
            // keyPathを'path'に設定。これはドキュメントの完全な論理パス文字列となる。
            store = db.createObjectStore(IndexedDBService.storeName, {
              keyPath: 'path',
            })
            console.log(`Object store '${IndexedDBService.storeName}' created.`)
          } else {
            // ストアが既に存在する場合は取得
            store = transaction.objectStore(IndexedDBService.storeName)
          }

          // 必要なインデックスを作成または確認
          // インデックスは冪等に作成されるため、既に存在しても問題ない
          if (!store.indexNames.contains('createdAt')) {
            store.createIndex('createdAt', 'createdAt')
            console.log("Index 'createdAt' created.")
          }
          if (!store.indexNames.contains('updatedAt')) {
            store.createIndex('updatedAt', 'updatedAt')
            console.log("Index 'updatedAt' created.")
          }
          if (!store.indexNames.contains('isActive')) {
            store.createIndex('isActive', 'isActive')
            console.log("Index 'isActive' created.")
          }
          if (!store.indexNames.contains('createdById')) {
            store.createIndex('createdById', 'createdById')
            console.log("Index 'createdById' created.")
          }
          if (!store.indexNames.contains('logicalType')) {
            store.createIndex('logicalType', 'logicalType')
            console.log("Index 'logicalType' created.")
          }

          // ここで、dbPathCompositionに基づいて動的なインデックスを作成することも可能
          // 例: store.createIndex('userId', 'userId');
          // ただし、全てのドキュメントにこれらのフィールドが存在しない可能性があるため、注意が必要
        },
      }
    )
  }

  /**
   * 現在のコレクションパス構成と動的セグメント、固定パスを組み合わせて、
   * ドキュメントの完全な論理パス文字列を生成します。
   * このパスがIndexedDBのdocId（主キー）として使用されます。
   *
   * @param dynamicDocIds 動的なパスセグメント（例: ['userA', 'post123']）
   * @param refType 'collection'ならコレクションパス、'doc'ならドキュメントパスを生成
   * @returns 生成された完全な論理パス文字列（例: 'users/userA/posts/post123'）
   */
  private composeDocumentLogicalPath(
    dynamicDocIds: string[],
    refType: 'collection' | 'doc'
  ): string {
    return CollectionManager.composePath(
      this.collectionPathComposition,
      dynamicDocIds,
      this.fixedPath,
      refType
    )
  }

  /**
   * ドキュメントの論理パスから親ドキュメントIDを取得します。
   * 例: "users/userA/notes/note123" -> "userA"
   *
   * @param path - ドキュメントの完全な論理パス
   * @returns 親ドキュメントID、または無効なパスの場合はnull
   */
  private getParentDocId(path: string): string | null {
    const segments = path.split('/')
    // パスが最低でも collection/doc/collection/doc の形式であることを確認
    // セグメント数が偶数かつ4以上であること（例: users/userA/posts/postB -> 4セグメント）
    if (segments.length < 4 || segments.length % 2 !== 0) {
      // console.warn(`Invalid path format for getParentDocId: ${path}`); // 頻繁な警告を避けるためコメントアウト
      return null
    }
    // 例: users/userA/notes/note123 -> segments[0]=users, segments[1]=userA, segments[2]=notes, segments[3]=note123
    // 親ドキュメントIDは segments[segments.length - 3]
    return segments[segments.length - 3] || null
  }

  /**
   * ドキュメントパス（動的IDの配列）からIndexedDBのdocId（完全な論理パス）と、
   * そのパスの最後のセグメント（ドキュメントID自体）を取得します。
   *
   * @param documentPathSegments ドキュメントパスの動的IDセグメント（例: ['userA', 'post123']）
   * @returns IndexedDBのdocId（完全な論理パス）と、パスの最後のセグメント（ID）を含むオブジェクト
   */
  private getPathAndId(documentPathSegments: string[]): {
    path: string
    id: string
  } {
    const fullLogicalPath = this.composeDocumentLogicalPath(
      documentPathSegments,
      'doc'
    )
    const id = documentPathSegments[documentPathSegments.length - 1] // 最後のセグメントがID
    return { path: fullLogicalPath, id }
  }

  /**
   * IndexedDBから指定されたドキュメントを読み取ります。
   *
   * @param documentPathSegments ドキュメントパスの動的IDセグメント
   * @returns 読み取られたドキュメント、または存在しない場合はnull
   */
  private async getFromDB(
    documentPathSegments: string[]
  ): Promise<Read | null> {
    const { path } = this.getPathAndId(documentPathSegments)
    const db = await this.dbPromise
    const data = (await db.get(IndexedDBService.storeName, path)) as
      | Read
      | undefined

    if (!data) return null

    // 親ドキュメントIDを設定 (パスが存在する場合のみ)
    if (data.path) {
      // docIdが完全なパスとして設定されている
      data.parentId = this.getParentDocId(data.path)
    }
    return data
  }

  // サブクラスが不要なフィールドを除外した書き込みデータを返します。
  protected abstract filterWriteData<T extends Write | Partial<Write>>(
    data: T
  ): T extends Write ? Document : Partial<Document>

  // サブクラスが作成者のUIDを取得するためのフック
  protected abstract getCreatorUid(): string

  /**
   * ドキュメントの論理的な種類（例: 'user', 'post'）を取得します。
   * これは、`collectionPathComposition`の最後のコレクション名から取得するのが一般的です。
   */
  protected getLogicalType(): string {
    // collectionPathCompositionの最後の要素がコレクション名と仮定
    return (
      this.collectionPathComposition[
        this.collectionPathComposition.length - 1
      ] || 'unknown'
    )
  }

  /**
   * 新しいレコードのシステムフィールドとIndexedDBのdocId（完全な論理パス）を組み立てます。
   *
   * @param data 書き込みデータ
   * @param fullLogicalPath ドキュメントの完全な論理パス文字列（これがIndexedDBのkeyPathとなる）
   * @param id ドキュメントの最後のセグメントID
   * @returns システムフィールドが追加されたレコード
   */
  private createRecord(
    data: Document,
    fullLogicalPath: string,
    id: string
  ): any {
    const now = Date.now()
    return {
      ...data,
      docId: id, // これはFirestoreServiceのdocIdに相当する最後のセグメントID
      path: fullLogicalPath, // IndexedDBのkeyPathとして使用される完全な論理パス
      logicalType: this.getLogicalType(), // ドキュメントの論理的な種類
      createdById: this.getCreatorUid(),
      createdAt: now,
      updatedAt: now,
      isActive: true, // デフォルトでアクティブ
      // 必要に応じて、各階層のIDを個別のフィールドとして追加することも可能
      // 例: userId: dynamicDocIds[0], postId: dynamicDocIds[1] など
    }
  }

  /**
   * 既存のレコードを更新するためのシステムフィールド（updatedAtなど）を組み立てます。
   *
   * @param existing 既存のレコード
   * @param updates 更新データ
   * @returns 更新されたレコード
   */
  private updateRecord(existing: any, updates: Partial<Document>): any {
    return {
      ...existing,
      ...updates,
      updatedAt: Date.now(),
    }
  }

  /**
   * 新しいドキュメントを作成します。
   *
   * @param data 書き込みデータ
   * @param collectionPathSegments コレクションパスの動的IDセグメント（例: ['userA'] for 'users/userA/posts'）
   * @returns 作成されたドキュメントのID（最後のセグメントID）と完全な論理パス
   */
  public async create(
    data: Write,
    collectionPathSegments: string[] = []
  ): Promise<DBWriteTarget> {
    const newDocIdSegment = createFirestoreId() // 新しいドキュメントの最後のIDセグメントを生成
    const fullDynamicDocIds = [...collectionPathSegments, newDocIdSegment] // 完全な動的IDセグメント配列

    const fullLogicalPath = this.composeDocumentLogicalPath(
      fullDynamicDocIds,
      'doc'
    ) // IndexedDBのkeyPathとなる完全パス
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(
      filtered as Document,
      fullLogicalPath,
      newDocIdSegment
    ) // レコードを作成

    const db = await this.dbPromise

    await db.put(IndexedDBService.storeName, record) // レコードをストアに追加/更新

    return { id: newDocIdSegment, path: fullLogicalPath } // 戻り値は最後のIDと完全パス
  }

  /**
   * 指定されたIDで新しいドキュメントを作成します。
   *
   * @param data 書き込みデータ
   * @param documentPathSegments ドキュメントパスの動的IDセグメント（最後の要素が指定IDとなる）
   * @returns 作成されたドキュメントのID（最後のセグメントID）と完全な論理パス
   */
  public async createWithId(
    data: Write,
    documentPathSegments: string[]
  ): Promise<DBWriteTarget> {
    const { path: fullLogicalPath, id } =
      this.getPathAndId(documentPathSegments) // 完全パスとIDを取得
    const filtered = this.filterWriteData(data)
    const record = this.createRecord(filtered as Document, fullLogicalPath, id) // レコードを作成

    const db = await this.dbPromise
    await db.put(IndexedDBService.storeName, record)
    return { id, path: fullLogicalPath }
  }

  /**
   * 指定されたドキュメントを読み取ります。
   *
   * @param documentPathSegments ドキュメントパスの動的IDセグメント
   * @returns 読み取られたドキュメント、または存在しない場合はnull
   */
  public async read(documentPathSegments: string[]): Promise<Read | null> {
    return await this.getFromDB(documentPathSegments)
  }

  /**
   * 指定されたドキュメントを更新します。
   *
   * @param data 更新データ
   * @param documentPathSegments ドキュメントパスの動的IDセグメント
   * @returns 更新されたドキュメントのID（最後のセグメントID）と完全な論理パス
   */
  public async update(
    data: Partial<Write>,
    documentPathSegments: string[]
  ): Promise<DBWriteTarget> {
    const existing = await this.getFromDB(documentPathSegments)
    if (!existing) {
      throw new Error(
        `Document not found at path: ${this.composeDocumentLogicalPath(documentPathSegments, 'doc')}`
      )
    }

    const mergedData = { ...existing, ...data } as Partial<Write> // Write型にキャストしてfilterWriteDataに渡す
    const filteredUpdates = this.filterWriteData(mergedData) // マージされたデータ全体をフィルタリング

    const updated = this.updateRecord(existing, filteredUpdates as Document) // 既存のレコードを更新データで上書きし、updatedAtを更新

    const { path: fullLogicalPath, id } =
      this.getPathAndId(documentPathSegments)
    const db = await this.dbPromise
    await db.put(IndexedDBService.storeName, updated)
    return { id, path: fullLogicalPath }
  }

  /**
   * 指定されたドキュメントを物理的に削除します。
   *
   * @param documentPathSegments ドキュメントパスの動的IDセグメント
   */
  public async hardDelete(documentPathSegments: string[]): Promise<void> {
    const { path: fullLogicalPath } = this.getPathAndId(documentPathSegments) // 完全な論理パスを取得
    const db = await this.dbPromise
    await db.delete(IndexedDBService.storeName, fullLogicalPath) // keyPathである完全パスで削除
  }

  /**
   * 指定されたドキュメントを論理的に削除します（isActiveをfalseに設定）。
   *
   * @param documentPathSegments ドキュメントパスの動的IDセグメント
   * @param updateFields 追加で更新するフィールド（省略可能）
   */
  public async softDelete(
    documentPathSegments: string[],
    updateFields: Partial<Write> = {}
  ): Promise<void> {
    const existing = await this.getFromDB(documentPathSegments)
    if (!existing) {
      throw new Error(
        `Document not found for soft delete at path: ${this.composeDocumentLogicalPath(documentPathSegments, 'doc')}`
      )
    }

    const mergedData = { ...existing, ...updateFields } as Partial<Write>
    const filteredUpdates = this.filterWriteData(mergedData)

    const updated = this.updateRecord(existing, filteredUpdates)
    updated.isActive = false
    updated.deletedAt = Date.now()

    const db = await this.dbPromise
    await db.put(IndexedDBService.storeName, updated)
  }

  /**
   * 指定されたコレクションのすべてのドキュメントを取得します。
   * クエリ制約（インデックス、オフセット、リミット）を適用できます。
   *
   * @param collectionPathSegments コレクションパスの動的IDセグメント（例: ['userA'] for 'users/userA/posts'）
   * @param queryConstraints クエリ制約（インデックス、値、オフセット、リミット）
   * @returns フィルタリングされたドキュメントの配列
   */
  public async getAll(
    collectionPathSegments: string[] = [],
    queryConstraints: IndexedDBQueryConstraints<keyof Read> = {
      type: 'indexedDB',
    }
  ): Promise<Read[]> {
    const db = await this.dbPromise
    let items: Read[] = []

    const tx = db.transaction(IndexedDBService.storeName, 'readonly')
    const objectStore = tx.objectStore(IndexedDBService.storeName)

    if (queryConstraints.index && queryConstraints.value !== undefined) {
      // 指定されたインデックスと値でクエリ
      const index = objectStore.index(queryConstraints.index as string)
      items = await index.getAll(queryConstraints.value)
    } else {
      // コレクションパスの範囲クエリ（例: 'users/userA/posts/' で始まる全てのドキュメント）
      // '\uffff' はUnicodeの最大値で、前方一致検索の終端として使用
      const collectionPathPrefix = this.composeDocumentLogicalPath(
        collectionPathSegments,
        'collection'
      )
      const range = IDBKeyRange.bound(
        collectionPathPrefix,
        collectionPathPrefix + '\uffff',
        false,
        false
      )
      items = await objectStore.getAll(range)
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
   *
   * @param field 検索するフィールド名
   * @param value 検索する値
   * @param collectionPathSegments コレクションパスの動的IDセグメント（省略可能）
   * @returns 一致する最初のドキュメント、またはnull
   */
  public async getFirstMatch(
    field: keyof (Write | BaseMetadata),
    value: any,
    collectionPathSegments: string[] = []
  ): Promise<Read | null> {
    const results = await this.getAll(collectionPathSegments, {
      type: 'indexedDB',
      index: field as keyof (Write | BaseMetadata), // ReadとWriteで型が異なる場合があるためキャスト
      value,
    })
    return results[0] ?? null
  }

  /**
   * IndexedDBトランザクション内で一連のアクションを実行します。
   *
   * @param storeNames トランザクションに含めるオブジェクトストア名の配列（この実装では単一ストアなので、IndexedDBService.storeNameのみ）
   * @param actions トランザクション内で実行する非同期関数。TransactionalServiceインスタンスを受け取ります。
   */
  public async runTransaction(
    actions: (txService: TransactionalService<Read, Write>) => Promise<void>
  ): Promise<void> {
    const db = await this.dbPromise
    // トランザクションのスコープを限定
    const tx = db.transaction(IndexedDBService.storeName, 'readwrite') // 単一ストア名を使用

    // トランザクション内のオブジェクトストアへのアクセスを簡素化するヘルパー
    const objectStore = tx.objectStore(IndexedDBService.storeName)

    try {
      await actions({
        create: async (data, collectionPathSegments = []) => {
          const newDocIdSegment = createFirestoreId() // 新しいドキュメントの最後のIDセグメントを生成
          const fullDynamicDocIds = [...collectionPathSegments, newDocIdSegment] // 完全な動的IDセグメント配列
          const fullLogicalPath = this.composeDocumentLogicalPath(
            fullDynamicDocIds,
            'doc'
          ) // IndexedDBのkeyPathとなる完全パス

          const rec = this.createRecord(
            this.filterWriteData(data) as Document,
            fullLogicalPath,
            newDocIdSegment
          )
          await objectStore.add(rec) // addを使用（putは既存を上書き）
          return newDocIdSegment // 戻り値は最後のIDセグメント
        },
        update: async (data, documentPathSegments) => {
          const { path: fullLogicalPath } =
            this.getPathAndId(documentPathSegments)
          const existing = await objectStore.get(fullLogicalPath)
          if (!existing)
            throw new Error('Document not found in transaction for update')
          const rec = this.updateRecord(existing, this.filterWriteData(data))
          await objectStore.put(rec)
        },
        delete: async (documentPathSegments) => {
          const { path: fullLogicalPath } =
            this.getPathAndId(documentPathSegments)
          await objectStore.delete(fullLogicalPath)
        },
        read: async (documentPathSegments) => {
          const { path: fullLogicalPath } =
            this.getPathAndId(documentPathSegments)
          return (await objectStore.get(fullLogicalPath)) ?? null
        },
      })
      await tx.done
    } catch (err) {
      tx.abort()
      console.error('IndexedDB transaction failed:', err)
      throw err
    }
  }
}
