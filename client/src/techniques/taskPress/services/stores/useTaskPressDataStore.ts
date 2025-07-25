import { create } from 'zustand'
import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig,
} from '../../../../functions/stores/create-repository-store'
import { TaskPressTemplateIDBRepository } from '../repositories/task-press-template-idb-repository'
import { TaskPressTaskIDBRepository } from '../repositories/task-press-task-idb-repository'
import type { TaskPressTaskRead } from '../documents/task-press-task-document'
import type { TaskPressTemplateRead } from '../documents/task-press-template-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbTask: {
    repo: TaskPressTaskIDBRepository,
    dataKey: 'tasks' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
  idbTemplate: {
    repo: TaskPressTemplateIDBRepository,
    dataKey: 'templates' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  tasks: TaskPressTaskRead
  templates: TaskPressTemplateRead
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

export const useTaskPressDataStore = create<StoreState>(storeDefinition)
