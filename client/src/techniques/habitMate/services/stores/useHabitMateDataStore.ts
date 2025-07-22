import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromMap,
} from '../../../../functions/stores/create-repository-store'
import { HabitMateHabitIDBRepository } from '../repositories/habit-mate-habit-idb-repository'
import type { HabitMateHabitRead } from '../documents/habit-mate-habit-document'

// 1. リポジトリクラスとデータマップを定義
const repoClasses = {
  idbHabit: HabitMateHabitIDBRepository,
} as const // `as const` を追加して、リテラル型を厳密に推論させる

const dataMap = {
  idbHabit: 'habits',
} as const // `as const` を追加して、リテラル型を厳密に推論させる

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  habits: HabitMateHabitRead
}

// 3. createIDBRepoStore を使ってストア定義を取得
const habitMateStoreDefinition = createIDBRepoStore(
  repoClasses,
  dataMap,
  {} as AppDataTypes
)

// 生成されるストアの最終的な型を明示的に定義
type HabitMateStoreState = GeneratedStore<
  typeof repoClasses, // R: `as const` により、より具体的なリテラル型が推論される
  ValueFromMap<typeof dataMap>, // D: `as const` により、より具体的なリテラル型が推論される
  AppDataTypes // T: 具体的なRead型がマップされたオブジェクト
>

export const useHabitMateDataStore = create<HabitMateStoreState>(
  habitMateStoreDefinition
)
