import type {
  BaseDocument,
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { KnowledgeGapBlock, TextBlock } from './feynman-technique-types'

interface NoteTextLineBlockBase {
  index: number
}
interface NoteTextBlock extends TextBlock, NoteTextLineBlockBase {}
interface NoteGapBlock extends KnowledgeGapBlock, NoteTextLineBlockBase {}

export type FeynmanNoteTextLineBlock = NoteTextBlock | NoteGapBlock

export interface FeynmanNoteData extends BaseDocument {
  docId: string
  title: string
  createdAt: number
  rewriteCount: number
  contents: FeynmanNoteTextLineBlock[]
}

export type FeynmanNoteRead = BaseDocumentRead & FeynmanNoteData
export type FeynmanNoteWrite = BaseDocumentWrite & FeynmanNoteData
