import React, { useState } from 'react'
import FeynmanNoteCard from './card/FeynmanNoteCard'
import type { FeynmanNoteRead } from '../../services/documents/feynman-note-documents'
import { Box, Typography } from '@mui/material'
import Popup from '../../../../components/utils/Popup'
import FeynmanNoteDetail from './noteDetail/FeynmanNoteDetail'
import { useFeynmanStore } from '../../store/feynmanStore'

interface FeynmanNotesProps {}

const FeynmanNotes: React.FC<FeynmanNotesProps> = ({}) => {
  const { allFeynmanNotes } = useFeynmanStore()
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedNote, setSelectedNote] = useState<FeynmanNoteRead | null>(null)

  return (
    <Box>
      <Typography variant="h6" sx={{ p: 1, textAlign: 'center' }}>
        自分の説明を振り返ろう！
      </Typography>
      {allFeynmanNotes.map((note) => (
        <FeynmanNoteCard
          note={note}
          contentStart={
            note.contents.filter((c) => c.type === 'text').length > 0
              ? note.contents.filter((c) => c.type === 'text')[0].text
              : ''
          }
          unresolvedCount={
            note.contents.filter((content) => content.type === 'gap').length
          }
          resolvedCount={0}
          onClick={() => {
            setSelectedNote(note)
            setOpenDetail(true)
          }}
        />
      ))}
      <Popup open={openDetail} onClose={() => setOpenDetail(false)}>
        {selectedNote && (
          <FeynmanNoteDetail
            latestVersion={selectedNote.rewriteCount + 3}
            latestNote={selectedNote}
            resolvedGapIds={[]}
            getPreviousNote={() => selectedNote}
            onEdit={() => {}}
            onRewrite={() => {}}
            onResolveGap={() => {}}
            onShowResolvedGapDetail={() => {}}
          />
        )}
      </Popup>
    </Box>
  )
}

export default FeynmanNotes
