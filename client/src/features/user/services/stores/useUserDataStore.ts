import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type RepoStoreConfig,
  type ValueFromConfig, // ValueFromMap から ValueFromConfig に変更
} from '../../../../functions/stores/create-repository-store'
import { UserIDBRepository } from '../repositories/user-idb-repository'
import type { UserRead } from '../documents/user-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig: RepoStoreConfig = {
  idbUser: {
    repo: UserIDBRepository,
    dataKey: 'users' as const,
    subscriptionType: 'singleton',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  users: UserRead
}

// 3. createIDBRepoStore を使ってストア定義を取得
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

export const useUserDataStore = create<StoreState>(storeDefinition)
