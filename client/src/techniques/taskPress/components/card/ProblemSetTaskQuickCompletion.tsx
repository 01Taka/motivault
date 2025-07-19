/** @jsxImportSource @emotion/react */
import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { keyframes } from '@emotion/react'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'

interface ProblemSetTaskQuickCompletionProps {
  nextPages: number[]
  timePerPage: number
  animatingPages?: number[]
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
> = ({
  nextPages,
  timePerPage,
  animatingPages = [],
  size = 56,
  delay = 300,
  onPageComplete,
}) => {
  const handleClick = (page: number) => {
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
            position: 'relative',
            borderRadius: 2,
            backgroundColor: animatingPages.includes(page) ? '#4caf50' : '#fff',
            color: animatingPages.includes(page) ? '#fff' : '#000',
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
              backgroundColor: animatingPages.includes(page)
                ? '#4caf50'
                : '#f0f0f0',
              cursor: 'pointer',
            },
          }}
          onClick={() => handleClick(page)}
          className={animatingPages.includes(page) ? 'completed' : ''}
        >
          {animatingPages.includes(page) ? '✔' : page}
          <Typography
            variant="caption"
            color="textDisabled"
            sx={{ position: 'absolute', bottom: 0, right: 1 }}
          >
            {Math.floor(timePerPage / MINUTES_IN_MS)}分
          </Typography>
        </IconButton>
      ))}
    </Stack>
  )
}

export default ProblemSetTaskQuickCompletion
