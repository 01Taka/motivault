import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { AllResolvedPresenter } from '../AllResolvedPresenter'
import { KnowledgeGapList } from '../KnowledgeGapList'
import type { FeynmanKnowledgeGapRead } from '../../../services/documents/feynman-knowledge-gap-documents'
import { explanationMessages } from '../../../constants/explanation-messages-constants'

interface UnresolvedKnowledgeGapsProps {
  gaps: FeynmanKnowledgeGapRead[]
  recentGaps: FeynmanKnowledgeGapRead[]
}

const UnresolvedKnowledgeGaps: React.FC<UnresolvedKnowledgeGapsProps> = ({
  gaps,
  recentGaps,
}) => {
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
          <KnowledgeGapList gaps={recentGaps} onClickGap={() => {}} />
        ) : (
          <AllResolvedPresenter
            message={randomMessage}
            resolveMoreNumber={Math.min(gaps.length, 3)}
            onCreateExplanationClick={() => {}}
            onResolveMoreClick={() => {}}
          />
        )}
      </Box>

      {/* 過去の疑問ボタン */}
      <Box sx={{ mt: 'auto', pt: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {}}
          sx={{
            borderRadius: 3,
            borderColor: 'grey.300',
            color: 'text.primary',
            fontWeight: 500,
            textTransform: 'none',
            px: 2,
            py: 1.5,
            transition: '0.2s',
            '&:hover': {
              backgroundColor: 'grey.100',
              borderColor: 'grey.400',
            },
          }}
        >
          ⬇️ 過去の疑問を表示
        </Button>
      </Box>
    </Stack>
  )
}

export default UnresolvedKnowledgeGaps
