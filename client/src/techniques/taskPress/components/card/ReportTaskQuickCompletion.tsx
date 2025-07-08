/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { keyframes } from '@emotion/react'
import type { TaskPressReportStep } from '../../types/task-press-task-types'

interface ReportTaskQuickCompletionProps {
  nextStep: TaskPressReportStep | null
  onCompleteStep: (delay: number) => void
}

// フェードアウトとスケールのアニメーションを定義
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
  onCompleteStep,
}) => {
  const [completedStepOrders, setCompletedStepOrders] = useState<number[]>([])

  const handleClick = () => {
    onCompleteStep(700) // 遅延時間を設定して完了処理を開始
    if (nextStep) {
      setCompletedStepOrders((prev) => [...prev, nextStep.order])
    }
  }

  const completed = nextStep
    ? completedStepOrders.includes(nextStep.order)
    : false

  return (
    <Button
      onClick={handleClick}
      sx={{
        backgroundColor: completed ? '#4caf50' : '#fff',
        color: completed ? '#fff' : '#000',
        border: '1px solid #ddd',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        padding: '8px 16px',
        borderRadius: 2,
        transition: 'transform 0.3s ease, opacity 0.5s ease',
        '&:hover': {
          backgroundColor: completed ? '#4caf50' : '#f0f0f0',
          cursor: 'pointer',
          // 完了後はアニメーションが起きないように調整
          transform: 'scale(1)',
        },
        opacity: completed ? 0 : 1, // 完了時にフェードアウト
        animation: completed ? `${fadeOutAndScale} 0.7s forwards` : 'none', // 完了時にアニメーションを適用
        textTransform: 'none',
      }}
    >
      {completed ? '✔ 完了' : nextStep ? nextStep.text : 'すべて完了'}
    </Button>
  )
}

export default ReportTaskQuickCompletion
