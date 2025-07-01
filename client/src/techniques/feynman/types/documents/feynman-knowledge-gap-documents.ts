import type {
  BaseDocument,
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../../../types/db/db-service-document-types'

// Firestoreに保存。クライアントサイドで作成したカスタムID
export interface FeynmanKnowledgeGapData extends BaseDocument {
  noteId: string
  noteTitle: string
  content: string
}

export type FeynmanKnowledgeGapRead = BaseDocumentRead & FeynmanKnowledgeGapData
export type FeynmanKnowledgeGapWrite = BaseDocumentWrite &
  FeynmanKnowledgeGapData
