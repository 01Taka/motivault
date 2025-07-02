import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { FeynmanKnowledgeGapWrite } from '../documents/feynman-knowledge-gap-documents'
import type {
  FeynmanNoteRead,
  FeynmanNoteTextLineBlock,
  FeynmanNoteWrite,
} from '../documents/feynman-note-documents'
import type { NoteBlock } from '../documents/feynman-technique-types'
import {
  createFeynmanNote,
  createOrUpdateFeynmanKnowledgeGap,
  rewriteFeynmanNote,
} from '../functions/feynman-note-service'

const convertToTextLineBlocks = (
  blocks: NoteBlock[]
): FeynmanNoteTextLineBlock[] => {
  return blocks.map((block, index) => ({ index, ...block }))
}

const convertToKnowledgeGapData = (
  blocks: NoteBlock[],
  noteData: {
    docId: string
    title: string
  }
): (FeynmanKnowledgeGapWrite & { blockId: string })[] => {
  return blocks
    .filter((block) => block.type === 'gap')
    .map((block) => ({
      blockId: block.id,
      noteId: noteData.docId,
      noteTitle: noteData.title,
      contents: block.content,
    }))
}

const useFeynmanNoteService = () => {
  const { uid } = useCurrentUserStore()

  const createOrUpdateKnowledgeGaps = async (
    uid: string,
    noteId: string,
    title: string,
    blocks: NoteBlock[]
  ): Promise<void> => {
    const knowledgeGaps = convertToKnowledgeGapData(blocks, {
      docId: noteId,
      title,
    })

    const knowledgeGapMap = Object.fromEntries(
      knowledgeGaps.map((gap) => [gap.blockId, gap])
    )

    await createOrUpdateFeynmanKnowledgeGap(uid, knowledgeGapMap)
  }

  const saveNote = async (
    title: string,
    blocks: NoteBlock[]
  ): Promise<{ success: boolean; message?: string }> => {
    if (!uid) return { success: false, message: 'User not logged in' }

    const contents = convertToTextLineBlocks(blocks)
    const data: FeynmanNoteWrite = { title, contents }

    try {
      const noteId = await createFeynmanNote(uid, data)
      if (noteId) {
        createOrUpdateKnowledgeGaps(uid, noteId, data.title, blocks)
      }

      return { success: true }
    } catch (error) {
      console.error('Failed to save note:', error)
      return { success: false, message: 'Failed to save note' }
    }
  }

  const rewriteNote = async (
    prevNote: FeynmanNoteRead,
    blocks: NoteBlock[],
    updatedTitle?: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!uid) return { success: false, message: 'User not logged in' }

    const contents = convertToTextLineBlocks(blocks)
    const data: FeynmanNoteWrite = {
      title: updatedTitle || prevNote.title,
      contents,
    }

    try {
      const noteId = await rewriteFeynmanNote(uid, prevNote.docId, data)
      if (noteId) {
        createOrUpdateKnowledgeGaps(uid, noteId, data.title, blocks)
      }
      return { success: true }
    } catch (error) {
      console.error('Failed to rewrite note:', error)
      return { success: false, message: 'Failed to rewrite note' }
    }
  }

  return {
    saveNote,
    rewriteNote,
    convertToTextLineBlocks,
    convertToKnowledgeGapData,
  }
}

export default useFeynmanNoteService
