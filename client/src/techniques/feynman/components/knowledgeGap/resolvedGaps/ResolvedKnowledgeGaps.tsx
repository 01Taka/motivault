import React from 'react'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'
import KnowledgeGapCardList from '../card/KnowledgeGapCardList'

interface ResolvedKnowledgeGapsProps {
  resolvedGaps: FeynmanKnowledgeGapRead[]
}

const ResolvedKnowledgeGaps: React.FC<ResolvedKnowledgeGapsProps> = ({
  resolvedGaps,
}) => {
  return (
    <div>
      <KnowledgeGapCardList gaps={resolvedGaps} colorType="resolved" />
    </div>
  )
}

export default ResolvedKnowledgeGaps
