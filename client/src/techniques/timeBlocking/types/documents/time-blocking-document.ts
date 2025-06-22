import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../../../types/firebase/firestore/firestore-document-types'

export interface TimeBlockingTag {
  name: string
  color: string
}

export type TimeBlockingTags = Record<string, TimeBlockingTag>

export interface TimeBlockingData {
  tags: TimeBlockingTags
}

export type TimeBlockingRead = BaseDocumentRead & TimeBlockingData
export type TimeBlockingWrite = BaseDocumentWrite & TimeBlockingData
