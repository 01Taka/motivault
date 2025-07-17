import {
  Firestore,
  collection,
  doc,
  CollectionReference,
  DocumentReference,
  type DocumentData,
} from 'firebase/firestore'

/**
 * Firestoreのコレクションおよびドキュメント参照を管理するユーティリティクラス。
 * 固定パス（fixedPath）と動的パス（dynamicDocIds）を組み合わせて参照を生成します。
 */
class CollectionManager {
  /**
   * コレクション名とドキュメントIDから CollectionReference または DocumentReference を取得します。
   *
   * @param firestore - Firestore インスタンス。
   * @param collectionNames - コレクション名の配列（例: ['users', 'posts']）。
   * @param dynamicDocIds - 各コレクション間に挟む動的なドキュメントIDの配列（例: ['userId', 'postId']）。
   * fixedPathで指定されないIDのみをここに入力します。
   * @param fixedPath - 固定ドキュメントIDのマップ（例: { users: 'admin' }）。コレクション名をキーとし、固定IDを値とします。
   * @param refType - 'collection' ならコレクション参照、'doc' ならドキュメント参照を返します。
   * @returns 生成された CollectionReference または DocumentReference。
   */
  static getReference(
    firestore: Firestore,
    collectionNames: string | string[],
    dynamicDocIds: string[], // 動的なドキュメントIDのみを受け取る
    fixedPath: Record<string, string>,
    refType: 'collection' | 'doc'
  ): CollectionReference<DocumentData> | DocumentReference<DocumentData> {
    const collections = Array.isArray(collectionNames)
      ? collectionNames
      : [collectionNames]

    // パスを合成
    const path = this.composePath(
      collections,
      dynamicDocIds,
      fixedPath,
      refType
    )

    // 参照タイプに基づいて適切なFirestore参照を返す
    return refType === 'collection'
      ? collection(firestore, path)
      : doc(firestore, path)
  }

  /**
   * コレクションとドキュメントIDの配列を合成してFirestoreパスを作成します。
   * 固定パスと動的パスのロジックを統合します。
   *
   * @param collectionNames - コレクション名の配列（例: ['users', 'posts']）。
   * @param dynamicDocIds - 各コレクション間に挟む動的なドキュメントIDの配列（例: ['userId', 'postId']）。
   * fixedPathで指定されないIDのみをここに入力します。
   * @param fixedPath - 固定ドキュメントIDのマップ（例: { users: 'admin' }）。コレクション名をキーとし、固定IDを値とします。
   * @param refType - 'collection' ならコレクション参照、'doc' ならドキュメント参照を生成するパス。
   * @returns 合成されたパス文字列（例: 'users/admin/posts/postId123'）。
   * @throws Error パスに必要な動的ドキュメントIDが不足している場合、または多すぎる場合。
   */
  static composePath(
    collectionNames: string[],
    dynamicDocIds: string[],
    fixedPath: Record<string, string>,
    refType: 'collection' | 'doc'
  ): string {
    const parts: string[] = []
    let dynamicIdIndex = 0 // dynamicDocIds配列の現在位置

    let numDocIdsRequired = 0 // パス全体で必要となるドキュメントIDの総数
    let numFixedIdsUsed = 0 // fixedPathから提供されるドキュメントIDの数

    // パス構築前に、必要なドキュメントIDの総数と固定IDの数を事前に計算
    for (let i = 0; i < collectionNames.length; i++) {
      const currentCollectionName = collectionNames[i]
      // このコレクション名の後にドキュメントIDが必要かどうかを判断
      // (最後のコレクションでない場合、または最後のコレクションでドキュメント参照が必要な場合)
      const docIdIsRequired =
        i < collectionNames.length - 1 ||
        (i === collectionNames.length - 1 && refType === 'doc')

      if (docIdIsRequired) {
        numDocIdsRequired++ // 必要なドキュメントIDの総数をカウント
        if (fixedPath[currentCollectionName]) {
          numFixedIdsUsed++ // fixedPathから供給されるIDをカウント
        }
      }
    }

    // 期待される動的IDの数を計算
    const expectedDynamicIds = numDocIdsRequired - numFixedIdsUsed

    // 実際のパス構築ループ
    for (let i = 0; i < collectionNames.length; i++) {
      const currentCollectionName = collectionNames[i]
      parts.push(currentCollectionName) // コレクション名を追加

      // 最後のコレクションでない場合、または最後のコレクションでドキュメント参照が必要な場合、
      // このコレクション名の後にドキュメントIDを追加する必要がある
      const docIdIsRequired =
        i < collectionNames.length - 1 ||
        (i === collectionNames.length - 1 && refType === 'doc')

      if (docIdIsRequired) {
        if (fixedPath[currentCollectionName]) {
          // 固定IDがfixedPathに存在する場合、それを使用
          parts.push(fixedPath[currentCollectionName])
        } else {
          // 固定IDが存在しない場合、動的IDを使用
          if (dynamicIdIndex >= dynamicDocIds.length) {
            // 必要な動的IDが不足している場合のエラー
            throw new Error(
              `Missing dynamic document ID for collection "${currentCollectionName}". ` +
                `Expected ${expectedDynamicIds} dynamic IDs in total, but only ${dynamicIdIndex} were provided so far.`
            )
          }
          parts.push(dynamicDocIds[dynamicIdIndex++]) // 動的IDを追加し、インデックスを進める
        }
      }
    }

    // すべての動的IDが消費されたか確認
    if (dynamicIdIndex < dynamicDocIds.length) {
      // 期待されるよりも多くの動的IDが提供された場合のエラー
      throw new Error(
        `Too many dynamic document IDs provided. Expected ${expectedDynamicIds}, but got ${dynamicDocIds.length}.`
      )
    }

    return parts.join('/')
  }
}

export default CollectionManager
