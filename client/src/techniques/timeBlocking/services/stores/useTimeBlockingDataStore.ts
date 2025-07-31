import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig,
} from '../../../../functions/stores/create-repository-store'
import { TimeBlockingBlockSettingIDBRepository } from '../repositories/indexedDB/time-blocking-block-setting-idb-repository'
import { TimeBlockingPlanIDBRepository } from '../repositories/indexedDB/time-blocking-plan-idb-repository'
import { TimeBlockingRepeatLayerIDBRepository } from '../repositories/indexedDB/time-blocking-repeat-layer-idb-repository'
import type { TimeBlockingPlanRead } from '../documents/time-blocking-plan-document'
import type { TimeBlockingBlockSettingRead } from '../documents/time-blocking-block-setting-document'
import type { TimeBlockingRepeatLayerRead } from '../documents/time-blocking-repeat-layer-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbPlan: {
    repo: TimeBlockingPlanIDBRepository,
    dataKey: 'plans' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
  idbSetting: {
    repo: TimeBlockingBlockSettingIDBRepository,
    dataKey: 'settings' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
  idbRepeatLayers: {
    repo: TimeBlockingRepeatLayerIDBRepository,
    dataKey: 'repeatLayers' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  plans: TimeBlockingPlanRead
  settings: TimeBlockingBlockSettingRead
  repeatLayers: TimeBlockingRepeatLayerRead
}

// 3. createIDBRepoStore を使ってストア定義を取得
// 新しいconfigオブジェクトを渡す
const storeDefinition = createIDBRepoStore(
  storeConfig,
  {} as AppDataTypes // _dataTypesは型推論のために必要
)

// 生成されるストアの最終的な型を明示的に定義
type StoreState = GeneratedStore<
  typeof storeConfig,
  ValueFromConfig<typeof storeConfig>,
  AppDataTypes
>

export const useTimeBlockingDataStore = create<StoreState>(storeDefinition)
