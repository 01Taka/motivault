import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AllResolvedPresenter } from './AllResolvedPresenter'
import RecommendedGapList from './RecommendedGapList'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'
import { explanationMessages } from '../../../constants/explanation-messages-constants'
import KnowledgeGapCardList from '../card/KnowledgeGapCardList'
import TogglePastGapsButton from './TogglePastGapsButton'

interface UnresolvedKnowledgeGapsProps {
  recentGaps: FeynmanKnowledgeGapRead[]
  pastGaps: FeynmanKnowledgeGapRead[]
  resolveMoreNumber: number
  onClickGap: (gap: FeynmanKnowledgeGapRead) => void
}

const UnresolvedKnowledgeGaps: React.FC<UnresolvedKnowledgeGapsProps> = ({
  recentGaps,
  pastGaps,
  resolveMoreNumber,
  onClickGap,
}) => {
  const [showingAllGaps, setShowingAllGaps] = useState(false)

  const messageList = Object.values(explanationMessages)
  const randomMessage =
    messageList[Math.floor(Math.random() * messageList.length)]

  return (
    <Stack
      sx={{
        height: '100%',
        overflowY: 'auto',
        px: 1,
        pt: 4,
        pb: 8,
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h6" textAlign="center" mb={2}>
        疑問をタップして解消しよう！
      </Typography>

      {/* メイン表示部分 */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {recentGaps.length > 0 ? (
          <RecommendedGapList gaps={recentGaps} onClickGap={onClickGap} />
        ) : (
          <AllResolvedPresenter
            message={randomMessage}
            resolveMoreNumber={resolveMoreNumber}
            onCreateExplanationClick={() => {}}
            onResolveMoreClick={() => {}}
          />
        )}
      </Box>

      {showingAllGaps && (
        <KnowledgeGapCardList
          gaps={pastGaps}
          colorType="unresolved"
          onClickGap={onClickGap}
        />
      )}

      {/* 過去の疑問ボタン */}
      <Box sx={{ mt: 'auto', pt: 3 }}>
        <TogglePastGapsButton
          isOpen={showingAllGaps}
          onToggle={() => setShowingAllGaps((prev) => !prev)}
        />
      </Box>
    </Stack>
  )
}

export default UnresolvedKnowledgeGaps
