export interface KnowledgeGapData {
  title: string
  date: string
  content: string
}

export interface TextBlock {
  type: 'text'
  text: string
}

export interface KnowledgeGapBlock {
  type: 'gap'
  content: string
}

export type NoteBlock = TextBlock | KnowledgeGapBlock
