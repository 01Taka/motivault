import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { FeynmanKnowledgeGapWrite } from '../documents/feynman-knowledge-gap-documents'
import type {
  FeynmanNoteRead,
  FeynmanNoteTextLineBlock,
  FeynmanNoteWrite,
} from '../documents/feynman-note-documents'
import type {
  KnowledgeGapBlockData,
  NoteBlock,
} from '../documents/feynman-technique-types'
import {
  createFeynmanNote,
  createNewGapBlocks,
  rewriteFeynmanNote,
  updateGapBlocks,
} from '../functions/feynman-note-service'

// ---------- UTILS ----------
const convertToTextLineBlocks = (
  blocks: NoteBlock[]
): FeynmanNoteTextLineBlock[] =>
  blocks.map((block, index) => ({ index, ...block }))

const convertToKnowledgeGapWriteData = (
  blocks: KnowledgeGapBlockData[],
  noteMeta: { docId: string; title: string }
): (FeynmanKnowledgeGapWrite & { blockId: string })[] =>
  blocks.map((block) => ({
    blockId: block.id,
    noteId: noteMeta.docId,
    noteTitle: noteMeta.title,
    contents: block.content,
    state: 'unresolved',
    answer: '',
  }))

// ---------- HOOK ----------
const useFeynmanNoteService = () => {
  const { uid } = useCurrentUserStore()

  const createOrUpdateKnowledgeGaps = async (
    noteId: string,
    title: string,
    newGapBlocks: KnowledgeGapBlockData[],
    updatedGapBlocks: KnowledgeGapBlockData[]
  ): Promise<void> => {
    if (!uid) throw new Error('User not logged in')

    const meta = { docId: noteId, title }
    const newGapData = convertToKnowledgeGapWriteData(newGapBlocks, meta)
    const newGapMap = Object.fromEntries(
      newGapData.map((gap) => [gap.blockId, gap])
    )

    const updatedGapMap = Object.fromEntries(
      updatedGapBlocks.map((block) => [block.id, { contents: block.content }])
    )

    try {
      if (Object.keys(newGapMap).length > 0) {
        await createNewGapBlocks(uid, newGapMap)
      }
    } catch (error) {
      console.error('Error creating new gap blocks:', error)
      throw new Error('新しいギャップの保存に失敗しました。')
    }

    try {
      if (Object.keys(updatedGapMap).length > 0) {
        await updateGapBlocks(uid, updatedGapMap)
      }
    } catch (error) {
      console.error('Error updating existing gap blocks:', error)
      throw new Error('既存のギャップの更新に失敗しました。')
    }
  }

  const saveNote = async (
    title: string,
    blocks: NoteBlock[],
    newGapBlocks: KnowledgeGapBlockData[],
    updatedGapBlocks: KnowledgeGapBlockData[]
  ): Promise<{ success: boolean; message?: string }> => {
    if (!uid) return { success: false, message: 'User not logged in' }

    const contents = convertToTextLineBlocks(blocks)
    const data: FeynmanNoteWrite = { title, contents, resolvedGapIds: [] }

    try {
      const result = await createFeynmanNote(uid, data)

      if (!result) {
        return { success: false, message: 'ノートの作成に失敗しました。' }
      }

      await createOrUpdateKnowledgeGaps(
        result.id,
        title,
        newGapBlocks,
        updatedGapBlocks
      )
      return { success: true }
    } catch (error) {
      console.error('Failed to save note:', error)
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'ノートの保存中にエラーが発生しました。',
      }
    }
  }

  const rewriteNote = async (
    prevNote: FeynmanNoteRead,
    blocks: NoteBlock[],
    newGapBlocks: KnowledgeGapBlockData[],
    updatedGapBlocks: KnowledgeGapBlockData[],
    updatedTitle?: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!uid) return { success: false, message: 'User not logged in' }

    const newTitle = updatedTitle || prevNote.title
    const contents = convertToTextLineBlocks(blocks)

    try {
      const result = await rewriteFeynmanNote(
        uid,
        prevNote.docId,
        contents,
        newTitle
      )

      if (!result) {
        return { success: false, message: 'ノートの更新に失敗しました。' }
      }

      await createOrUpdateKnowledgeGaps(
        result.id,
        newTitle,
        newGapBlocks,
        updatedGapBlocks
      )
      return { success: true }
    } catch (error) {
      console.error('Failed to rewrite note:', error)
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'ノートの更新中にエラーが発生しました。',
      }
    }
  }

  return {
    saveNote,
    rewriteNote,
    convertToTextLineBlocks,
    convertToKnowledgeGapWriteData,
  }
}

export default useFeynmanNoteService
