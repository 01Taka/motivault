import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePersistedState } from '../../../hooks/utils/usePersistedState'
import type { FeynmanNoteRead } from '../services/documents/feynman-note-documents'
import type { NoteBlock } from '../services/documents/feynman-technique-types'
import useFeynmanNoteService from '../services/hooks/useFeynmanService'
import { useNoteEditor } from './useNoteEditor'

export const useNoteEditorLogic = (
  mode: 'create' | 'edit',
  initialBlocks?: NoteBlock[],
  prevNote?: FeynmanNoteRead
) => {
  const navigate = useNavigate()
  const [title, setTitle] = usePersistedState<string>({
    key: 'feynmanNoteTitle',
    initialValue: mode === 'edit' && prevNote ? prevNote.title : '',
    debounceMs: 500,
  })
  const [titleError, setTitleError] = useState(false)

  const {
    blocks,
    refs,
    activeIndex,
    insertGapBlockAt,
    initializeBlocks,
    clearBlocks,
    handleTextChange,
    handleGapChange,
    handleKeyDown,
    setFocus,
    getAllText,
    getNewGapsComparedTo,
    getModifiedGapsComparedTo,
  } = useNoteEditor(
    initialBlocks,
    mode === 'edit' ? (prevNote?.docId ?? '') : undefined
  )

  const { saveNote, rewriteNote } = useFeynmanNoteService()

  const onComplete = async () => {
    if (!title || (mode === 'edit' && !prevNote)) {
      setTitleError(true)
      return
    }

    const newGapBlocks = getNewGapsComparedTo(initialBlocks ?? [])
    const updatedGapBlock = getModifiedGapsComparedTo(initialBlocks ?? [])

    const result =
      mode === 'create'
        ? await saveNote(title, blocks, newGapBlocks, updatedGapBlock)
        : await rewriteNote(
            prevNote!,
            blocks,
            newGapBlocks,
            updatedGapBlock,
            title
          )

    if (result.success) {
      clearBlocks()
      setTitle('')
      navigate('/techniques/feynman')
    }
  }

  return {
    title,
    titleError,
    onChangeTitle: (t: string) => {
      setTitle(t)
      setTitleError(false)
    },
    blocks,
    refs,
    activeIndex,
    initializeBlocks,
    onTextChange: handleTextChange,
    onGapChange: handleGapChange,
    onKeyDown: handleKeyDown,
    setFocus,
    onCreateGap: () => insertGapBlockAt(activeIndex + 1),
    onComplete,
    getAllText,
  }
}
