import type { BaseDocumentRead } from '../../types/db/db-service-document-types'
import type { IDBService } from '../../types/db/db-service-interface'

export type ValueFromMap<T extends Record<string, string>> = T[keyof T]

// --- 変更点: GeneratedStore のデータ配列部分の型定義を調整 ---
export type GeneratedStore<
  R extends Record<string, new (uid: string) => IDBService<any, any>>,
  // D はデータ配列のキーのユニオン型 (例: 'tasks' | 'templates')
  D extends string,
  // T はデータ配列の具体的な要素型をキーに持つオブジェクト
  T extends { [K in D]: BaseDocumentRead },
> = {
  [K in keyof R]: InstanceType<R[K]> | null // リポジトリインスタンスの型
} & {
  // ここで、D の各キー K に対して、T[K] (例: TaskPressTaskRead) の配列型を直接適用
  [K in D]: T[K][] // BaseDocumentRead[] へのフォールバックを削除
} & {
  setRepositories: (uid: string) => void
  clearRepositories: () => void
  initializeListeners: (uid: string) => (() => void) | undefined
  clearData: () => void
}

/**
 * Creates utility functions for managing IndexedDB repositories in a Zustand store.
 * This automatically creates repository instances, data arrays, and related actions.
 *
 * @param repoClasses An object where keys are store property names (e.g., 'idbTask'),
 * and values は the repository class constructors.
 * @param dataMap An object mapping repository keys to their corresponding data array keys
 * (e.g., `{ idbTask: 'tasks', 'idbTemplate': 'templates' }`).
 * @param _dataTypes An object mapping data keys to their specific *single* read types
 * (e.g., `{ tasks: TaskPressTaskRead, templates: TaskPressTemplateRead }`).
 * @returns A partial store object that can be directly passed to Zustand's `create` function.
 */
export const createIDBRepoStore = <
  // R は repoClasses オブジェクトの実際の型
  R extends Record<string, new (uid: string) => IDBService<any, any>>,
  // DataMap は dataMap オブジェクトの型
  DataMap extends { [K in keyof R]: string },
  // D は DataMap の値から推論されるデータキーのユニオン型
  D extends ValueFromMap<DataMap>,
  // T はデータキーから具体的な Read 型へのマッピング
  T extends { [K in D]: BaseDocumentRead },
>(
  repoClasses: R,
  dataMap: DataMap,
  _dataTypes: T
) => {
  const initialState: { [key: string]: any } = {}
  const dataKeys = Object.values(dataMap) as D[]

  // Initialize repository instances to null
  for (const key in repoClasses) {
    if (Object.prototype.hasOwnProperty.call(repoClasses, key)) {
      initialState[key] = null
    }
  }

  // Initialize data arrays to empty arrays (type will be inferred from _dataTypes)
  dataKeys.forEach((dataKey) => {
    initialState[dataKey] = []
  })

  const storeDefinition = (set: any, get: any) => ({
    ...initialState,

    setRepositories: (uid: string) => {
      const newRepos: { [key: string]: any } = {}
      for (const key in repoClasses) {
        if (Object.prototype.hasOwnProperty.call(repoClasses, key)) {
          newRepos[key] = new repoClasses[key](uid)
        }
      }
      set(newRepos)
    },

    clearRepositories: () => {
      const clearedRepos: { [key: string]: any } = {}
      for (const key in repoClasses) {
        if (Object.prototype.hasOwnProperty.call(repoClasses, key)) {
          clearedRepos[key] = null
        }
      }
      set(clearedRepos)
    },

    initializeListeners: (uid: string) => {
      const unsubscribeFunctions: (() => void)[] = []
      let allReposInitialized = true

      for (const key in repoClasses) {
        if (Object.prototype.hasOwnProperty.call(repoClasses, key)) {
          const repo = get()[key]
          if (!repo) {
            allReposInitialized = false
            break
          }

          const dataKey = dataMap[key as keyof DataMap]

          // Get the specific Read type for this dataKey from T
          type SpecificReadType = T[typeof dataKey & keyof T]

          // Cast repo to IDBService with the specific ReadType
          const { unsubscribe } = (
            repo as IDBService<SpecificReadType, any>
          ).addCollectionSnapshotListener(
            (data: SpecificReadType[]) => {
              // Data is an array of SpecificReadType
              set({ [dataKey]: data })
            },
            [uid]
          )
          unsubscribeFunctions.push(unsubscribe)
        }
      }

      if (!allReposInitialized) {
        return undefined
      }

      return () => {
        unsubscribeFunctions.forEach((unsub) => unsub())
      }
    },

    clearData: () => {
      const clearedData: { [key: string]: any } = {}
      dataKeys.forEach((dataKey) => {
        clearedData[dataKey] = []
      })
      set(clearedData)
    },
  })

  // Return the store definition with the correct GeneratedStore type
  return storeDefinition as (set: any, get: any) => GeneratedStore<R, D, T>
}
