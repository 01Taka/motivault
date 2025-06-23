import { Box, Stack } from '@mui/material'
import NoteEditorHeader from './NoteEditorHeader'
import TextBlock from './TextBlock'
import KnowledgeGapBlock from './KnowledgeGapBlock'
import { useNoteEditor } from '../hooks/useNoteEditor'

interface NoteEditorProps {
  title: string
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Clipboard copy failed', err)
  }
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ title }) => {
  const {
    blocks,
    refs,
    activeIndex,
    insertGapBlockAt,
    handleTextChange,
    handleGapChange,
    handleKeyDown,
    setFocus,
    getAllText,
  } = useNoteEditor()

  const copyAllToClipboard = () => {
    copyToClipboard(getAllText())
  }

  return (
    <Box sx={{ p: 2, pb: 10, backgroundColor: '#F4F5FF', minHeight: '100vh' }}>
      <NoteEditorHeader
        title={title}
        onCopyNote={() => copyAllToClipboard()}
        onCreateGapBlock={() => insertGapBlockAt(activeIndex + 1)}
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
