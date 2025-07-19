// src/components/ProblemSetDetail.tsx
import React from 'react'
import { Box, Typography, Stack, Button } from '@mui/material'
import PageCompletionStepper from './PageCompletionStepper'

interface ProblemSetDetailProps {
  pages: { page: number; isCompleted: boolean }[]
  pageStateDifferences?: Record<string, boolean>
  onTogglePageCompletion: (page: number) => void
  resetDifferences: () => void
  onAllCompleted: () => void
}

const ProblemSetDetail: React.FC<ProblemSetDetailProps> = ({
  pages,
  pageStateDifferences,
  onTogglePageCompletion,
  resetDifferences,
  onAllCompleted,
}) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Pages: {pages.length}
      </Typography>

      <PageCompletionStepper
        pages={pages}
        onTogglePageCompletion={onTogglePageCompletion}
        pageStateDifferences={pageStateDifferences}
      />

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={resetDifferences}>
          キャンセル
        </Button>
        <Button variant="outlined" onClick={onAllCompleted}>
          すべて完了
        </Button>
      </Stack>

      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        ※モーダルを閉じると、ページの完了状態は自動的に保存されます。
      </Typography>
    </Box>
  )
}

export default ProblemSetDetail
