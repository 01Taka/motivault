// components/FeynmanNoteCard.tsx
import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import type { FeynmanNoteRead } from '../../../services/documents/feynman-note-documents'
import KnowledgeGapSummary from './KnowledgeGapSummary'
import NoteHeader from './NoteHeader'
import RewriteInfo from './RewriteInfo'

interface FeynmanNoteCardProps {
  note: FeynmanNoteRead
  unresolvedCount: number
  resolvedCount: number
  contentStart: string
  onClick: () => void
}

const FeynmanNoteCard: React.FC<FeynmanNoteCardProps> = ({
  note,
  unresolvedCount,
  resolvedCount,
  contentStart,
  onClick,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        mb: 2,
        boxShadow: 1,
        bgcolor: unresolvedCount > 0 ? '#fff6f1' : '#dfe5e1',
        transition: '0.2s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={1}>
            <NoteHeader title={note.title} createdAt={note.createdAt} />
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ mt: 0.5 }}
            >
              {contentStart}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <RewriteInfo count={note.rewriteCount} />
              <KnowledgeGapSummary
                unresolved={unresolvedCount}
                resolved={resolvedCount}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FeynmanNoteCard
