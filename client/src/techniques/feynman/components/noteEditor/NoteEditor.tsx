import { Box, Stack } from '@mui/material'
import NoteEditorHeader from './NoteEditorHeader'
import TextBlock from './TextBlock'
import KnowledgeGapBlock from './KnowledgeGapBlock'
import { useNoteEditor } from '../../hooks/useNoteEditor'
import useFeynmanNoteService from '../../services/hooks/useFeynmanService'
import { usePersistedState } from '../../../../hooks/utils/usePersistedState'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NoteBlock } from '../../services/documents/feynman-technique-types'

const HEADER_HEIGHT = 50

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Clipboard copy failed', err)
  }
}

const NoteEditor: React.FC = () => {
  const navigate = useNavigate()
  const initialBlocks: NoteBlock[] = []

  const [title, setTitle] = usePersistedState<string>({
    key: 'feynmanNoteTitle',
    initialValue: '',
  })
  const [titleError, setTitleError] = useState(false)

  const {
    blocks,
    refs,
    activeIndex,
    insertGapBlockAt,
    clearBlocks,
    handleTextChange,
    handleGapChange,
    handleKeyDown,
    setFocus,
    getAllText,
    getNewGapsComparedTo,
    getModifiedGapsComparedTo,
  } = useNoteEditor(initialBlocks)

  const { saveNote } = useFeynmanNoteService()

  const copyAllToClipboard = () => {
    copyToClipboard(getAllText())
  }

  const onSaveNote = async () => {
    if (!title) {
      setTitleError(true)
      return
    }
    const newGapBlocks = getNewGapsComparedTo(initialBlocks)
    const updatedGapBlock = getModifiedGapsComparedTo(initialBlocks)
    const { success } = await saveNote(
      title,
      blocks,
      newGapBlocks,
      updatedGapBlock
    )
    if (success) {
      clearBlocks()
      setTitle('')
      navigate('/techniques/feynman')
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#F4F5FF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 固定ヘッダー */}
      <Box
        sx={{
          height: HEADER_HEIGHT,
          px: 2,
          py: 1,
          position: 'sticky',
          top: 10,
          zIndex: 10,
          backgroundColor: '#F4F5FF',
          borderBottom: '1px solid #ddd',
        }}
      >
        <NoteEditorHeader
          title={title}
          titleError={titleError}
          onChangeTitle={(title) => {
            setTitle(title)
            setTitleError(false)
          }}
          onCopyNote={copyAllToClipboard}
          onCreateGapBlock={() => insertGapBlockAt(activeIndex + 1)}
          onCompleted={onSaveNote}
        />
      </Box>

      {/* 編集エリア */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          px: 2,
          py: 3,
        }}
      >
        <Stack>
          {blocks.map((block, index) =>
            block.type === 'text' ? (
              <TextBlock
                key={index}
                text={block.text}
                placeholder={index === 0 ? '説明を記入...' : ''}
                onChange={(val) => handleTextChange(index, val)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => setFocus(index)}
                inputRef={(el) => (refs.current[index] = el)}
              />
            ) : (
              <KnowledgeGapBlock
                key={index}
                content={block.content}
                placeholder="理解できていない点を記入..."
                onChange={(val) => handleGapChange(index, val)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => setFocus(index)}
                inputRef={(el) => (refs.current[index] = el)}
              />
            )
          )}
        </Stack>
      </Box>
    </Box>
  )
}

export default NoteEditor
