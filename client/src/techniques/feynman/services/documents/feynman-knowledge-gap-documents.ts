import type {
  BaseDocument,
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'

// Firestoreに保存。クライアントサイドで作成したカスタムID
export interface FeynmanKnowledgeGapData extends BaseDocument {
  noteId: string
  noteTitle: string
  contents: string
}

export type FeynmanKnowledgeGapRead = MakeDocumentRead<FeynmanKnowledgeGapData>
export type FeynmanKnowledgeGapWrite =
  MakeDocumentWrite<FeynmanKnowledgeGapData>
