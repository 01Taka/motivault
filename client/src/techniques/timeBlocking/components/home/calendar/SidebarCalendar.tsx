import React, { useEffect, useRef } from 'react'
import { Box, Stack, useTheme } from '@mui/material'
import { useCalendarTime } from '../../../hooks/useCalendarTime'
import type { TaskBlock } from '../../../types/time-blocking-task'
import {
  getClickedTime,
  getStartOfDayFromStartHour,
  getYPosition,
} from '../../../functions/calendar-time-utils'
import TBCalHourLabels from './TBCalHourLabels'
import TBCalTaskBlocks from './TBCalTaskBlocks'
import TBCalDateCircle from './TBCalDateCircle'

interface SidebarCalendarProps {
  onTimeClick?: (time: number) => void
  blocks?: TaskBlock[]
}

const CELL_HEIGHT = 60 // 1時間あたりの高さ（px）

const SidebarCalendar: React.FC<SidebarCalendarProps> = ({
  onTimeClick,
  blocks = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollBoxRef = useRef<HTMLDivElement>(null)

  const theme = useTheme()
  const { hours } = useCalendarTime()

  useEffect(() => {
    const scrollEl = scrollBoxRef.current
    if (scrollEl) {
      const y = getYPosition(Date.now()) - 100 // 少し上余白
      scrollEl.scrollTop = Math.max(y, 0)
    }
  }, [])

  const handleTimeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetY = e.clientY - rect.top + e.currentTarget.scrollTop
    const clickedTime = getClickedTime(offsetY)

    onTimeClick?.(clickedTime.valueOf())
  }

  return (
    <Stack
      alignItems="center"
      ref={containerRef}
      sx={{
        width: '35%',
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        height: '95vh',
      }}
    >
      <Box>
        <TBCalDateCircle date={getStartOfDayFromStartHour(Date.now())} />
      </Box>

      <Box
        ref={scrollBoxRef}
        sx={{
          maxWidth: 200,
          width: '100%',
          height: '90%',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={handleTimeClick}
      >
        <TBCalHourLabels hours={hours} cellHeight={CELL_HEIGHT} />
        <TBCalTaskBlocks blocks={blocks} cellHeight={CELL_HEIGHT} />
        {/* 現在時刻ライン */}
        <Box
          sx={{
            position: 'absolute',
            top: getYPosition(Date.now()),
            left: 0,
            width: '100%',
            borderTop: `2px solid ${theme.palette.primary.main}`,
            zIndex: 10,
          }}
        />
      </Box>
    </Stack>
  )
}

export default SidebarCalendar
