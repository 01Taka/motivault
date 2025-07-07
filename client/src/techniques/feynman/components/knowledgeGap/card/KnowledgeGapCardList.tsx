import React from 'react'
import SimpleGapCard from './SimpleGapCard'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'

interface KnowledgeGapCardListProps {
  gaps: FeynmanKnowledgeGapRead[]
  colorType: 'unresolved' | 'resolved'
  onClickGap?: (gap: FeynmanKnowledgeGapRead) => void
}

const KnowledgeGapCardList: React.FC<KnowledgeGapCardListProps> = ({
  gaps,
  colorType,
  onClickGap,
}) => {
  return (
    <div>
      {gaps.map((gap) => (
        <SimpleGapCard
          key={gap.docId}
          knowledgeGap={gap}
          colorType={colorType}
          onClick={() => onClickGap?.(gap)}
        />
      ))}
    </div>
  )
}

export default KnowledgeGapCardList
