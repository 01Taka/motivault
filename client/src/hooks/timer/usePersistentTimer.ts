// hooks/usePersistentTimer.ts
import { useCallback } from 'react'
import useTimer from './useTimer' // useTimer フックをインポート
import type { UnixTimestamp } from '../../types/utils/datetime-types' // 既存の型定義をインポート
import useLocalStorage from '../utils/useLocalStorage'

/**
 * @typedef {object} TimerState
 * @property {number} startTime - タイマーが開始または再開されたUnixタイムスタンプ (ミリ秒)。
 * @property {number} stoppedAt - タイマーが最後に停止されたUnixタイムスタンプ (ミリ秒)。タイマーが実行中の場合は0。
 * @property {boolean} isRunning - タイマーが現在実行中であるかどうかのフラグ。
 */
type TimerState = {
  startTime: number
  stoppedAt: number
  isRunning: boolean
}

/**
 * @interface UsePersistentTimerArgs
 * @property {(() => UnixTimestamp)} [getNow] - 現在のUnixタイムスタンプ (ミリ秒) を返す関数。デフォルトは `Date.now()`。
 * @property {((state: TimerState) => void) | string} saveStateHandlerOrKey - タイマーの状態を永続化するためのハンドラ関数、
 * またはローカルストレージのキー文字列。文字列の場合、`useLocalStorage` を使用して状態が自動的に保存されます。
 * @property {number} expectedDuration - タイマーの期待される合計持続時間 (ミリ秒)。
 */
interface UsePersistentTimerArgs {
  getNow?: () => UnixTimestamp
  saveStateHandlerOrKey: ((state: TimerState) => void) | string
  expectedDuration: number
}

/**
 * タイマーの状態をローカルストレージまたはカスタムハンドラを通じて永続化するカスタムフック。
 * `useTimer` と `useLocalStorage` を組み合わせて機能を提供します。
 *
 * @param {UsePersistentTimerArgs} args - タイマーの初期設定、永続化方法、期間を含む引数オブジェクト。
 * @returns {object} タイマーの残り時間、経過時間、実行状態、およびタイマー操作（開始、停止、リセット）のための関数を含むオブジェクト。
 * @property {number} remainingTime - タイマーの残り時間 (ミリ秒)。
 * @property {number} elapsedTime - タイマーの経過時間 (ミリ秒)。
 * @property {boolean} isRunning - タイマーが現在実行中であるかどうかのフラグ。
 * @property {() => void} start - タイマーを開始または再開する関数。
 * @property {() => void} stop - タイマーを停止する関数。
 * @property {() => void} reset - タイマーを初期状態にリセットする関数。
 * @property {React.MutableRefObject<number>} remainingTimeRef - 残り時間を参照するためのrefオブジェクト。
 */
const usePersistentTimer = (args: UsePersistentTimerArgs) => {
  const { saveStateHandlerOrKey, expectedDuration } = args
  const getNow = args.getNow ?? (() => Date.now())

  const localStorageKey =
    typeof saveStateHandlerOrKey === 'string' ? saveStateHandlerOrKey : null

  // useLocalStorageから現在のタイマー状態と更新関数を取得
  // localStorageKeyがnullの場合は、永続化しないためuseLocalStorageのダミーキーを使用
  const [timerState, setTimerState] = useLocalStorage<TimerState>(
    localStorageKey || 'non-existent-timer',
    { startTime: 0, stoppedAt: 0, isRunning: false } // ローカルストレージに値がない場合のデフォルト状態
  )

  // useTimerに渡すコールバック。useTimerからの状態変更をここで受け取り永続化する。
  const handleTimerStateChange = useCallback(
    (newState: TimerState) => {
      if (typeof saveStateHandlerOrKey === 'function') {
        // カスタムハンドラが提供されている場合
        saveStateHandlerOrKey(newState)
      } else if (localStorageKey) {
        // ローカルストレージキーが提供されている場合、useLocalStorageのsetValueを呼び出す
        setTimerState(newState)
      }
    },
    [saveStateHandlerOrKey, localStorageKey, setTimerState]
  )

  // useTimerフックを呼び出し、現在の状態と状態変更ハンドラを渡す
  const {
    remainingTime,
    elapsedTime,
    isRunning,
    start,
    stop,
    reset,
    remainingTimeRef,
  } = useTimer({
    startTime: timerState.startTime,
    stoppedAt: timerState.stoppedAt,
    isRunning: timerState.isRunning,
    expectedDuration,
    getNow,
    onStateChange: handleTimerStateChange, // useTimerのonStateChangeにこのハンドラを渡す
  })

  return {
    remainingTime,
    elapsedTime,
    isRunning,
    start,
    stop,
    reset,
    remainingTimeRef,
  }
}

export default usePersistentTimer
