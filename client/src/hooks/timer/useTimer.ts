// hooks/useTimer.ts
import { useCallback } from 'react'
import useRemainingTime from './useRemainingTime' // useRemainingTime フックは別途定義されているものと仮定します。

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
 * @interface UseTimerArgs
 * @property {number} startTime - 現在のタイマーの開始時間 (Unixタイムスタンプ、ミリ秒)。
 * @property {number} stoppedAt - 現在のタイマーの停止時間 (Unixタイムスタンプ、ミリ秒)。実行中の場合は0。
 * @property {boolean} isRunning - 現在のタイマーが実行中であるかどうかのフラグ。
 * @property {number} expectedDuration - タイマーの期待される合計持続時間 (ミリ秒)。
 * @property {(() => number)} [getNow] - 現在のUnixタイムスタンプ (ミリ秒) を返す関数。デフォルトは `Date.now()`。
 * @property {(newState: TimerState) => void} onStateChange - タイマーの状態が変更されたときに呼び出されるコールバック関数。
 * 新しいタイマー状態を引数として受け取ります。
 */
interface UseTimerArgs {
  startTime: number
  stoppedAt: number
  isRunning: boolean
  expectedDuration: number
  getNow?: () => number
  onStateChange: (newState: TimerState) => void
}

/**
 * 内部で状態を持たず、外部から提供されたタイマー状態に基づいて計算を行い、
 * 状態変更のリクエストを外部に伝えるカスタムフック。
 *
 * @param {UseTimerArgs} args - タイマーの状態、期間、およびコールバックを含む引数オブジェクト。
 * @returns {object} タイマーの残り時間、経過時間、実行状態、およびタイマー操作（開始、停止、リセット）のための関数を含むオブジェクト。
 * @property {number} remainingTime - タイマーの残り時間 (ミリ秒)。
 * @property {number} elapsedTime - タイマーの経過時間 (ミリ秒)。
 * @property {boolean} isRunning - タイマーが現在実行中であるかどうかのフラグ。
 * @property {() => void} start - タイマーを開始または再開する関数。
 * @property {() => void} stop - タイマーを停止する関数。
 * @property {() => void} reset - タイマーを初期状態にリセットする関数。
 * @property {React.MutableRefObject<number>} remainingTimeRef - 残り時間を参照するためのrefオブジェクト。
 */
const useTimer = (args: UseTimerArgs) => {
  const { startTime, stoppedAt, isRunning, expectedDuration, onStateChange } =
    args
  const getNow = args.getNow ?? (() => Date.now())

  const expectedEndAt = startTime + expectedDuration

  const { remainingTime, elapsedTime, remainingTimeRef } = useRemainingTime({
    isRunning,
    stoppedAt,
    expectedEndAt,
    expectedDuration,
    getNow,
  })

  const start = useCallback(() => {
    const now = getNow()
    const newStartTime = isRunning
      ? startTime
      : stoppedAt > 0
        ? now - (stoppedAt - startTime)
        : now

    onStateChange({
      startTime: newStartTime,
      stoppedAt: 0,
      isRunning: true,
    })
  }, [isRunning, startTime, stoppedAt, getNow, onStateChange])

  const stop = useCallback(() => {
    const now = getNow()
    onStateChange({
      startTime: startTime,
      stoppedAt: now,
      isRunning: false,
    })
  }, [startTime, getNow, onStateChange])

  const reset = useCallback(() => {
    onStateChange({
      startTime: 0,
      stoppedAt: 0,
      isRunning: false,
    })
  }, [onStateChange])

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

export default useTimer
