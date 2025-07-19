import { create } from 'zustand'
import type { TaskPressTaskRead } from '../documents/task-press-task-document'
import type { TaskPressTemplateRead } from '../documents/task-press-template-document'
import { TaskPressTaskIDBRepository } from '../repositories/task-press-task-idb-repository'
import { TaskPressTemplateIDBRepository } from '../repositories/task-press-template-idb-repository'
import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromMap,
} from '../../../../functions/stores/create-repository-store'

// 1. リポジトリクラスとデータマップを定義
const repoClasses = {
  idbTask: TaskPressTaskIDBRepository,
  idbTemplate: TaskPressTemplateIDBRepository,
} as const // `as const` を追加して、リテラル型を厳密に推論させる

const dataMap = {
  idbTask: 'tasks',
  idbTemplate: 'templates',
} as const // `as const` を追加して、リテラル型を厳密に推論させる

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  tasks: TaskPressTaskRead
  templates: TaskPressTemplateRead
}

// 3. createIDBRepoStore を使ってストア定義を取得
const taskPressStoreDefinition = createIDBRepoStore(
  repoClasses,
  dataMap,
  {} as AppDataTypes
)

// 生成されるストアの最終的な型を明示的に定義
type TaskPressStoreState = GeneratedStore<
  typeof repoClasses, // R: `as const` により、より具体的なリテラル型が推論される
  ValueFromMap<typeof dataMap>, // D: `as const` により、より具体的なリテラル型が推論される
  AppDataTypes // T: 具体的なRead型がマップされたオブジェクト
>

export const useTaskPressStore = create<TaskPressStoreState>(
  taskPressStoreDefinition
)
