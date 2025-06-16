import { Timestamp } from 'firebase/firestore'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../firestore-document-types'
import type { Gender } from '../../util-document-types'

interface UserData {
  displayName: string
  birthdate: Timestamp
  gender: Gender
}

export type UserRead = BaseDocumentRead & UserData
export type UserWrite = BaseDocumentWrite & UserData
