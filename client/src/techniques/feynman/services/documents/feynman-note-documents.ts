import type {
  MakeDocumentRead,
  MakeDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type {
  KnowledgeGapBlockData,
  TextBlockData,
} from './feynman-technique-types'

interface NoteTextLineBlockBase {
  index: number
}
interface NoteTextBlock extends TextBlockData, NoteTextLineBlockBase {}
interface NoteGapBlock extends KnowledgeGapBlockData, NoteTextLineBlockBase {}

export type FeynmanNoteTextLineBlock = NoteTextBlock | NoteGapBlock

export interface FeynmanNoteData {
  title: string
  contents: FeynmanNoteTextLineBlock[]
  rewriteCount: number | undefined
}

export type FeynmanNoteRead = MakeDocumentRead<FeynmanNoteData>
export type FeynmanNoteWrite = MakeDocumentWrite<FeynmanNoteData>
