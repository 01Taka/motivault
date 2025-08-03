import type { SelectableColorId } from '../../../../features/color/types/selectable-color-type'
import type {
  SeparateTimeBlockingBlock,
  TimeBlockingTimeBlockComponentSubstantialBlock,
  TimeBlockingTimeBlockComponentEmptyBlock,
  TimeBlockingTimeBlockComponentBlock,
} from '../../types/components/block-types'
import { hhmmToMilliseconds, millisecondsToHhMm } from '../utils/hhmm-utils'

const getIntervalFromBlocks = (blocks: SeparateTimeBlockingBlock[]): number => {
  const startTime = hhmmToMilliseconds(blocks[0].startAt)
  const endTime = hhmmToMilliseconds(blocks[0].endAt)
  return (endTime - startTime) / 60000 // Calculate the interval in minutes
}

// Helper to determine if a block is connected at the start
const isConnectedStart = (
  currentEmptyMs: number,
  prevEndMs: number,
  emptySpritIntervalMinutes: number | undefined
): boolean => {
  return emptySpritIntervalMinutes
    ? (currentEmptyMs / 60000) % emptySpritIntervalMinutes !== 0 &&
        currentEmptyMs !== prevEndMs
    : true
}

// Helper to determine if a block is connected at the end
const isConnectedEnd = (
  currentEmptyMs: number,
  borderMs: number,
  intervalMinutes: number,
  emptySpritIntervalMinutes: number | undefined
): boolean => {
  return emptySpritIntervalMinutes
    ? (currentEmptyMs / 60000 + intervalMinutes) % emptySpritIntervalMinutes !==
        0 && currentEmptyMs + intervalMinutes * 60000 < borderMs
    : true
}

// Helper to create empty blocks
const createEmptyBlock = (
  currentEmptyMs: number,
  connectedStart: boolean,
  connectedEnd: boolean,
  colorId: SelectableColorId = 'silver-gray'
): TimeBlockingTimeBlockComponentEmptyBlock => {
  return {
    isEmpty: true,
    time: millisecondsToHhMm(currentEmptyMs),
    timeMs: currentEmptyMs,
    connectTop: connectedStart,
    connectBottom: connectedEnd,
    colorId,
  }
}

// Helper to create substantial blocks
const createSubstantialBlock = (
  block: SeparateTimeBlockingBlock,
  timeMs: number
): TimeBlockingTimeBlockComponentSubstantialBlock => {
  return {
    isEmpty: false,
    id: block.name, // or another identifier
    time: millisecondsToHhMm(timeMs),
    timeMs,
    connectTop: block.isConnectedStart,
    connectBottom: block.isConnectedEnd,
    colorId: block.colorId,
  }
}

export const convertToTimeBlockingComponentBlocks = (
  blocks: SeparateTimeBlockingBlock[],
  intervalMinutes?: number,
  emptySpritIntervalMinutes?: number
): TimeBlockingTimeBlockComponentBlock[] => {
  if (intervalMinutes === undefined) {
    intervalMinutes = getIntervalFromBlocks(blocks)
  }

  const result: TimeBlockingTimeBlockComponentBlock[] = []
  let prevEndMs = 0

  // Fill empty blocks for the gap and substantial blocks
  blocks.forEach((block) => {
    const startMs = hhmmToMilliseconds(block.startAt)
    const endMs = hhmmToMilliseconds(block.endAt)

    // Fill empty blocks for the gap between prevEndMs and the current block's start time
    if (startMs > prevEndMs) {
      let currentEmptyMs = prevEndMs
      while (currentEmptyMs < startMs) {
        const connectedStart = isConnectedStart(
          currentEmptyMs,
          prevEndMs,
          emptySpritIntervalMinutes
        )
        const connectedEnd = isConnectedEnd(
          currentEmptyMs,
          startMs,
          intervalMinutes,
          emptySpritIntervalMinutes
        )

        result.push(
          createEmptyBlock(currentEmptyMs, connectedStart, connectedEnd)
        )
        currentEmptyMs += intervalMinutes * 60000
      }
    }

    // Convert substantial block
    result.push(createSubstantialBlock(block, startMs))

    prevEndMs = endMs
  })

  // Fill remaining empty blocks after the last block up to 24:00
  let currentEmptyMs = prevEndMs
  const endOfDayMs = 24 * 60 * 60 * 1000
  while (currentEmptyMs < endOfDayMs) {
    const connectedStart = isConnectedStart(
      currentEmptyMs,
      prevEndMs,
      emptySpritIntervalMinutes
    )
    const connectedEnd = isConnectedEnd(
      currentEmptyMs,
      endOfDayMs,
      intervalMinutes,
      emptySpritIntervalMinutes
    )

    result.push(createEmptyBlock(currentEmptyMs, connectedStart, connectedEnd))
    currentEmptyMs += intervalMinutes * 60000
  }

  return result
}
