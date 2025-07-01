import type { FeynmanKnowledgeGapWrite } from '../../types/documents/feynman-knowledge-gap-documents'
import type { FeynmanNoteTextLineBlock } from '../../types/documents/feynman-note-documents'
import type { NoteBlock } from '../../types/documents/feynman-technique-types'

const useFeynmanNoteService = (noteData: {
  docId: string
  title: string
  createdAt: number
}) => {
  const convertToTextLineBlocks = (
    blocks: NoteBlock[]
  ): FeynmanNoteTextLineBlock[] => {
    return blocks.map((block, index) => ({ index, ...block }))
  }

  const convertToKnowledgeGapData = (
    blocks: NoteBlock[]
  ): FeynmanKnowledgeGapWrite[] => {
    return blocks
      .filter((block) => block.type === 'gap')
      .map((block) => ({
        docId: block.id,
        noteId: noteData.docId,
        noteTitle: noteData.title,
        createdAt: noteData.createdAt,
        content: block.content,
      }))
  }

  return { convertToTextLineBlocks, convertToKnowledgeGapData }
}

export default useFeynmanNoteService
