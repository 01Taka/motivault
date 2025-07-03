import { Box, Stack } from '@mui/material'
import NoteEditorHeader from './NoteEditorHeader'
import TextBlock from './TextBlock'
import KnowledgeGapBlock from './KnowledgeGapBlock'
import { useNoteEditor } from '../../hooks/useNoteEditor'
import useFeynmanNoteService from '../../services/hooks/useFeynmanService'
import { usePersistedState } from '../../../../hooks/utils/usePersistedState'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface NoteEditorProps {}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Clipboard copy failed', err)
  }
}

const NoteEditor: React.FC<NoteEditorProps> = ({}) => {
  const navigate = useNavigate()

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
  } = useNoteEditor()

  const { saveNote } = useFeynmanNoteService()

  const copyAllToClipboard = () => {
    copyToClipboard(getAllText())
  }

  const onSaveNote = async () => {
    if (!title) {
      setTitleError(true)
      return
    }
    const { success } = await saveNote(title, blocks)
    if (success) {
      clearBlocks()
      setTitle('')
      navigate('/techniques/feynman')
    }
  }

  return (
    <Box sx={{ p: 2, pb: 10, backgroundColor: '#F4F5FF', minHeight: '100vh' }}>
      <NoteEditorHeader
        title={title}
        titleError={titleError}
        onChangeTitle={(title) => {
          setTitle(title)
          setTitleError(false)
        }}
        onCopyNote={() => copyAllToClipboard()}
        onCreateGapBlock={() => insertGapBlockAt(activeIndex + 1)}
        onCompleted={onSaveNote}
      />
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
  )
}

export default NoteEditor
