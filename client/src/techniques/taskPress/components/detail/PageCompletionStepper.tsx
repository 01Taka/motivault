// src/components/PageCompletionStepper.tsx
import React from 'react'
import { Box, Chip } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

const COLORS = {
  completedBg: '#BBDEFB', // 昔から完了済み（薄い青）
  completedDiffBg: '#4dafff', // 新たに完了済み（濃い青）
  uncompletedDiffBg: 'rgba(255, 165, 0, 0.15)', // 新たに未完了（薄いオレンジ）
  diffBorder: '#FF9800', // 差分があるときのボーダー色（オレンジ）
}

interface PageCompletionStepperProps {
  pages: { page: number; isCompleted: boolean }[]
  onTogglePageCompletion: (page: number) => void
  pageStateDifferences?: Record<string, boolean>
}

const PageCompletionStepper: React.FC<PageCompletionStepperProps> = ({
  pages,
  onTogglePageCompletion,
  pageStateDifferences = {},
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {pages.map(({ page, isCompleted }) => {
        const pageKey = page.toString()
        const hasDiff = pageStateDifferences.hasOwnProperty(pageKey)
        const getBackgroundColor = (isCompleted: boolean) => {
          return isCompleted
            ? hasDiff
              ? COLORS.completedDiffBg
              : COLORS.completedBg
            : hasDiff
              ? COLORS.uncompletedDiffBg
              : undefined
        }

        return (
          <Chip
            key={page}
            label={`${page} p`}
            onClick={() => onTogglePageCompletion(page)}
            icon={
              isCompleted ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )
            }
            variant={isCompleted ? 'filled' : 'outlined'}
            sx={{
              cursor: 'pointer',
              bgcolor: getBackgroundColor(isCompleted),
              '&:hover': {
                backgroundColor: getBackgroundColor(isCompleted),
              },
            }}
          />
        )
      })}
    </Box>
  )
}

export default PageCompletionStepper
