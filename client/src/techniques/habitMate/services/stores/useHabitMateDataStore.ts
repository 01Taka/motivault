import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig, // ValueFromMap から ValueFromConfig に変更
} from '../../../../functions/stores/create-repository-store'
import { HabitMateHabitIDBRepository } from '../repositories/habit-mate-habit-idb-repository'
import type { HabitMateHabitRead } from '../documents/habit-mate-habit-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbHabit: {
    repo: HabitMateHabitIDBRepository,
    dataKey: 'habits' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  habits: HabitMateHabitRead
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

export const useHabitMateDataStore = create<StoreState>(storeDefinition)
