// src/components/ReportDetail.tsx
import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import type { MergedReportStep } from '../../types/task-press-merge-task-types'
import StepCompletionList from './StepCompletionList'

interface ReportDetailProps {
  steps: MergedReportStep[]
  stepStateDifferences: Record<string, boolean>
  onToggleStepCompletion: (order: number) => void
  resetDifferences: () => void
  onAllCompleted: () => void
}

const ReportDetail: React.FC<ReportDetailProps> = ({
  steps,
  stepStateDifferences,
  onToggleStepCompletion,
  resetDifferences,
  onAllCompleted,
}) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Steps:
      </Typography>
      <StepCompletionList
        steps={steps}
        stepStateDifferences={stepStateDifferences}
        onToggleStepCompletion={onToggleStepCompletion}
      />

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={resetDifferences}>
          キャンセル
        </Button>
        <Button variant="outlined" onClick={onAllCompleted}>
          すべて完了
        </Button>
      </Stack>

      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        ※モーダルを閉じると、ページのステップの状態は自動的に保存されます。
      </Typography>
    </Box>
  )
}

export default ReportDetail
