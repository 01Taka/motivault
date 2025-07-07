import React, { useState } from 'react'
import { Box } from '@mui/material'
import { MAX_GAPS_DISPLAY } from '../../constants/feynman-constants'
import { KnowledgeTabSwitcher } from './KnowledgeTabSwitcher'
import UnresolvedKnowledgeGaps from './unresolvedGaps/UnresolvedKnowledgeGaps'
import ResolvedKnowledgeGaps from './resolvedGaps/ResolvedKnowledgeGaps'
import { useFeynmanStore } from '../../store/feynmanStore'
import { useNavigate } from 'react-router-dom'
import type { FeynmanKnowledgeGapRead } from '../../services/documents/feynman-knowledge-gap-documents'

interface KnowledgeGapProps {}

const KnowledgeGap: React.FC<KnowledgeGapProps> = ({}) => {
  const navigate = useNavigate()
  const { recentUnresolvedGaps, pastUnresolvedGaps, resolvedGaps } =
    useFeynmanStore()

  const [tab, setTab] = useState<'unresolved' | 'resolved'>('unresolved')

  const handleClickGap = (gap: FeynmanKnowledgeGapRead) => {
    console.log(gap)

    navigate(`create-answer/${gap.docId}`)
  }

  return (
    <Box sx={{ width: '95vw', height: '80vh' }}>
      <KnowledgeTabSwitcher value={tab} onChange={(tab) => setTab(tab)} />
      {tab === 'unresolved' ? (
        <UnresolvedKnowledgeGaps
          recentGaps={recentUnresolvedGaps}
          pastGaps={pastUnresolvedGaps}
          resolveMoreNumber={Math.min(
            pastUnresolvedGaps.length,
            MAX_GAPS_DISPLAY
          )}
          onClickGap={handleClickGap}
        />
      ) : (
        <ResolvedKnowledgeGaps resolvedGaps={resolvedGaps} />
      )}
    </Box>
  )
}

export default KnowledgeGap
