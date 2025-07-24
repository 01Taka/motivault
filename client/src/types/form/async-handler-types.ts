export type AsyncStatus = 'idle' | 'loading' | 'error' | 'success'

export interface AsyncState<T> {
  status: AsyncStatus
  data: T | null
  error: Error | null
  errorMessage: string
}

export interface UpdateArrayFieldArgs<T extends Record<string, any>, K = any> {
  fieldName: keyof T
  index: number | 'push'
  data?: K
  deleteItem?: boolean
}

// useMultipleAsyncHandler-types |DEL|
// export type AsyncFunction = (...args: any[]) => Promise<any>

// export type AsyncTask<StateTypes, T extends AsyncFunction> = readonly [
//   keyof StateTypes,
//   T,
//   readonly [...Parameters<T>],
// ]

// export type AsyncTaskArray<
//   StateTypes,
//   T extends readonly AsyncTask<StateTypes, any>[],
// > = T

// export type InferAsyncTasks<StateTypes, T extends readonly AsyncFunction[]> = {
//   [P in keyof T]: T[P] extends AsyncFunction
//     ? AsyncTask<StateTypes, T[P]>
//     : never
// }
