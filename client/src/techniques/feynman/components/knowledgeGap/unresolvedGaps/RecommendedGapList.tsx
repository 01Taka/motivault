import { Stack } from '@mui/material'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'
import RecommendedGapCard from '../card/RecommendedGapCard'

interface RecommendedGapListProps {
  gaps: FeynmanKnowledgeGapRead[]
  onClickGap: (gap: FeynmanKnowledgeGapRead) => void
}

const RecommendedGapList: React.FC<RecommendedGapListProps> = ({
  gaps,
  onClickGap,
}) => (
  <Stack spacing={2}>
    {gaps.map((q, index) => (
      <RecommendedGapCard
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

export default RecommendedGapList
