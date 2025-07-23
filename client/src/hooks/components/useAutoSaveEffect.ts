// // hooks/useAutoSaveEffect.ts (Original version, handles async saveFn internally)
// import { useEffect, useRef } from 'react'
// import { debounce } from 'lodash'

// interface Options<T> {
//   delay?: number
//   onSuccess?: (value: T) => void
//   onError?: (error: any) => void
// }

// export const useAutoSaveEffect = <T>(
//   value: T,
//   saveFn: (value: T) => Promise<void>, // Still takes a Promise
//   options?: Options<T>
// ) => {
//   const { delay = 500, onSuccess, onError } = options || {}
//   const latestValue = useRef(value)
//   const currentRequestId = useRef(0)

//   useEffect(() => {
//     latestValue.current = value
//     const requestId = ++currentRequestId.current

//     const handler = debounce(async () => {
//       try {
//         await saveFn(latestValue.current)

//         if (requestId === currentRequestId.current) {
//           onSuccess?.(latestValue.current)
//         }
//       } catch (e) {
//         if (requestId === currentRequestId.current) {
//           onError?.(e)
//         }
//       }
//     }, delay)

//     handler()

//     return () => handler.cancel()
//   }, [value, delay, saveFn, onSuccess, onError]) // Add all dependencies
// }
