import { Box, Stack } from '@mui/material'
import NoteEditorHeader from './NoteEditorHeader'
import TextBlock from './TextBlock'
import KnowledgeGapBlock from './KnowledgeGapBlock'
import type { NoteBlock } from '../../services/documents/feynman-technique-types'

interface Props {
  title: string
  titleError: boolean
  onChangeTitle: (title: string) => void
  blocks: NoteBlock[]
  refs: React.RefObject<(HTMLTextAreaElement | null)[]>
  activeIndex: number
  onTextChange: (index: number, val: string) => void
  onGapChange: (index: number, val: string) => void
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLDivElement>) => void
  setFocus: (index: number) => void
  onCreateGap: () => void
  onComplete: () => void
  getAllText: () => string
}

const HEADER_HEIGHT = 50

const NoteEditorLayout: React.FC<Props> = ({
  title,
  titleError,
  onChangeTitle,
  blocks,
  refs,
  // activeIndex,
  onTextChange,
  onGapChange,
  onKeyDown,
  setFocus,
  onCreateGap,
  onComplete,
  getAllText,
}) => {
  const copyAllToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getAllText())
    } catch (err) {
      console.error('Clipboard copy failed', err)
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
          onChangeTitle={onChangeTitle}
          onCopyNote={copyAllToClipboard}
          onCreateGapBlock={onCreateGap}
          onCompleted={onComplete}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 3 }}>
        <Stack>
          {blocks.map((block, index) =>
            block.type === 'text' ? (
              <TextBlock
                key={index}
                text={block.text}
                placeholder={index === 0 ? '説明を記入...' : ''}
                onChange={(val) => onTextChange(index, val)}
                onKeyDown={(e) => onKeyDown(index, e)}
                onFocus={() => setFocus(index)}
                inputRef={(el) => (refs.current[index] = el)}
              />
            ) : (
              <KnowledgeGapBlock
                key={index}
                content={block.content}
                placeholder="理解できていない点を記入..."
                onChange={(val) => onGapChange(index, val)}
                onKeyDown={(e) => onKeyDown(index, e)}
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

export default NoteEditorLayout
