import { Stack, TextField, Typography, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import SentimentFeedbackIconButtons from './SentimentFeedbackIconButtons'
import type {
  TinyStepsGoal,
  TinyStepsMoodFeedback,
  TinyStepsTag,
} from '../../types/goal-types'
import { moodColors } from '../../constants/mood-constants'
import GoalCard from '../GoalCard'

interface FeedbackFormProps {
  onSubmit: () => void
  data: {
    goal: TinyStepsGoal
    tag: TinyStepsTag
  }
  timer: number
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  data,
  timer,
  onSubmit,
}) => {
  const [mood, setMood] = useState<TinyStepsMoodFeedback | ''>('') // mood の状態
  const [comment, setComment] = useState('') // コメントの状態
  const isButtonDisabled = mood === ''

  return (
    <Stack
      alignItems="center"
      sx={{
        padding: 1,
        borderRadius: 2,
        bgcolor: mood ? moodColors[mood].backgroundColor : 'white', // mood に基づいた背景色
        boxShadow: 2, // 軽いシャドウを追加
        height: '90vh',
        overflowY: 'auto',
      }}
    >
      <GoalCard data={data} timer={timer} bgColor="rgba(230, 230, 230, 0.7)" />
      <Box sx={{ padding: 2 }}>
        {/* 感情フィードバックセクション */}
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          今の気分はどうですか？
        </Typography>
        <SentimentFeedbackIconButtons mood={mood} onChangeMood={setMood} />

        {/* コメントセクション */}
        <Box sx={{ marginTop: 3, width: '100%' }}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            コメント（任意）
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="気分や感じたことについて自由なコメント"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1, // ボーダーの角を丸く
              },
            }}
          />
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={isButtonDisabled}
            onClick={onSubmit}
            sx={{
              bgcolor: mood ? moodColors[mood].color : 'gray',
              padding: '10px',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: isButtonDisabled ? '#1976d2' : '#1565c0', // ボタンが無効の時は通常色で、無効時に濃くする
              },
            }}
          >
            フィードバックを送信
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}

export default FeedbackForm
