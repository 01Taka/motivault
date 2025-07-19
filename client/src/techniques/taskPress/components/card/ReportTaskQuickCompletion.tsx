/** @jsxImportSource @emotion/react */
import React from 'react'
import { Button } from '@mui/material'
import { keyframes } from '@emotion/react'
import type { MergedReportStep } from '../../types/task-press-merge-task-types'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'

interface ReportTaskQuickCompletionProps {
  nextStep: MergedReportStep | null
  isCompleted: boolean
  onCompleteStep: (delay: number, step: MergedReportStep | null) => void
}

// Define fade-out and scale animation
const fadeOutAndScale = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
`

const ReportTaskQuickCompletion: React.FC<ReportTaskQuickCompletionProps> = ({
  nextStep,
  isCompleted,
  onCompleteStep,
}) => {
  const buttonText = isCompleted
    ? '✔ 完了'
    : nextStep
      ? `${nextStep.text} (${Math.floor(nextStep.estimatedTime / MINUTES_IN_MS)}分)`
      : 'すべて完了'

  return (
    <Button
      onClick={() => onCompleteStep(700, nextStep)}
      sx={(theme) => ({
        // Use theme for consistent colors if available, otherwise use hardcoded
        backgroundColor: isCompleted ? '#4caf50' : '#fff',
        color: isCompleted ? '#fff' : '#000',
        border: nextStep ? '1px solid #ddd' : 'none', // Use 'none' for clarity when no border
        fontWeight: 'bold',
        fontSize: '1.1rem',
        padding: '8px 16px',
        borderRadius: theme.shape.borderRadius || 2, // Use theme borderRadius
        textTransform: 'none', // Prevent uppercase transformation

        // Animations and transitions
        transition: 'transform 0.3s ease, opacity 0.5s ease',
        opacity: isCompleted ? 0 : 1,
        animation: isCompleted ? `${fadeOutAndScale} 0.7s forwards` : 'none',

        '&:hover': {
          backgroundColor: isCompleted ? '#4caf50' : '#f0f0f0',
          cursor: 'pointer',
          // Prevent animation on hover when completed
          transform: isCompleted ? 'scale(1)' : 'scale(1.03)', // Slight scale for uncompleted hover
        },
        // Disable button interactions when completed, if desired
        ...(isCompleted && {
          pointerEvents: 'none',
        }),
      })}
    >
      {buttonText}
    </Button>
  )
}

export default ReportTaskQuickCompletion
