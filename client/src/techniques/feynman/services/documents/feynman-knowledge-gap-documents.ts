import type {
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { KnowledgeGapState } from './feynman-technique-types'

// Firestoreに保存。クライアントサイドで作成したカスタムID
export interface FeynmanKnowledgeGapData {
  noteId: string
  noteTitle: string
  contents: string
  answer: string
  state: KnowledgeGapState
}

export type FeynmanKnowledgeGapRead = MakeDocumentRead<FeynmanKnowledgeGapData>
export type FeynmanKnowledgeGapWrite =
  MakeDocumentWrite<FeynmanKnowledgeGapData>
