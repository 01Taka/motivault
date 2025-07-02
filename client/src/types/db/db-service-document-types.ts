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

type RemoveUndefined<T> = T extends undefined ? never : T

export type StripUndefined<T> = {
  [K in keyof T]-?: RemoveUndefined<T[K]>
}

export type MakeOptionalIfUndefined<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<
    T[K],
    undefined
  >
} & {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}

export type MakeDocumentRead<T> = StripUndefined<T> & BaseDocumentRead
export type MakeDocumentWrite<T> = MakeOptionalIfUndefined<T> &
  BaseDocumentWrite
