import React, { useEffect, useState } from 'react'
import { Stack, Divider, Box, Button } from '@mui/material'
import VersionTabs from './VersionTabs'
import NoteContent from './NoteContent'
import type { FeynmanNoteRead } from '../../../services/documents/feynman-note-documents'
import FeynmanDetailHeader from './FeynmanDetailHeader'
import { Autorenew } from '@mui/icons-material'
import type { KnowledgeGapBlockData } from '../../../services/documents/feynman-technique-types'

interface FeynmanNoteDetailProps {
  latestVersion: number
  latestNote: FeynmanNoteRead
  resolvedGapIds: string[]
  getPreviousNote: (version: number) => FeynmanNoteRead
  onResolveGap: (gap: KnowledgeGapBlockData) => void
  onShowResolvedGapDetail: (gap: KnowledgeGapBlockData) => void
  onEdit: (index: number) => void
  onRewrite: () => void
}

const FeynmanNoteDetail: React.FC<FeynmanNoteDetailProps> = ({
  latestVersion,
  latestNote,
  resolvedGapIds,
  getPreviousNote,
  onResolveGap,
  onShowResolvedGapDetail,
  onEdit,
  onRewrite,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(latestVersion - 1)
  const [selectedNote, setSelectedNote] = useState<FeynmanNoteRead>(latestNote)

  const versions = Array.from({ length: latestVersion }, (_, i) => `v${i + 1}`)

  useEffect(() => {
    const note = getPreviousNote(selectedIndex)
    setSelectedNote(note)
  }, [selectedIndex, getPreviousNote])

  if (!selectedNote) return null

  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        bgcolor: 'white',
        borderRadius: 2,
        width: '80vw',
        height: '80vh',
        p: 2,
        position: 'relative',
      }}
    >
      <VersionTabs
        versions={versions}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      <Stack spacing={1} sx={{ height: '100%', overflowY: 'auto', pb: 8 }}>
        <FeynmanDetailHeader
          title={selectedNote.title}
          onEdit={() => onEdit(selectedIndex)}
        />
        <Divider />
        <NoteContent
          contentBlocks={selectedNote.contents ?? []}
          resolvedGapIds={resolvedGapIds}
          onGapClick={(gap) => onResolveGap(gap)}
          onResolvedGapClick={(gap) => onShowResolvedGapDetail(gap)}
        />
      </Stack>
      <Box
        position="absolute"
        sx={{
          bottom: 16,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          p: 1,
          borderRadius: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Autorenew />}
          onClick={() => onRewrite()}
          sx={{ borderRadius: 3 }}
        >
          リライト
        </Button>
      </Box>
    </Stack>
  )
}

export default FeynmanNoteDetail
