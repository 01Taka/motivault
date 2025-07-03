import { Box, Button, Stack, Typography } from '@mui/material'
import type { FeynmanNoteTextLineBlock } from '../../../services/documents/feynman-note-documents'
import type { KnowledgeGapBlock } from '../../../services/documents/feynman-technique-types'
import { Check, QuestionMark } from '@mui/icons-material'

interface NoteContentProps {
  contentBlocks: FeynmanNoteTextLineBlock[]
  resolvedGapIds: string[]
  onGapClick: (gap: KnowledgeGapBlock) => void
  onResolvedGapClick: (gap: KnowledgeGapBlock) => void
}

const NoteContent: React.FC<NoteContentProps> = ({
  contentBlocks,
  resolvedGapIds,
  onGapClick,
  onResolvedGapClick,
}) => {
  return (
    <Stack spacing={1}>
      {contentBlocks.map((block) => {
        if (block.type === 'text') {
          return (
            <Typography
              key={block.index}
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                px: 1,
                py: 0.5,
              }}
            >
              {block.text}
            </Typography>
          )
        }

        const isResolved = resolvedGapIds.includes(block.id)
        const borderColor = isResolved ? '#4CAF50' : '#FF9100'

        return (
          <Box key={block.index} sx={{ px: 1 }}>
            <Button
              fullWidth
              onClick={() =>
                isResolved ? onResolvedGapClick(block) : onGapClick(block)
              }
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                border: `1.5px solid ${borderColor}`,
                boxShadow: 2,
                borderRadius: 2,
                textTransform: 'none',
                py: 1,
                color: 'text.primary',
                backgroundColor: isResolved ? 'grey.50' : 'white',
                '&:hover': {
                  backgroundColor: isResolved ? 'grey.100' : 'grey.50',
                },
                transition: 'all 0.2s',
                gap: 1,
              }}
            >
              {isResolved ? (
                <Check />
              ) : (
                <QuestionMark sx={{ color: borderColor }} />
              )}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {block.content}
              </Typography>
            </Button>
          </Box>
        )
      })}
    </Stack>
  )
}

export default NoteContent
