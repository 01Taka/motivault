import { create } from 'zustand'
import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig,
} from '../../../../functions/stores/create-repository-store'
import { TechniqueMetadataIDBRepository } from '../repositories/idb/technique-metadata-idb-repository'
import type { TechniqueMetadataRead } from '../documents/metadata/technique-metadata-schema'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbMetadata: {
    repo: TechniqueMetadataIDBRepository,
    dataKey: 'metadata' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  metadata: TechniqueMetadataRead
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

export const useTechniqueMetadataDataStore = create<StoreState>(storeDefinition)
