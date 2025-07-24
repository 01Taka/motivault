import type { BaseDocumentRead } from '../../types/db/db-service-document-types'
import type { IDBService } from '../../types/db/db-service-interface'

/**
 * Extracts all possible string literal values from the 'dataKey' properties within a given Config object.
 * This creates a union type of all data keys.
 */
export type ValueFromConfig<
  T extends Record<string, { repo: any; dataKey: string }>,
> = T[keyof T]['dataKey']

/**
 * Defines the structure for a single repository configuration entry.
 * @template R The constructor type of the IDBService repository.
 * @template D The string literal type for the data key associated with this repository.
 */
export type RepoConfigEntry<
  R extends new (uid: string) => IDBService<any, any>,
  D extends string,
> = {
  repo: R
  dataKey: D
  subscriptionType: 'collection' | 'singleton' // コレクションかシングルトンか
}

/**
 * Represents the overall configuration object for the IDB repository store.
 * Keys are arbitrary names for the repositories (e.g., 'idbTask'), and values are RepoConfigEntry objects.
 */
export type RepoStoreConfig = Record<string, RepoConfigEntry<any, any>>

/**
 * Helper type to get the subscriptionType for a specific dataKey from the Config.
 * This is crucial for correctly inferring whether a dataKey corresponds to a collection or a singleton.
 */
type GetSubscriptionTypeForDataKey<
  C extends RepoStoreConfig,
  DK extends string,
> = {
  [K in keyof C]: C[K]['dataKey'] extends DK ? C[K]['subscriptionType'] : never
}[keyof C]

/**
 * Defines the generated Zustand store type, incorporating repository instances,
 * data arrays, and utility functions.
 * @template Config The type of the configuration object passed to createIDBRepoStore.
 * @template D The union type of all data keys extracted from the Config.
 * @template T A map from data keys (D) to their specific BaseDocumentRead types.
 */
export type GeneratedStore<
  Config extends RepoStoreConfig,
  D extends ValueFromConfig<Config>,
  T extends { [K in D]: BaseDocumentRead },
> = {
  // Dynamically adds repository instances (e.g., idbTask: IDBService<TaskRead, any> | null)
  [K in keyof Config]: InstanceType<Config[K]['repo']> | null
} & {
  // Dynamically adds data arrays (e.g., tasks: TaskRead[]) または単一ドキュメント (e.g., userSettings: UserSettingsRead | null)
  [K in D]: GetSubscriptionTypeForDataKey<Config, K> extends 'singleton'
    ? T[K] | null // dataKeyがsingletonタイプの場合、単一のRead型またはnull
    : T[K][] // それ以外（collectionタイプ）の場合、Read型の配列
} & {
  // Utility methods for managing repositories and listeners
  dependentUid: string
  setRepositories: (uid: string) => void
  clearRepositories: () => void
  initializeListeners: (
    pathSegments: string[],
    dataKeysToListen?: D[]
  ) => (() => void) | undefined
  clearData: () => void
}

/**
 * Creates utility functions for managing IndexedDB repositories in a Zustand store.
 * This automatically creates repository instances, data arrays, and related actions.
 *
 * @param config An object where keysはストアプロパティ名 (e.g., 'idbTask'),
 * and valuesはリポジトリクラスコンストラクタ (`repo`),
 * それに対応するデータ配列キー (`dataKey`), と購読タイプ (`subscriptionType`) を含むオブジェクトです。
 * @param _dataTypes データキーを特定の *単一* の読み取りタイプにマッピングするオブジェクトです
 * (e.g., `{ tasks: TaskPressTaskRead, templates: TaskPressTemplateRead }`).
 * @returns Zustandの `create` 関数に直接渡すことができる部分的なストアオブジェクトです。
 */
export const createIDBRepoStore = <
  Config extends RepoStoreConfig,
  D extends ValueFromConfig<Config>,
  T extends { [K in D]: BaseDocumentRead },
>(
  config: Config,
  _dataTypes: T // このパラメータは型推論のために使用され、ランタイムロジックでは直接使用されません
) => {
  // リポジトリはnull、データは空の配列またはnullで初期状態を定義します
  const initialState: { [key: string]: any } = {}
  const dataKeys: D[] = [] // 全てのユニークなデータキーを収集します

  // リポジトリの初期状態を設定し、データキーを収集します
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      initialState[key] = null // リポジトリインスタンス
      const dataKey = config[key].dataKey as D
      if (!dataKeys.includes(dataKey)) {
        dataKeys.push(dataKey)
      }
    }
  }

  // 購読タイプに基づいてデータ配列または単一ドキュメントの初期状態を設定します
  dataKeys.forEach((dataKey) => {
    // このdataKeyを使用する最初のconfigエントリを見つけて、その購読タイプを決定します
    const configEntry = Object.values(config).find(
      (entry) => entry.dataKey === dataKey
    )
    if (configEntry?.subscriptionType === 'singleton') {
      initialState[dataKey] = null // 単一ドキュメントの場合はnullで初期化
    } else {
      initialState[dataKey] = [] // コレクションの場合は空の配列で初期化
    }
  })

  // Zustandストアのアクションと状態を定義します
  const storeDefinition = (set: any, get: any) => ({
    ...initialState,

    /**
     * 指定されたユーザーIDでリポジトリインスタンスを初期化します。
     * 各リポジトリインスタンスはZustandストアに保存されます。
     * @param uid リポジトリを初期化するためのユーザーID。
     */
    setRepositories: (uid: string) => {
      const newRepos: { [key: string]: any } = {}
      for (const key in config) {
        if (Object.prototype.hasOwnProperty.call(config, key)) {
          // リポジトリクラスの新しいインスタンスを作成します
          newRepos[key] = new config[key].repo(uid)
        }
      }
      set(newRepos) // 新しいリポジトリインスタンスでストアを更新します
      set({ dependentUid: uid })
    },

    /**
     * ストアからすべてのリポジトリインスタンスをnullに設定してクリアします。
     */
    clearRepositories: () => {
      const clearedRepos: { [key: string]: any } = {}
      for (const key in config) {
        if (Object.prototype.hasOwnProperty.call(config, key)) {
          clearedRepos[key] = null // リポジトリインスタンスをnullに設定
        }
      }
      set(clearedRepos) // クリアされたリポジトリインスタンスでストアを更新します
    },

    /**
     * 指定されたデータキーのリスナーを初期化します。
     * IndexedDBでデータが変更されると、ストア内の対応するデータ配列またはドキュメントが更新されます。
     * @param uid ユーザーID。
     * @param dataKeysToListen リッスンするデータキーのオプション配列。指定しない場合、すべてのデータキーがリッスンされます。
     * @returns すべてのリスナーを解除するためのクリーンアップ関数、またはリポジトリが初期化されていない場合は`undefined`。
     */
    initializeListeners: (pathSegments: string[], dataKeysToListen?: D[]) => {
      const unsubscribeFunctions: (() => void)[] = []
      const repos = get() // リポジトリインスタンスにアクセスするために現在の状態を取得します

      // リッスンするデータキーに対応するリポジトリキーを決定します
      const keysToProcess = Object.keys(config).filter((repoKey) => {
        const dataKey = config[repoKey].dataKey as D
        return !dataKeysToListen || dataKeysToListen.includes(dataKey)
      })

      // 続行する前に、必要なすべてのリポジトリが初期化されているか確認します
      if (!keysToProcess.every((key) => repos[key])) {
        console.warn(
          '1つ以上のリポジトリが初期化されていません。リスナーを設定できません。'
        )
        return undefined
      }

      // 選択された各リポジトリのリスナーを設定します
      for (const key of keysToProcess) {
        const repo = repos[key]
        const { dataKey, subscriptionType } = config[key] // subscriptionTypeを取得

        // データキーの特定の読み取りタイプを推論します
        type SpecificReadType = T[typeof dataKey & keyof T]

        let unsubscribe: () => void

        if (subscriptionType === 'collection') {
          // コレクション購読の場合
          ;({ unsubscribe } = (
            repo as IDBService<SpecificReadType, any>
          ).addCollectionSnapshotListener((data: SpecificReadType[]) => {
            // Zustandストアの対応するデータ配列を更新します
            set({ [dataKey]: data })
          }, pathSegments))
        } else if (subscriptionType === 'singleton') {
          // シングルトンドキュメント購読の場合
          ;({ unsubscribe } = (
            repo as IDBService<SpecificReadType, any>
          ).addDocumentSnapshotListener((data: SpecificReadType | null) => {
            // リスナーコールバックはReadType | nullを期待します
            set({ [dataKey]: data })
          }, pathSegments))
        } else {
          console.warn(`${key}の不明な購読タイプ: ${subscriptionType}`)
          continue // 無効な購読タイプの場合はスキップ
        }
        unsubscribeFunctions.push(unsubscribe) // クリーンアップのために解除関数を保存
      }

      // すべてのリスナーを解除する単一のクリーンアップ関数を返します
      return () => {
        unsubscribeFunctions.forEach((unsub) => unsub())
        console.log('すべてのIDBリスナーが解除されました。')
      }
    },

    /**
     * ストア内のすべてのデータ配列を空の配列に、または単一ドキュメントをnullに設定してクリアします。
     */
    clearData: () => {
      const clearedData: { [key: string]: any } = {}
      dataKeys.forEach((dataKey) => {
        const configEntry = Object.values(config).find(
          (entry) => entry.dataKey === dataKey
        )
        if (configEntry?.subscriptionType === 'singleton') {
          clearedData[dataKey] = null // 単一ドキュメントの場合はnullに設定
        } else {
          clearedData[dataKey] = [] // コレクションの場合は空の配列に設定
        }
      })
      set(clearedData) // クリアされたデータでストアを更新します
    },
  })

  // 型安全のためにストア定義を生成されたストアタイプにキャストします
  return storeDefinition as (set: any, get: any) => GeneratedStore<Config, D, T>
}
