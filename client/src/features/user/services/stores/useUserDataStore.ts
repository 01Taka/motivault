import { create } from 'zustand'

import {
  createIDBRepoStore,
  type GeneratedStore,
  type ValueFromConfig,
} from '../../../../functions/stores/create-repository-store'
import { UserIDBRepository } from '../repositories/user-idb-repository'
import type { UserRead } from '../documents/user-document'
import type { UserAuthState } from '../../types/auth/user-auth-state'

// 1. リポジトリクラスとデータマップを統合した単一のConfigオブジェクトを定義
const storeConfig = {
  idbUser: {
    repo: UserIDBRepository,
    dataKey: 'user' as const,
    subscriptionType: 'singleton',
    repositoryType: 'indexedDB',
  },
} as const

// 2. 具体的なデータ要素型を定義
type AppDataTypes = {
  user: UserRead
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
> & {
  userAuthState: UserAuthState | null
  setUserAuthState: (state: UserAuthState) => void
}

export const useUserDataStore = create<StoreState>((set, get, store) => {
  return {
    ...storeDefinition(set, get, store),
    userAuthState: null,
    setUserAuthState: (state: UserAuthState) => set({ userAuthState: state }),
  } as StoreState
})
