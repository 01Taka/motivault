import type {
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { KnowledgeGapBlock, TextBlock } from './feynman-technique-types'

interface NoteTextLineBlockBase {
  index: number
}
interface NoteTextBlock extends TextBlock, NoteTextLineBlockBase {}
interface NoteGapBlock extends KnowledgeGapBlock, NoteTextLineBlockBase {}

export type FeynmanNoteTextLineBlock = NoteTextBlock | NoteGapBlock

export interface FeynmanNoteData {
  title: string
  contents: FeynmanNoteTextLineBlock[]
  rewriteCount: number | undefined
}

export type FeynmanNoteRead = MakeDocumentRead<FeynmanNoteData>
export type FeynmanNoteWrite = MakeDocumentWrite<FeynmanNoteData>
