/** @jsxImportSource @emotion/react */
import { IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import { keyframes } from '@emotion/react'

interface ProblemSetTaskQuickCompletionProps {
  nextPages: number[]
  size?: number
  delay?: number
  onPageComplete: (delay: number, page: number) => void
}

// 回転と膨らむアニメーションを定義
const rotateAndScale = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
`

const ProblemSetTaskQuickCompletion: React.FC<
  ProblemSetTaskQuickCompletionProps
> = ({ nextPages, size = 56, delay = 300, onPageComplete }) => {
  const [completedPages, setCompletedPages] = useState<number[]>([])

  const handleClick = (page: number) => {
    setCompletedPages((prev) => [...prev, page]) // 完了したページを追跡
    onPageComplete(delay, page)
  }

  return (
    <Stack direction="row" spacing={1}>
      {nextPages.map((page) => (
        <IconButton
          key={page}
          sx={{
            width: size,
            height: size,
            borderRadius: 2,
            backgroundColor: completedPages.includes(page) ? '#4caf50' : '#fff',
            color: completedPages.includes(page) ? '#fff' : '#000',
            border: '1px solid #ddd',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            // 完了した場合にアニメーションを適用
            '&.completed': {
              backgroundColor: '#4caf50',
              color: '#fff',
              animation: `${rotateAndScale} 0.3s linear`,
            },
            '&:hover': {
              backgroundColor: completedPages.includes(page)
                ? '#4caf50'
                : '#f0f0f0',
              cursor: 'pointer',
            },
          }}
          onClick={() => handleClick(page)}
          className={completedPages.includes(page) ? 'completed' : ''}
        >
          {completedPages.includes(page) ? '✔' : page}
        </IconButton>
      ))}
    </Stack>
  )
}

export default ProblemSetTaskQuickCompletion
