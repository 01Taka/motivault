import { Stack } from '@mui/material'
import React from 'react'
import TaskProgressSummaryCard from './TaskProgressSummaryCard'
import { MINUTES_IN_MS } from '../../../../../constants/datetime-constants'

interface TaskProgressSummaryProps {
  dailyEstimatedTime: number
  remainingDays: number
  remainingCount: number
  countLabel: string
}

const TaskProgressSummary: React.FC<TaskProgressSummaryProps> = ({
  dailyEstimatedTime,
  remainingDays,
  remainingCount,
  countLabel,
}) => {
  // 共通部分を配列でまとめて、mapで繰り返す
  const summaryData = [
    {
      label: '一日の目安',
      text: `${Math.floor(dailyEstimatedTime / MINUTES_IN_MS)}分/日`,
    },
    { label: '残り日数', text: `${remainingDays}日` },
    { label: `残り${countLabel}`, text: `${remainingCount}${countLabel}` },
  ]

  return (
    <Stack spacing={0.5}>
      {summaryData.map((item, index) => (
        <TaskProgressSummaryCard
          key={index}
          label={item.label}
          text={item.text}
        />
      ))}
    </Stack>
  )
}

export default TaskProgressSummary
