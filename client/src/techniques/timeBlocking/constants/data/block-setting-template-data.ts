import type { SelectableColorId } from '../../../../features/color/types/selectable-color-type'
import type { TimeBlockingBlockSetting } from '../../services/documents/time-blocking-block-setting-document'

// タイムゾーンレイヤー（locationLayer）用のデフォルトブロック
export const TIME_BLOCKING_LOCATION_BLOCKS_MAP = {
  home: {
    docId: 'templateSetting_Home',
    name: 'home' as const,
    colorId: 'hot-pink' as SelectableColorId, // ピンク
    recommendedLayerType: 'locationLayer' as const,
  },
  workSchool: {
    docId: 'templateSetting_WorkSchool',
    name: 'workSchool' as const,
    colorId: 'lime-green' as SelectableColorId, // 緑
    recommendedLayerType: 'locationLayer' as const,
  },
  out: {
    docId: 'templateSetting_Out',
    name: 'out' as const,
    colorId: 'sky-blue' as SelectableColorId, // 青
    recommendedLayerType: 'locationLayer' as const,
  },
}

// ルーティンレイヤー（routineLayer）用のデフォルトブロック
export const TIME_BLOCKING_ROUTINE_BLOCKS_MAP = {
  sleep: {
    docId: 'templateSetting_Sleep',
    name: 'sleep' as const,
    colorId: 'violet-purple' as SelectableColorId, // 濃い青（紫系）
    recommendedLayerType: 'routineLayer' as const,
  },
  meal: {
    docId: 'templateSetting_Meal',
    name: 'meal' as const,
    colorId: 'peach-orange' as SelectableColorId, // オレンジ
    recommendedLayerType: 'routineLayer' as const,
  },
  commute: {
    docId: 'templateSetting_Commute',
    name: 'commute' as const,
    colorId: 'slate-gray' as SelectableColorId, // グレー
    recommendedLayerType: 'routineLayer' as const,
  },
  bath: {
    docId: 'templateSetting_Bath',
    name: 'bath' as const,
    colorId: 'mint-green' as SelectableColorId, // 水色（緑系）
    recommendedLayerType: 'routineLayer' as const,
  },
}

// 目的レイヤー（purposeLayer）用のデフォルトブロック
export const WORK_PURPOSE_BLOCKS_MAP = {
  workDeep: {
    docId: 'templateSetting_WorkDeep',
    name: 'workDeep' as const,
    colorId: 'vibrant-red' as SelectableColorId, // 赤
    recommendedLayerType: 'purposeLayer' as const,
  },
  workLight: {
    docId: 'templateSetting_WorkLight',
    name: 'workLight' as const,
    colorId: 'electric-yellow' as SelectableColorId, // 黄色
    recommendedLayerType: 'purposeLayer' as const,
  },
}

export const NEUTRAL_PURPOSE_BLOCKS_MAP = {
  communication: {
    docId: 'templateSetting_Communication',
    name: 'communication' as const,
    colorId: 'electric-purple' as SelectableColorId, // 紫
    recommendedLayerType: 'purposeLayer' as const,
  },
  exercise: {
    docId: 'templateSetting_Exercise',
    name: 'exercise' as const,
    colorId: 'charcoal-gray' as SelectableColorId, // 茶色に近いグレー
    recommendedLayerType: 'purposeLayer' as const,
  },
  flexible: {
    docId: 'templateSetting_Flexible',
    name: 'flexible' as const,
    colorId: 'silver-gray' as SelectableColorId, // 薄いグレー
    recommendedLayerType: 'purposeLayer' as const,
  },
}

export const RELAX_PURPOSE_BLOCKS_MAP = {
  refresh: {
    docId: 'templateSetting_Refresh',
    name: 'refresh' as const,
    colorId: 'rose-pink' as SelectableColorId, // ホットピンク
    recommendedLayerType: 'purposeLayer' as const,
  },
  play: {
    docId: 'templateSetting_Play',
    name: 'play' as const,
    colorId: 'mint-green' as SelectableColorId, // ターコイズ
    recommendedLayerType: 'purposeLayer' as const,
  },
}

export const TIME_BLOCKING_PURPOSE_BLOCKS_MAP = {
  work: WORK_PURPOSE_BLOCKS_MAP,
  neutral: NEUTRAL_PURPOSE_BLOCKS_MAP,
  relax: RELAX_PURPOSE_BLOCKS_MAP,
}

export const TIME_BLOCKING_BLOCKS_MAP = {
  ...TIME_BLOCKING_LOCATION_BLOCKS_MAP,
  ...TIME_BLOCKING_ROUTINE_BLOCKS_MAP,
  ...WORK_PURPOSE_BLOCKS_MAP,
  ...NEUTRAL_PURPOSE_BLOCKS_MAP,
  ...RELAX_PURPOSE_BLOCKS_MAP,
} as const as Record<string, TimeBlockingBlockSetting>
