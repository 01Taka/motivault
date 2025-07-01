/** @jsxImportSource @emotion/react */
import { Typography, Checkbox, Stack, Chip, Box, useTheme } from '@mui/material'
import { differenceInSeconds, format } from 'date-fns'
import { useState, useEffect } from 'react'
import type { TimeBlockingTaskRead } from '../../../services/documents/task-documents'
import type { TimeBlockingTags } from '../../../services/documents/time-blocking-document'
import { isWithinNext } from '../../../functions/calendar-time-utils'
import {
  floatY,
  fadeOut,
  pulseBorder,
  completeEffect,
} from './todo-card-animations'

interface TodoTaskCardProps {
  task: TimeBlockingTaskRead
  tags: TimeBlockingTags
  onChangeCompleted: (state: boolean) => void
}

const formatRemainingTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}分${sec.toString().padStart(2, '0')}秒`
}

export const TodoTaskCard: React.FC<TodoTaskCardProps> = ({
  task,
  tags,
  onChangeCompleted,
}) => {
  const isActive = isWithinNext(task.startTime, 30)
  const tagColor = tags[task.tagId]?.color ?? 'white'
  const theme = useTheme()

  const [remainingTime, setRemainingTime] = useState(
    differenceInSeconds(new Date(task.startTime), new Date())
  )

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      const diff = differenceInSeconds(new Date(task.startTime), new Date())
      setRemainingTime(Math.max(0, diff))
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, task.startTime])

  const [animationStage, setAnimationStage] = useState<
    'none' | 'complete' | 'fade'
  >('none')

  useEffect(() => {
    if (task.completed) {
      setAnimationStage('complete')
      const fadeTimer = setTimeout(() => setAnimationStage('fade'), 400)
      return () => clearTimeout(fadeTimer)
    } else {
      setAnimationStage('none')
    }
  }, [task.completed])

  return (
    <Box display="inline-block" width="100%">
      {isActive && (
        <Box
          sx={{
            alignSelf: 'flex-end',
            width: 'fit-content',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontSize: '0.75rem',
            px: 1.5,
            py: 0.5,
            mb: 0.5,
            borderRadius: 9999,
            zIndex: 10,
            boxShadow: theme.shadows[2],
            animation: `${floatY} 2.5s ease-in-out infinite`,
          }}
        >
          🔔 {formatRemainingTime(remainingTime)}で開始
        </Box>
      )}

      <Stack
        justifyContent="space-between"
        sx={{
          padding: 2,
          borderRadius: 3,
          border: isActive ? '2px solid #3B82F6' : '1px solid #E0E0E0',
          height: 100,
          transition: 'all 0.3s ease',
          backgroundColor: isActive ? '#F0F8FF' : '#fff',
          boxShadow: isActive
            ? '0px 0px 10px rgba(59, 130, 246, 0.5)'
            : theme.shadows[2],
          animation:
            animationStage === 'complete'
              ? `${completeEffect} 0.8s ease`
              : animationStage === 'fade'
                ? `${fadeOut} 0.6s ease forwards`
                : isActive
                  ? `${pulseBorder} 2s infinite`
                  : undefined,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Chip
            size="small"
            sx={{
              borderRadius: 1,
              bgcolor: tagColor,
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
            label={format(task.startTime, 'HH:mm')}
          />
          <Chip
            size="small"
            sx={{
              borderRadius: 1,
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
            label={`${Math.floor(task.duration / 60000)}分`}
          />
        </Stack>

        <Typography
          variant="body1"
          sx={{ flexGrow: 1, fontWeight: 500, fontSize: '0.95rem' }}
        >
          {task.title}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox
            sx={{ padding: 0 }}
            checked={task.completed}
            onChange={(e) => onChangeCompleted(e.target.checked)}
          />
          <Typography
            variant="caption"
            sx={{ color: tagColor, fontWeight: 500 }}
          >
            #{tags[task.tagId]?.name ?? ''}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
