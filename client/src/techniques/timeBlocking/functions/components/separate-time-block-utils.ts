import type { HHMMTimeNumber } from '../../../../types/utils/datetime-types'
import type {
  SeparateTimeBlockingBlock,
  TimeBlockingBlockInfo,
} from '../../types/components/block-types'

// Helper function to convert HH:mm string to minutes
const timeToMinutes = (hhmm: HHMMTimeNumber): number => {
  // HHMM形式から時間と分を抽出
  const hours = Math.floor(hhmm / 100)
  const minutes = hhmm % 100

  // 抽出した時間と分からミリ秒を計算
  return hours * 60 + minutes
}

// Helper function to convert minutes back to HH:mm string
const minutesToTime = (totalMinutes: number): HHMMTimeNumber => {
  // ミリ秒を時間と分に変換
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
  prevEndTime: number | null
): SeparateTimeBlockingBlock => {
  const isConnectedStart =
    currentStartTime !== roundedStart &&
    prevEndTime !== null &&
    prevEndTime === currentStartTime
  const isConnectedEnd = currentEndTime !== roundedEnd

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
  intervalMinutes: number
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
        prevEndTime
      )
    )

    prevEndTime = currentEndTime
    currentStartTime = currentEndTime
  }

  return separatedBlocks
}

// Main function to separate TimeBlockingBlocks based on intervals
export const separateTimeBlockingBlocks = (
  blocks: TimeBlockingBlockInfo[],
  intervalMinutes: number
): SeparateTimeBlockingBlock[] => {
  if (60 % intervalMinutes !== 0) {
    throw new Error('intervalMinutes must divide evenly into 60.')
  }

  const allSeparatedBlocks: SeparateTimeBlockingBlock[] = []

  blocks.forEach((block) => {
    const separatedBlocks = splitBlockByInterval(block, intervalMinutes)
    allSeparatedBlocks.push(...separatedBlocks)
  })

  return allSeparatedBlocks
}
