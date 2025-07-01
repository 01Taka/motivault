import { useState, useRef, type KeyboardEvent } from 'react'
import type { NoteBlock } from '../types/documents/feynman-technique-types'
import { customAlphabet } from 'nanoid'

export const useNoteEditor = (
  initialBlocks: NoteBlock[] = [{ type: 'text', text: '' }]
) => {
  const [blocks, setBlocks] = useState<NoteBlock[]>(initialBlocks)
  const [activeIndex, setActiveIndex] = useState<number>(0)
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

  // Firestoreと同じ仕様: 英大文字・英小文字・数字, 長さ20
  const nanoid = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    20
  )

  // ---------- MODIFIERS ----------
  const insertBlock = (index: number, block: NoteBlock) => {
    const newBlocks = [...blocks]
    newBlocks.splice(index, 0, block)
    setBlocks(newBlocks)
    setActiveIndex(index)
    focusBlock(index)
  }

  const removeBlock = (index: number) => {
    const isOnlyBlock = blocks.length === 1
    const newBlocks = [...blocks]

    if (isOnlyBlock) {
      setBlocks([{ type: 'text', text: '' }])
      setActiveIndex(0)
      focusBlock(0)
      return
    }

    newBlocks.splice(index, 1)
    setBlocks(newBlocks)
    const newIndex = Math.max(0, index - 1)
    setActiveIndex(newIndex)
    focusBlock(newIndex)
  }

  const updateBlock = (index: number, block: NoteBlock) => {
    const newBlocks = [...blocks]
    newBlocks[index] = block
    setBlocks(newBlocks)
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
      setBlocks(newBlocks)
      const newIndex = index + lines.length - 1
      setActiveIndex(newIndex)
      focusBlock(newIndex)
    } else {
      updateBlock(index, { type: 'text', text: newText })
    }
  }

  const handleGapChange = (index: number, content: string) => {
    if (content.endsWith('\n\n')) {
      const trimmed = content.trim()
      const newBlocks = [...blocks]
      const id = blocks[index].type === 'gap' ? blocks[index].id : nanoid()
      newBlocks[index] = { type: 'gap', content: trimmed, id }
      newBlocks.splice(index + 1, 0, { type: 'text', text: '' })
      setBlocks(newBlocks)
      const nextIndex = index + 1
      setActiveIndex(nextIndex)
      focusBlock(nextIndex)
    } else {
      if (blocks[index].type === 'gap') {
        updateBlock(index, { ...blocks[index], content })
      } else {
        updateBlock(index, { type: 'gap', content, id: nanoid() })
      }
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
    insertBlock(index, { type: 'gap', content: '', id: nanoid() })

  const setFocus = (index: number) => {
    setActiveIndex(index)
    focusBlock(index)
  }

  const getAllText = (removeKnowledgeGap: boolean = false): string => {
    return blocks
      .filter((b) => !removeKnowledgeGap || b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : b.content))
      .join('\n')
  }

  return {
    blocks,
    activeIndex,
    refs,
    setFocus,
    insertNewTextBlockAt,
    insertGapBlockAt,
    handleTextChange,
    handleGapChange,
    handleKeyDown,
    getAllText,
  }
}
