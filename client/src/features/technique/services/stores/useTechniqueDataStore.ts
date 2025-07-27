import { create } from 'zustand'
import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig,
} from '../../../../functions/stores/create-repository-store'
import { TechniqueSessionIDBRepository } from '../repositories/idb/technique-session-idb-repository'
import { ExpGainEventIDBRepository } from '../repositories/idb/exp-gain-event-idb-repository'
import { type TechniqueUnlockAchievementEventRead } from '../documents/session/unlock-achievement-event-document'
import { UnlockAchievementEventIDBRepository } from '../repositories/idb/unlock-achievement-event-idb-repository'
import type { TechniqueSessionRead } from '../documents/session/technique-session-document'
import type { TechniqueExpGainEventRead } from '../documents/session/exp-gain-event-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbSessions: {
    repo: TechniqueSessionIDBRepository,
    dataKey: 'sessions' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
  idbExpEvent: {
    repo: ExpGainEventIDBRepository,
    dataKey: 'expEvent' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
  idbAchievementEvent: {
    repo: UnlockAchievementEventIDBRepository,
    dataKey: 'achievementEvent' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  sessions: TechniqueSessionRead
  expEvent: TechniqueExpGainEventRead
  achievementEvent: TechniqueUnlockAchievementEventRead
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

export const useTechniqueDataStore = create<StoreState>(storeDefinition)
