import React, { useState } from 'react'
import FeynmanNoteCard from './card/FeynmanNoteCard'
import type { FeynmanNoteRead } from '../../services/documents/feynman-note-documents'
import { Box, Typography } from '@mui/material'
import Popup from '../../../../components/utils/Popup'
import FeynmanNoteDetail from './noteDetail/FeynmanNoteDetail'
import { useFeynmanStore } from '../../store/feynmanStore'
import { useNavigate } from 'react-router-dom'

interface FeynmanNotesProps {}

const FeynmanNotes: React.FC<FeynmanNotesProps> = ({}) => {
  const navigate = useNavigate()
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
            latestVersion={selectedNote.rewriteCount + 1}
            latestNote={selectedNote}
            resolvedGapIds={selectedNote.resolvedGapIds ?? []}
            getPreviousNote={() => selectedNote}
            onEdit={() => {}}
            onRewrite={() =>
              navigate(`/techniques/feynman/rewrite/${selectedNote.docId}`)
            }
            onResolveGap={(gap) =>
              navigate(`/techniques/feynman/create-answer/${gap.id}`)
            }
            onShowResolvedGapDetail={(gap) =>
              navigate(`/techniques/feynman/create-answer/${gap.id}`)
            }
          />
        )}
      </Popup>
    </Box>
  )
}

export default FeynmanNotes
