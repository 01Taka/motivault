import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig,
} from '../../../../functions/stores/create-repository-store'
import { TimeBlockingBlockSettingIDBRepository } from '../repositories/indexedDB/time-blocking-block-setting-idb-repository'
import { TimeBlockingPlanIDBRepository } from '../repositories/indexedDB/time-blocking-plan-idb-repository'
import type { TimeBlockingPlanRead } from '../documents/time-blocking-plan-document'
import type { TimeBlockingBlockSettingRead } from '../documents/time-blocking-block-setting-document'
import { TimeBlockingTemplateLayerIDBRepository } from '../repositories/indexedDB/time-blocking-template-layer-idb-repository'
import type { TimeBlockingTemplateLayerRead } from '../documents/time-blocking-template-layer-document'

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
  idbTemplateLayers: {
    repo: TimeBlockingTemplateLayerIDBRepository,
    dataKey: 'templateLayers' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  plans: TimeBlockingPlanRead
  settings: TimeBlockingBlockSettingRead
  templateLayers: TimeBlockingTemplateLayerRead
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
