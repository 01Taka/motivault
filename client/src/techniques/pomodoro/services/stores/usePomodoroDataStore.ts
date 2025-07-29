import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig, // ValueFromMap から ValueFromConfig に変更
} from '../../../../functions/stores/create-repository-store'
import { PomodoroProgressSessionIDBRepository } from '../repositories/indexedDB/pomodoro-progress-session-idb-repository'
import { PomodoroSessionIDBRepository } from '../repositories/indexedDB/pomodoro-session-idb-repository'
import type { PomodoroProgressSessionRead } from '../documents/pomodoro-progress-session-document'
import type { PomodoroSessionRead } from '../documents/pomodoro-session-document'
import { PomodoroTimerStateIDBRepository } from '../repositories/indexedDB/pomodoro-timer-state-idb-repository'
import type { PomodoroTimerStateRead } from '../documents/pomodoro-timer-state-document'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbTimerState: {
    repo: PomodoroTimerStateIDBRepository,
    dataKey: 'timerState' as const,
    subscriptionType: 'singleton',
    repositoryType: 'indexedDB',
  },
  idbProgressSession: {
    repo: PomodoroProgressSessionIDBRepository,
    dataKey: 'progressSession' as const,
    subscriptionType: 'singleton',
    repositoryType: 'indexedDB',
  },
  idbSession: {
    repo: PomodoroSessionIDBRepository,
    dataKey: 'sessions' as const,
    subscriptionType: 'collection',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  timerState: PomodoroTimerStateRead
  progressSession: PomodoroProgressSessionRead
  sessions: PomodoroSessionRead
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

export const usePomodoroDataStore = create<StoreState>(storeDefinition)
