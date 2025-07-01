import { Box, Typography, Button } from '@mui/material'
import KnowledgeGapCard from './card/KnowledgeGapCard'
import type { FeynmanKnowledgeGapRead } from '../types/documents/feynman-knowledge-gap-documents'

interface KnowledgeGapListProps {
  gaps: FeynmanKnowledgeGapRead[]
  onShowMore: () => void
}

export const KnowledgeGapList: React.FC<KnowledgeGapListProps> = ({
  gaps,
  onShowMore,
}) => (
  <Box sx={{ p: 2, pb: 10 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      タップして疑問を解消！
    </Typography>
    {gaps.map((q, index) => (
      <KnowledgeGapCard
        key={index}
        index={index + 1}
        title={q.noteTitle}
        date={q.createdAt}
        {...q}
      />
    ))}
    <Button fullWidth variant="outlined" onClick={onShowMore}>
      過去の疑問を表示
    </Button>
  </Box>
)
