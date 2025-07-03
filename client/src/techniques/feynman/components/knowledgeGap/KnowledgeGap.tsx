import React, { useEffect, useState } from 'react'
import type { FeynmanKnowledgeGapRead } from '../../services/documents/feynman-knowledge-gap-documents'
import { Box } from '@mui/material'
import { MAX_GAPS_DISPLAY } from '../../constants/feynman-constants'
import { KnowledgeTabSwitcher } from './KnowledgeTabSwitcher'
import UnresolvedKnowledgeGaps from './card/UnresolvedKnowledgeGaps'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import { getAllFeynmanKnowledgeGap } from '../../services/functions/feynman-note-service'

interface KnowledgeGapProps {}

const KnowledgeGap: React.FC<KnowledgeGapProps> = ({}) => {
  const { uid } = useCurrentUserStore()
  const [knowledgeGaps, setKnowledgeGaps] = useState<FeynmanKnowledgeGapRead[]>(
    []
  )

  useEffect(() => {
    const fetchKnowledgeGaps = async () => {
      if (uid) {
        const gaps = await getAllFeynmanKnowledgeGap(uid)
        setKnowledgeGaps(gaps)
      }
    }
    fetchKnowledgeGaps()
  }, [uid])

  const [tab, setTab] = useState<'unresolved' | 'resolved'>('unresolved')

  const recentGaps: FeynmanKnowledgeGapRead[] = (knowledgeGaps ?? []).slice(
    0,
    MAX_GAPS_DISPLAY
  )

  return (
    <Box sx={{ width: '95vw', height: '80vh' }}>
      <KnowledgeTabSwitcher value={tab} onChange={(tab) => setTab(tab)} />
      {tab === 'unresolved' ? (
        <UnresolvedKnowledgeGaps gaps={knowledgeGaps} recentGaps={recentGaps} />
      ) : (
        <Box></Box>
      )}
    </Box>
  )
}

export default KnowledgeGap
