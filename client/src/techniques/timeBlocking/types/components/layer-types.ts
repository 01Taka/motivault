import type { MinuteSecondNumber } from '../../../../types/utils/datetime-types'
import type { TimeBlockingBlock } from '../data/time-blocking-block-data'

export interface TimeBlockingCreateLayerFormState {
  blocks: TimeBlockingLayerDisplayBlock[]
}

export interface TimeBlockingLayerDisplayBlockMinutes {
  start: MinuteSecondNumber
  end: MinuteSecondNumber
  connectedStart: boolean
  connectedEnd: boolean
  block: TimeBlockingBlock
}

export interface TimeBlockingLayerDisplayBlock {
  hour: number // 0~23
  minutes: TimeBlockingLayerDisplayBlockMinutes[]
}
