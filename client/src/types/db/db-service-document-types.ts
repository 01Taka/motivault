import { type DocumentData } from 'firebase/firestore'

// すべての動的Firestoreドキュメントに存在するべきフィールド
export type BaseDocumentWrite = DocumentData

export interface BaseDocumentRead extends DocumentData {
  path: string
  parentId: string
  createdById: string // 作成者のUserId
  docId: string // ドキュメントId
  createdAt: number // 作成日時
  updatedAt: number // 更新日時
  deletedAt?: number // 削除日時
  isActive: boolean // 論理的削除の状態
}

export type BaseDocument = DocumentData
