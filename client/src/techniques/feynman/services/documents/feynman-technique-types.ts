export interface TextBlock {
  type: 'text'
  text: string
}

export interface KnowledgeGapBlock {
  id: string
  type: 'gap'
  content: string
}

export type NoteBlock = TextBlock | KnowledgeGapBlock
