import React, { useEffect, useState } from 'react'
import { KnowledgeGapList } from './knowledgeGap/KnowledgeGapList'
import CreateNoteFab from './navigation/CreateNoteFab'
import FeynmanBottomNav from './navigation/FeynmanBottomNav'
import { useCurrentUserStore } from '../../../stores/user/currentUserStore'
import { getAllFeynmanKnowledgeGap } from '../services/functions/feynman-note-service'
import type { FeynmanKnowledgeGapRead } from '../services/documents/feynman-knowledge-gap-documents'
import { useNavigate } from 'react-router-dom'

interface FeynmanTechniqueProps {}

const FeynmanTechnique: React.FC<FeynmanTechniqueProps> = ({}) => {
  const navigate = useNavigate()
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

  return (
    <div>
      <KnowledgeGapList gaps={knowledgeGaps} onShowMore={() => {}} />
      <FeynmanBottomNav />
      <CreateNoteFab onClick={() => navigate('create')} />
    </div>
  )
}

export default FeynmanTechnique
