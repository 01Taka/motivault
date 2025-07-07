import { useState, useRef, type KeyboardEvent } from 'react'
import type {
  KnowledgeGapBlockData,
  NoteBlock,
} from '../services/documents/feynman-technique-types'
import { createFirestoreId } from '../../../functions/services/firestore-id-service'
import { usePersistedState } from '../../../hooks/utils/usePersistedState'

export const useNoteEditor = (
  initialBlocks: NoteBlock[] = [{ type: 'text', text: '' }]
) => {
  const [blocks, setBlocks] = usePersistedState<NoteBlock[]>({
    key: 'feynmanNoteBlocks',
    initialValue: initialBlocks,
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const refs = useRef<(HTMLTextAreaElement | null)[]>([])

  // ---------- UTILS ----------
  const isEmptyBlock = (block: NoteBlock): boolean =>
    block.type === 'text'
      ? block.text.trim() === ''
      : block.content.trim() === ''

  const focusBlock = (index: number) => {
    setTimeout(() => {
      refs.current[index]?.focus()
      refs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 0)
  }

  const updateAndFocus = (newBlocks: NoteBlock[], index: number) => {
    setBlocks(newBlocks)
    setActiveIndex(index)
    focusBlock(index)
  }

  const updateBlock = (index: number, block: NoteBlock) => {
    const updated = [...blocks]
    updated[index] = block
    setBlocks(updated)
  }

  const upsertGapBlock = (index: number, content: string) => {
    const id =
      blocks[index].type === 'gap' ? blocks[index].id : createFirestoreId()
    const newBlock: NoteBlock = {
      type: 'gap',
      content,
      id,
      state: 'unresolved',
    }
    updateBlock(index, newBlock)
  }

  // ---------- MODIFIERS ----------
  const insertBlock = (index: number, block: NoteBlock) => {
    const updated = [...blocks]
    updated.splice(index, 0, block)
    updateAndFocus(updated, index)
  }

  const removeBlock = (index: number) => {
    const isOnlyBlock = blocks.length === 1
    const fallback: NoteBlock[] = [{ type: 'text', text: '' }]

    const updated = isOnlyBlock
      ? fallback
      : [...blocks].filter((_, i) => i !== index)
    const newIndex = isOnlyBlock ? 0 : Math.max(0, index - 1)

    updateAndFocus(updated, newIndex)
  }

  const clearBlocks = () => {
    const empty: NoteBlock[] = [{ type: 'text', text: '' }]
    updateAndFocus(empty, 0)
  }

  // ---------- EVENTS ----------
  const handleTextChange = (index: number, newText: string) => {
    const lines = newText.split('\n')

    if (lines.length > 1) {
      const newBlocks = [...blocks]
      newBlocks[index] = { type: 'text', text: lines[0] }

      for (let i = 1; i < lines.length; i++) {
        newBlocks.splice(index + i, 0, { type: 'text', text: lines[i] })
      }

      const newIndex = index + lines.length - 1
      updateAndFocus(newBlocks, newIndex)
    } else {
      updateBlock(index, { type: 'text', text: newText })
    }
  }

  const handleGapChange = (index: number, content: string) => {
    if (content.endsWith('\n\n')) {
      const trimmed = content.trim()
      const id =
        blocks[index].type === 'gap' ? blocks[index].id : createFirestoreId()

      const newBlocks = [...blocks]
      newBlocks[index] = {
        type: 'gap',
        content: trimmed,
        id,
        state: 'unresolved',
      }
      newBlocks.splice(index + 1, 0, { type: 'text', text: '' })

      updateAndFocus(newBlocks, index + 1)
    } else {
      upsertGapBlock(index, content)
    }
  }

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Backspace' && isEmptyBlock(blocks[index])) {
      event.preventDefault()
      removeBlock(index)
    }
  }

  // ---------- HELPERS ----------
  const insertNewTextBlockAt = (index: number) =>
    insertBlock(index, { type: 'text', text: '' })

  const insertGapBlockAt = (index: number) =>
    insertBlock(index, {
      type: 'gap',
      content: '',
      id: createFirestoreId(),
      state: 'unresolved',
    })

  const setFocus = (index: number) => {
    setActiveIndex(index)
    focusBlock(index)
  }

  const getAllText = (removeKnowledgeGap = false): string =>
    blocks
      .filter((b) => !removeKnowledgeGap || b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : b.content))
      .join('\n')

  const getNewGapsComparedTo = (
    oldGaps: NoteBlock[]
  ): KnowledgeGapBlockData[] => {
    const oldGapIds = new Set(
      oldGaps.filter((g) => g.type === 'gap').map((g) => g.id)
    )
    return blocks.filter(
      (b) => b.type === 'gap' && !oldGapIds.has(b.id)
    ) as KnowledgeGapBlockData[]
  }

  const getModifiedGapsComparedTo = (
    oldGaps: NoteBlock[]
  ): KnowledgeGapBlockData[] => {
    const oldGapMap = new Map(
      oldGaps.filter((g) => g.type === 'gap').map((g) => [g.id, g.content])
    )

    return blocks.filter(
      (b): b is KnowledgeGapBlockData =>
        b.type === 'gap' &&
        oldGapMap.has(b.id) &&
        b.content !== oldGapMap.get(b.id)
    )
  }

  return {
    blocks,
    activeIndex,
    refs,
    setFocus,
    insertNewTextBlockAt,
    insertGapBlockAt,
    clearBlocks,
    handleTextChange,
    handleGapChange,
    handleKeyDown,
    getAllText,
    getNewGapsComparedTo,
    getModifiedGapsComparedTo,
  }
}
