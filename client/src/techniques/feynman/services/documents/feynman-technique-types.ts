export interface TextBlockData {
  type: 'text'
  text: string
}

export interface KnowledgeGapBlockData {
  id: string
  type: 'gap'
  content: string
}

export type NoteBlock = TextBlockData | KnowledgeGapBlockData

export type KnowledgeGapState = 'unresolved' | 'resolved'
