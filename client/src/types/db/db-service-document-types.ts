import { type DocumentData } from 'firebase/firestore'
import type z from 'zod'
import type {
  BaseMetadataSchema,
  DocumentReadSchema,
  DocumentWriteSchema,
} from './db-service-document-schema'

// すべての動的Firestoreドキュメントに存在するべきフィールド
export type BaseDocumentWrite = z.infer<typeof DocumentWriteSchema>

export type BaseMetadata = z.infer<typeof BaseMetadataSchema>

export type BaseDocumentRead = z.infer<typeof DocumentReadSchema>

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
