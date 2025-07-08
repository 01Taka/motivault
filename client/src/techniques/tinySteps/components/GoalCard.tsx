import React from 'react'
import { Typography, Chip, Rating, Stack } from '@mui/material'
import type { TinyStepsGoal, TinyStepsTag } from '../types/goal-types'
import { format } from 'date-fns'

interface GoalCardProps {
  timer: number
  data: {
    goal: TinyStepsGoal
    tag: TinyStepsTag
  } | null
  bgColor?: string
}

const GoalCard: React.FC<GoalCardProps> = ({ timer, data, bgColor }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        borderRadius: 3,
        backgroundColor: bgColor ?? (data ? data.tag.backgroundColor : '#fff'),
        boxShadow: 2,
        position: 'relative',
      }}
    >
      {/* タイマー */}
      <Typography
        sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }}
      >
        {format(timer, 'mm:ss')}
      </Typography>

      {/* タグ */}
      <Chip
        label={data?.tag.title ?? '#タグ'}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: data?.tag.color ?? 'gray',
          color: 'white',
        }}
      />
      {/* レベル */}
      <Rating
        name="goal-level"
        value={data?.goal.level ?? 0}
        max={3}
        readOnly
        size="small"
        sx={{ position: 'absolute', bottom: 10, right: 10 }}
      />

      {/* 目標テキスト */}
      <Typography
        variant="h6"
        sx={{
          marginTop: 3,
          fontWeight: 'bold',
          padding: 3,
          pb: 4,
          color: data ? 'black' : '#gray',
        }}
      >
        {data?.goal.text ?? '小さな一歩をふみ出す'}
      </Typography>
    </Stack>
  )
}

export default GoalCard
