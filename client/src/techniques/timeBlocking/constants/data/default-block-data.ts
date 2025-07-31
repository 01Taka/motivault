// タイムゾーンレイヤー（timezoneLayer）用のデフォルトブロック
export const TIME_BLOCKING_TIMEZONE_BLOCKS_MAP = {
  home: {
    name: 'home' as const,
    color: '#F48FB1', // ピンク
    recommendedLayerType: 'timezoneLayer' as const,
  },
  workSchool: {
    name: 'workSchool' as const,
    color: '#81C784', // 緑
    recommendedLayerType: 'timezoneLayer' as const,
  },
  out: {
    name: 'out' as const,
    color: '#64B5F6', // 青
    recommendedLayerType: 'timezoneLayer' as const,
  },
}

// ルーティンレイヤー（routineLayer）用のデフォルトブロック
export const TIME_BLOCKING_ROUTINE_BLOCKS_MAP = {
  sleep: {
    name: 'sleep' as const,
    color: '#5C6BC0', // 濃い青
    recommendedLayerType: 'routineLayer' as const,
  },
  meal: {
    name: 'meal' as const,
    color: '#FFB74D', // オレンジ
    recommendedLayerType: 'routineLayer' as const,
  },
  commute: {
    name: 'commute' as const,
    color: '#9E9E9E', // グレー
    recommendedLayerType: 'routineLayer' as const,
  },
  bath: {
    name: 'bath' as const,
    color: '#4DD0E1', // 水色
    recommendedLayerType: 'routineLayer' as const,
  },
}

// 目的レイヤー（purposeLayer）用のデフォルトブロック
export const WORK_PURPOSE_BLOCKS_MAP = {
  workDeep: {
    name: 'workDeep' as const,
    color: '#E53935', // 赤
    recommendedLayerType: 'purposeLayer' as const,
  },
  workLight: {
    name: 'workLight' as const,
    color: '#FFEB3B', // 黄色
    recommendedLayerType: 'purposeLayer' as const,
  },
}

export const NEUTRAL_PURPOSE_BLOCKS_MAP = {
  communication: {
    name: 'communication' as const,
    color: '#AB47BC', // 紫
    recommendedLayerType: 'purposeLayer' as const,
  },
  exercise: {
    name: 'exercise' as const,
    color: '#8D6E63', // 茶色
    recommendedLayerType: 'purposeLayer' as const,
  },
  flexible: {
    name: 'flexible' as const,
    color: '#CFD8DC', // 薄いグレー
    recommendedLayerType: 'purposeLayer' as const,
  },
}

export const RELAX_PURPOSE_BLOCKS_MAP = {
  refresh: {
    name: 'refresh' as const,
    color: '#F06292', // ホットピンク
    recommendedLayerType: 'purposeLayer' as const,
  },
  play: {
    name: 'play' as const,
    color: '#26A69A', // ターコイズ
    recommendedLayerType: 'purposeLayer' as const,
  },
}

export const TIME_BLOCKING_PURPOSE_BLOCKS_MAP = {
  work: WORK_PURPOSE_BLOCKS_MAP,
  neutral: NEUTRAL_PURPOSE_BLOCKS_MAP,
  relax: RELAX_PURPOSE_BLOCKS_MAP,
}

export const TIME_BLOCKING_BLOCKS_MAP = {
  ...TIME_BLOCKING_TIMEZONE_BLOCKS_MAP,
  ...TIME_BLOCKING_ROUTINE_BLOCKS_MAP,
  ...WORK_PURPOSE_BLOCKS_MAP,
  ...NEUTRAL_PURPOSE_BLOCKS_MAP,
  ...RELAX_PURPOSE_BLOCKS_MAP,
} as const
