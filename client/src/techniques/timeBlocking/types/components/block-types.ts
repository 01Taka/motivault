import type { SelectableColorId } from '../../../../features/color/types/selectable-color-type'
import type { Color } from '../../../../types/utils/color-type'
import type { HHMMTimeNumber } from '../../../../types/utils/datetime-types'

export interface TimeBlockingTimeBlockComponentSubstantialBlock {
  isEmpty: false
  id?: string
  time: HHMMTimeNumber // 0~86399999のmsに変換
  timeMs: number
  connectTop: boolean
  connectBottom: boolean
  colorId: SelectableColorId
  borderColor?: Color
}

export interface TimeBlockingTimeBlockComponentEmptyBlock {
  isEmpty: true
  time: HHMMTimeNumber
  timeMs: number
  connectTop: boolean
  connectBottom: boolean
  id?: string
  colorId?: SelectableColorId
  borderColor?: Color
}

export type TimeBlockingTimeBlockComponentBlock =
  | TimeBlockingTimeBlockComponentSubstantialBlock
  | TimeBlockingTimeBlockComponentEmptyBlock

export interface TimeBlockingBlockInfo {
  settingId: string | null
  name: string
  colorId: SelectableColorId
  startAt: HHMMTimeNumber
  endAt: HHMMTimeNumber
  duration: number | null
}

export interface SeparateTimeBlockingBlock extends TimeBlockingBlockInfo {
  isConnectedStart: boolean
  isConnectedEnd: boolean
}
