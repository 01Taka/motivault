import React from 'react'
import type { TaskBlock } from '../../../types/time-blocking-task'
import { HOURS_IN_MS } from '../../../../../constants/datetime-constants'
import { getYPosition } from '../../../functions/calendar-time-utils'
import CalendarTaskBlock from './CalendarTaskBlock'

interface TBCalTaskBlocksProps {
  blocks: TaskBlock[]
  cellHeight: number
}

const TBCalTaskBlocks: React.FC<TBCalTaskBlocksProps> = ({
  blocks,
  cellHeight,
}) => {
  return blocks.map((block, idx) => {
    const startY = getYPosition(block.start)
    const durationInHours = (block.end - block.start) / HOURS_IN_MS
    const height = durationInHours * cellHeight

    return (
      <CalendarTaskBlock
        key={idx}
        block={block}
        startY={startY}
        blockHeight={height}
      />
    )
  })
}

export default TBCalTaskBlocks
