import type { HHMMTimeNumber } from '../../../../types/utils/datetime-types'
import type {
  SeparateTimeBlockingBlock,
  TimeBlockingBlockInfo,
} from '../../types/components/block-types'

// Helper function to convert HH:mm string to minutes
const timeToMinutes = (hhmm: HHMMTimeNumber): number => {
  const hours = Math.floor(hhmm / 100)
  const minutes = hhmm % 100
  return hours * 60 + minutes
}

// Helper function to convert minutes back to HH:mm string
const minutesToTime = (totalMinutes: number): HHMMTimeNumber => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours * 100 + minutes
}

// Helper function to round time to the nearest multiple of intervalMinutes
const roundToInterval = (
  timeInMinutes: number,
  intervalMinutes: number
): number => {
  const remainder = timeInMinutes % intervalMinutes
  if (remainder === 0) return timeInMinutes
  const halfInterval = intervalMinutes / 2
  return (
    timeInMinutes - remainder + (remainder < halfInterval ? 0 : intervalMinutes)
  )
}

// Helper function to create a new separated block with `isConnected` flags
const createSeparatedBlock = (
  block: TimeBlockingBlockInfo,
  currentStartTime: number,
  currentEndTime: number,
  roundedStart: number,
  roundedEnd: number,
  prevEndTime: number | null,
  prevBlock: TimeBlockingBlockInfo | null, // previous block for checking
  nextBlock: TimeBlockingBlockInfo | null // next block for checking
): SeparateTimeBlockingBlock => {
  const isConnectedStart =
    (currentStartTime !== roundedStart &&
      prevEndTime !== null &&
      prevEndTime === currentStartTime) ||
    (prevBlock?.settingId === block.settingId &&
      prevBlock.endAt === block.startAt) // Check if previous block has the same settingId

  const isConnectedEnd =
    currentEndTime !== roundedEnd ||
    (nextBlock?.settingId === block.settingId &&
      nextBlock.startAt === block.endAt) // Check if next block has the same settingId

  return {
    ...block,
    startAt: minutesToTime(currentStartTime),
    endAt: minutesToTime(currentEndTime),
    isConnectedStart,
    isConnectedEnd,
  }
}

// Helper function to split a single block into multiple based on interval
const splitBlockByInterval = (
  block: TimeBlockingBlockInfo,
  intervalMinutes: number,
  prevBlock: TimeBlockingBlockInfo | null, // pass the previous block
  nextBlock: TimeBlockingBlockInfo | null // pass the next block
): SeparateTimeBlockingBlock[] => {
  const startAtMinutes = timeToMinutes(block.startAt)
  const endAtMinutes = timeToMinutes(block.endAt)

  // Round startAt and endAt to nearest interval boundary
  const roundedStart = roundToInterval(startAtMinutes, intervalMinutes)
  const roundedEnd = roundToInterval(endAtMinutes, intervalMinutes)

  const separatedBlocks: SeparateTimeBlockingBlock[] = []
  let prevEndTime: number | null = null
  let currentStartTime = roundedStart

  // Split block into smaller blocks based on the interval
  while (currentStartTime < roundedEnd) {
    const currentEndTime = Math.min(
      currentStartTime + intervalMinutes,
      roundedEnd
    )

    separatedBlocks.push(
      createSeparatedBlock(
        block,
        currentStartTime,
        currentEndTime,
        roundedStart,
        roundedEnd,
        prevEndTime,
        prevBlock,
        nextBlock
      )
    )

    prevEndTime = currentEndTime
    currentStartTime = currentEndTime
  }

  return separatedBlocks
}

// Main function to separate TimeBlockingBlocks based on intervals
export const separateTimeBlockingBlocks = (
  blocks: readonly TimeBlockingBlockInfo[],
  intervalMinutes: number
): SeparateTimeBlockingBlock[] => {
  if (60 % intervalMinutes !== 0) {
    throw new Error('intervalMinutes must divide evenly into 60.')
  }

  const sortedBlocks = [...blocks].sort(
    (a, b) => timeToMinutes(a.startAt) - timeToMinutes(b.startAt)
  )

  const allSeparatedBlocks: SeparateTimeBlockingBlock[] = []

  sortedBlocks.forEach((block, index) => {
    const prevBlock = sortedBlocks[index - 1] || null
    const nextBlock = sortedBlocks[index + 1] || null

    const separatedBlocks = splitBlockByInterval(
      block,
      intervalMinutes,
      prevBlock,
      nextBlock
    )
    allSeparatedBlocks.push(...separatedBlocks)
  })

  return allSeparatedBlocks
}
