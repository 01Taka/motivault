// import { useState } from 'react'
// import {
//   filterValidStateFields,
//   isSerializable,
//   shouldSaveStats,
//   calcRunningTime,
// } from '../functions/pomodoro-helpers'
// import type {
//   PomodoroTimerState,
//   PomodoroTimerStats,
//   PomodoroStorage,
// } from '../types/pomodoro-types'

// const defaultState: PomodoroTimerState = {
//   status: 'idle',
//   type: 'study',
//   duration: 25 * 60 * 1000,
//   stoppedAt: null,
//   expectedEndAt: 0,
// }

// const defaultStats: PomodoroTimerStats = {
//   totalStudyTime: 0,
//   totalBreakTime: 0,
// }

// export const usePersistentPomodoroState = (storage: PomodoroStorage) => {
//   const [state, setState] = useState<PomodoroTimerState>(() => {
//     return storage.getState() ?? defaultState
//   })

//   const [stats, setStats] = useState<PomodoroTimerStats>(() => {
//     return storage.getStats() ?? defaultStats
//   })

//   const updateState = (partial: Partial<PomodoroTimerState>) => {
//     setState((prev) => {
//       const next = filterValidStateFields(partial, defaultState)
//       if (!isSerializable(next)) {
//         console.error('Non-serializable state update:', next)
//         return prev
//       }

//       if (shouldSaveStats(prev, next)) {
//         const elapsed = calcRunningTime(prev, next)
//         setStats((prevStats) => {
//           const updated =
//             prev.type === 'study'
//               ? { totalStudyTime: prevStats.totalStudyTime + elapsed }
//               : { totalBreakTime: prevStats.totalBreakTime + elapsed }

//           const newStats = { ...prevStats, ...updated }
//           storage.setStats(newStats)
//           return newStats
//         })
//       }

//       const newState = { ...prev, ...next }
//       storage.setState(newState)
//       return newState
//     })
//   }

//   const getLatestStats = (): PomodoroTimerStats => {
//     const elapsed = calcRunningTime(state, { stoppedAt: state.stoppedAt })

//     return {
//       totalStudyTime:
//         stats.totalStudyTime + (state.type === 'study' ? elapsed : 0),
//       totalBreakTime:
//         stats.totalBreakTime + (state.type === 'break' ? elapsed : 0),
//     }
//   }

//   return { state, stats, updateState, getLatestStats }
// }
