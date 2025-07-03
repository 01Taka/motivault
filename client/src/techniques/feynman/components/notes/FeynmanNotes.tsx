import React, { useEffect, useState } from 'react'
import FeynmanNoteCard from './FeynmanNoteCard'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import { getAllFeynmanNote } from '../../services/functions/feynman-note-service'
import type { FeynmanNoteRead } from '../../services/documents/feynman-note-documents'
import { Box, Typography } from '@mui/material'
import Popup from '../../../../components/utils/Popup'
import FeynmanNoteDetail from './noteDetail/FeynmanNoteDetail'

interface FeynmanNotesProps {}

const FeynmanNotes: React.FC<FeynmanNotesProps> = ({}) => {
  const { uid } = useCurrentUserStore()
  const [notes, setNotes] = useState<FeynmanNoteRead[]>([])
  const [openDetail, setOpenDetail] = useState(false)
  const [selectedNote, setSelectedNote] = useState<FeynmanNoteRead | null>(null)

  useEffect(() => {
    const fetchNote = async () => {
      if (uid) {
        const notes = await getAllFeynmanNote(uid)
        setNotes(notes)
      }
    }
    fetchNote()
  }, [uid])

  return (
    <Box>
      <Typography variant="h6" sx={{ p: 1, textAlign: 'center' }}>
        自分の説明を振り返ろう！
      </Typography>
      {notes.map((note) => (
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
