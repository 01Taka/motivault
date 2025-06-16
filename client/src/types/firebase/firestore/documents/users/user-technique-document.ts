import type { Timestamp } from 'firebase/firestore'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../firestore-document-types'

interface UserTechniqueData {
  id: string
  totalExp: number
  isArchived: boolean
  startedAt: Timestamp
  lastUsedAt: Timestamp
}

export type UserTechniqueRead = BaseDocumentRead & UserTechniqueData
export type UserTechniqueWrite = BaseDocumentWrite & UserTechniqueData
