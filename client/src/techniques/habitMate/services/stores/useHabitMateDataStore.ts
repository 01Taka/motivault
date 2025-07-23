import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig, // ValueFromMap から ValueFromConfig に変更
} from '../../../../functions/stores/create-repository-store'
import { HabitMateHabitIDBRepository } from '../repositories/habit-mate-habit-idb-repository'
import type { HabitMateHabitRead } from '../documents/habit-mate-habit-document'
import { HabitMateMetadataIDBRepository } from '../repositories/habit-mate-metadata-idb-repository'
import type { HabitMateMetadataRead } from '../documents/habit-mate-metadata-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const habitMateConfig = {
  idbHabit: {
    repo: HabitMateHabitIDBRepository,
    dataKey: 'habits',
    subscriptionType: 'collection',
  },
  idbMetadata: {
    repo: HabitMateMetadataIDBRepository,
    dataKey: 'metadata',
    subscriptionType: 'singleton',
  },
} as const // `as const` を追加して、リテラル型を厳密に推論させる

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  habits: HabitMateHabitRead
  metadata: HabitMateMetadataRead
}

// 3. createIDBRepoStore を使ってストア定義を取得
// 新しいconfigオブジェクトを渡す
const habitMateStoreDefinition = createIDBRepoStore(
  habitMateConfig,
  {} as AppDataTypes // _dataTypesは型推論のために必要
)

// 生成されるストアの最終的な型を明示的に定義
type HabitMateStoreState = GeneratedStore<
  typeof habitMateConfig, // Config: `as const` により、より具体的なリテラル型が推論される
  ValueFromConfig<typeof habitMateConfig>, // D: `ValueFromConfig` を使ってdataKeyのユニオン型を抽出
  AppDataTypes // T: 具体的なRead型がマップされたオブジェクト
>

export const useHabitMateDataStore = create<HabitMateStoreState>(
  habitMateStoreDefinition
)
