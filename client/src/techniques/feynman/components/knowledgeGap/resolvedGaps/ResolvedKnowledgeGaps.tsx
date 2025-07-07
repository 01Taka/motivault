import React from 'react'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'
import KnowledgeGapCardList from '../card/KnowledgeGapCardList'

interface ResolvedKnowledgeGapsProps {
  resolvedGaps: FeynmanKnowledgeGapRead[]
  onClickGap: (gap: FeynmanKnowledgeGapRead) => void
}

const ResolvedKnowledgeGaps: React.FC<ResolvedKnowledgeGapsProps> = ({
  resolvedGaps,
  onClickGap,
}) => {
  return (
    <div>
      <KnowledgeGapCardList
        gaps={resolvedGaps}
        colorType="resolved"
        onClickGap={onClickGap}
      />
    </div>
  )
}

export default ResolvedKnowledgeGaps
