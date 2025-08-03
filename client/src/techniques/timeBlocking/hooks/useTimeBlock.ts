import { convertToTimeBlockingComponentBlocks } from '../functions/components/convert-time-block-utils'
import { separateTimeBlockingBlocks } from '../functions/components/separate-time-block-utils'
import type { TimeBlockingBlock } from '../types/data/time-blocking-block-data'

interface UseTimeBlockResult {
  success: boolean
  message: string
  data?: any
}

const useTimeBlock = (
  timeBlockingBlocks: TimeBlockingBlock[],
  intervalMinutes: number
): UseTimeBlockResult => {
  // 引数が配列かどうかを確認
  if (!Array.isArray(timeBlockingBlocks)) {
    return {
      success: false,
      message: 'Invalid argument: timeBlockingBlocks should be an array',
    }
  }

  // timeBlockingBlocksが空の配列の場合
  if (timeBlockingBlocks.length === 0) {
    return {
      success: true,
      message: 'Warning: timeBlockingBlocks is an empty array',
      data: [], // 空のデータを返す
    }
  }

  // 各TimeBlockingBlockが正しい形式か確認
  for (let i = 0; i < timeBlockingBlocks.length; i++) {
    const block = timeBlockingBlocks[i]
    if (!block || typeof block !== 'object') {
      return {
        success: false,
        message: `Invalid item at index ${i}: Each time blocking block should be an object`,
      }
    }
    // ここでさらに具体的なフィールド検証を行うことができる（例えば、`startTime`、`endTime` など）
    if (!block.startAt || !block.endAt) {
      return {
        success: false,
        message: `Invalid item at index ${i}: Missing required fields (startTime, endTime)`,
      }
    }
  }

  let blocks
  // separateTimeBlockingBlocksの呼び出しとエラーハンドリング
  try {
    blocks = separateTimeBlockingBlocks(timeBlockingBlocks, intervalMinutes)
  } catch (error) {
    return {
      success: false,
      message: 'Error occurred while separating time blocking blocks: ' + error,
    }
  }

  if (!Array.isArray(blocks)) {
    return {
      success: false,
      message: 'Error: separateTimeBlockingBlocks did not return an array',
    }
  }

  let componentBlocks
  // convertToTimeBlockingComponentBlocksの呼び出しとエラーハンドリング
  try {
    componentBlocks = convertToTimeBlockingComponentBlocks(blocks)
  } catch (error) {
    return {
      success: false,
      message: 'Error occurred while converting to component blocks: ' + error,
    }
  }

  if (!Array.isArray(componentBlocks)) {
    return {
      success: false,
      message:
        'Error: convertToTimeBlockingComponentBlocks did not return an array',
    }
  }

  return {
    success: true,
    message: 'Success: Time blocks processed successfully',
    data: componentBlocks,
  }
}

export default useTimeBlock
