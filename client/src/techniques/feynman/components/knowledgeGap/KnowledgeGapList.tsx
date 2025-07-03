import { Stack } from '@mui/material'
import KnowledgeGapCard from './KnowledgeGapCard'
import type { FeynmanKnowledgeGapRead } from '../../services/documents/feynman-knowledge-gap-documents'

interface KnowledgeGapListProps {
  gaps: FeynmanKnowledgeGapRead[]
  onClickGap: (gap: FeynmanKnowledgeGapRead) => void
}

export const KnowledgeGapList: React.FC<KnowledgeGapListProps> = ({
  gaps,
  onClickGap,
}) => (
  <Stack spacing={2}>
    {gaps.map((q, index) => (
      <KnowledgeGapCard
        key={index}
        index={index + 1}
        title={q.noteTitle}
        date={q.createdAt}
        {...q}
        onClick={() => onClickGap(q)}
      />
    ))}
  </Stack>
)
