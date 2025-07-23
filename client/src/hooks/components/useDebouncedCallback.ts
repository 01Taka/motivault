// import { useRef, useEffect, useCallback } from 'react'

// // debounceKeyとdebounceTypeをオプションで持つ引数の型
// interface DebounceArgs<T extends any[]> {
//   debounceKey?: string
//   debounceType?: string
//   args: T
// }

// // typeごとのdelay設定の型
// type DelayMap = { [type: string]: number }

// // コールバックに渡されるデータの型（mergedArgsをジェネリックに）
// type DebouncedCallbackData<T extends any[], M> = {
//   debounceKey: string | undefined
//   debounceType: string | undefined
//   args: T[]
//   mergedArgs: M // mergeFnの戻り値の型
// }

// // mergeFnの型定義
// // argsAtEachIndex: 各呼び出しの同じインデックスの引数すべてを収集した配列
// type MergeFunction<T extends any[], M> = (
//   argsAtEachIndex: (T[number] | undefined)[][]
// ) => M

// type DefaultMergedType<T extends any[]> = {
//   [K in keyof T]: T[K][]
// }

// // useBatchedDebouncedCallbackのオプション型
// interface UseDebounceOptions<T extends any[], M> {
//   delays?: DelayMap
//   defaultDelay?: number // オプションとして扱う
//   mergeFn?: MergeFunction<T, M>
// }

// // マップキーに使用する定数
// const DEFAULT_DEBOUNCE_TYPE_KEY = 'default'
// const GLOBAL_DEBOUNCE_KEY = 'global'

// /**
//  * debounceKeyとdebounceTypeごとに異なるdebounceセッションを管理し、
//  * 指定されたdebounce期間中に呼ばれたすべての引数をバッチとして収集し、
//  * mergeFnによってマージされた値も提供して、delay後に一度だけコールバックを呼び出すカスタムフック。
//  *
//  * @param callback debounceされた後、debounceKey、debounceType、対応する引数の配列、
//  * およびマージされた引数を受け取るコールバック関数。
//  * `mergedArgs`は、`mergeFn`が指定された場合はその戻り値、それ以外の場合は
//  * 各呼び出しの同じインデックスの引数すべてを含む配列の配列となります。
//  * @param options debounce動作をカスタマイズするためのオプションオブジェクト。
//  * @param options.delays debounceTypeごとの遅延時間（ミリ秒）を設定するオブジェクト。
//  * @param options.defaultDelay (オプション) 指定されたdebounceTypeに対応する遅延時間がない場合のデフォルトの遅延時間（ミリ秒）。デフォルトは0。
//  * @param options.mergeFn (オプション) 各インデックスの引数すべてをどのようにマージするかを定義する関数。
//  * この関数が提供されない場合、`mergedArgs`は各引数セットの同じインデックスの要素をまとめた配列の配列となります。
//  * @returns debounceKeyとdebounceType、引数を受け取り、それらを蓄積する関数。
//  */
// const useBatchedDebouncedCallback = <T extends any[], M = DefaultMergedType<T>>(
//   callback: (batchedData: DebouncedCallbackData<T, M>) => void,
//   options?: UseDebounceOptions<T, M> // オプションオブジェクトとして受け取る
// ): ((options: DebounceArgs<T>) => void) => {
//   // オプションのデフォルト値を設定
//   const { delays = {}, defaultDelay = 0, mergeFn } = options ?? {}

//   // 各debounceKeyとdebounceTypeの組み合わせのタイマーを管理するMap
//   const timeoutMapRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
//     new Map()
//   )
//   // 各debounceKeyとdebounceTypeの組み合わせの引数バッチを管理するMap
//   const argsBatchMapRef = useRef<Map<string, T[]>>(new Map())

//   // callback関数が変更された場合に参照を更新
//   const callbackRef = useRef(callback)
//   useEffect(() => {
//     callbackRef.current = callback
//   }, [callback])

//   // delaysとdefaultDelay設定を内部で保持
//   const delaysRef = useRef(delays)
//   const defaultDelayRef = useRef(defaultDelay)
//   const mergeFnRef = useRef(mergeFn) // mergeFnもrefで保持

//   useEffect(() => {
//     delaysRef.current = delays
//   }, [delays])

//   useEffect(() => {
//     defaultDelayRef.current = defaultDelay
//   }, [defaultDelay])

//   useEffect(() => {
//     mergeFnRef.current = mergeFn
//   }, [mergeFn])

//   // Mapのキーを生成するヘルパー関数
//   const getMapKey = useCallback(
//     (
//       debounceKey: string | undefined,
//       debounceType: string | undefined
//     ): string => {
//       return `${debounceType || DEFAULT_DEBOUNCE_TYPE_KEY}-${debounceKey || GLOBAL_DEBOUNCE_KEY}`
//     },
//     []
//   )

//   const debouncedCallback = useCallback(
//     (callOptions: DebounceArgs<T>) => {
//       // 内部の引数名と区別するために変更
//       const {
//         debounceKey = undefined,
//         debounceType = undefined,
//         args,
//       } = callOptions
//       const mapKey = getMapKey(debounceKey, debounceType)

//       // 適切な遅延時間を取得
//       const currentDelay: number =
//         delaysRef.current[debounceType || ''] ?? defaultDelayRef.current

//       // 現在の引数バッチを取得または初期化
//       if (!argsBatchMapRef.current.has(mapKey)) {
//         argsBatchMapRef.current.set(mapKey, [])
//       }
//       argsBatchMapRef.current.get(mapKey)!.push(args)

//       // 既存のタイマーがあればクリア
//       if (timeoutMapRef.current.has(mapKey)) {
//         clearTimeout(timeoutMapRef.current.get(mapKey)!)
//       }

//       // 新しいタイマーを設定
//       const newTimer = setTimeout(() => {
//         const currentBatchArgs = argsBatchMapRef.current.get(mapKey)
//         if (currentBatchArgs) {
//           let mergedResult: M

//           if (mergeFnRef.current) {
//             // mergeFnが提供されていればそれを使用
//             const maxArgsLength = Math.max(
//               ...currentBatchArgs.map((argSet) => argSet.length)
//             )
//             const argsAtEachIndex: (T[number] | undefined)[][] = []
//             for (let i = 0; i < maxArgsLength; i++) {
//               argsAtEachIndex.push(
//                 currentBatchArgs.map((argsSet) => argsSet[i])
//               )
//             }
//             mergedResult = mergeFnRef.current(argsAtEachIndex)
//           } else {
//             // mergeFnが提供されていない場合のデフォルトマージロジック
//             const defaultMergedArgs: any[] = []
//             if (currentBatchArgs.length > 0) {
//               const maxArgsLength = Math.max(
//                 ...currentBatchArgs.map((argSet) => argSet.length)
//               )
//               for (let i = 0; i < maxArgsLength; i++) {
//                 defaultMergedArgs.push(
//                   currentBatchArgs.map((argsSet) => argsSet[i])
//                 )
//               }
//             }
//             mergedResult = defaultMergedArgs as M // 型アサーション
//           }

//           // コールバックに渡すデータの構造を更新
//           callbackRef.current({
//             debounceKey,
//             debounceType,
//             args: currentBatchArgs,
//             mergedArgs: mergedResult,
//           })
//         }
//         // コールバック呼び出し後、該当するバッチとタイマーをクリア
//         argsBatchMapRef.current.delete(mapKey)
//         timeoutMapRef.current.delete(mapKey)
//       }, currentDelay)

//       timeoutMapRef.current.set(mapKey, newTimer)
//     },
//     [getMapKey] // getMapKeyも依存配列に含める（useCallbackでメモ化済み）
//   )

//   // コンポーネントがアンマウントされたときにすべてのタイマーとバッチをクリア
//   useEffect(() => {
//     return () => {
//       timeoutMapRef.current.forEach((timer) => clearTimeout(timer))
//       timeoutMapRef.current.clear()
//       argsBatchMapRef.current.clear()
//     }
//   }, [])

//   return debouncedCallback
// }

// export default useBatchedDebouncedCallback
