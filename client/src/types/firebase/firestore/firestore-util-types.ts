import type { FieldValue } from 'firebase/firestore'
import type {
  BaseDocumentWrite,
  BaseDocumentRead,
} from '../../db/db-service-document-types'

export interface SoftDeleteAdditionalField {
  isActive: false
  deletedAt: FieldValue
}

export type DocumentWrite<T> = T & BaseDocumentWrite
export type DocumentRead<T> = T & BaseDocumentRead

export type RemoveFieldValue<T> = T extends FieldValue
  ? never
  : T extends (infer U)[]
    ? RemoveFieldValue<U>[]
    : T extends object
      ? { [K in keyof T]: RemoveFieldValue<T[K]> }
      : T
