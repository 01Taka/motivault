import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

const LAST_INTERACTION_TIME_STORAGE_KEY = 'lastInteractionTime'

interface OnTimeoutMetadata {
  type: 'timeout' | 'initial'
  lastInteractionTime: number
}

interface UseIdleTimeoutProps {
  timeoutLimit?: number // タイムアウトの制限（デフォルト5分）
  onTimeout?: (metadata: OnTimeoutMetadata) => void // タイムアウト時に呼ばれる関数
  onActive?: () => void // ユーザーがアクティブになった時に呼ばれる関数
  onResume?: () => void // タイムアウトから復帰したときに呼ばれる関数
  customEvents?: string[] // カスタムイベントのリスト（デフォルトはキーボードやマウス関連のイベント）
  debounceDelay?: number // debounceの遅延時間（デフォルト2秒）
}

const useIdleTimeout = ({
  timeoutLimit = 5 * 60 * 1000, // デフォルト5分
  onTimeout = () => {}, // デフォルトでは何もしない
  onActive = () => {}, // デフォルトでは何もしない
  onResume = () => {}, // デフォルトでは何もしない
  customEvents = ['keydown', 'mousemove', 'scroll', 'click', 'touchstart'],
  debounceDelay = 2000,
}: UseIdleTimeoutProps) => {
  const [isIdle, setIsIdle] = useState(true)
  const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(
    getLastInteractionTime()
  )
  const [timeoutOccurred, setTimeoutOccurred] = useState(false) // タイムアウトが発生したかどうか

  // 最後のインタラクション時刻を取得
  function getLastInteractionTime(): number | null {
    const savedTime = localStorage.getItem(LAST_INTERACTION_TIME_STORAGE_KEY)
    return savedTime ? Number(savedTime) : null
  }

  // ローカルストレージに保存されたインタラクション時間を設定
  const saveLastInteractionTime = useCallback(() => {
    const now = Date.now()
    localStorage.setItem(LAST_INTERACTION_TIME_STORAGE_KEY, now.toString())
    setLastInteractionTime(now)
  }, [])

  const clearLastInteractionTime = useCallback(() => {
    localStorage.removeItem(LAST_INTERACTION_TIME_STORAGE_KEY)
    setLastInteractionTime(null)
  }, [])

  const handleDebouncedAction = useCallback(
    debounce(() => {
      setIsIdle(true)
      saveLastInteractionTime()
    }, debounceDelay),
    [debounceDelay, saveLastInteractionTime]
  )

  const onEvent = useCallback(() => {
    setIsIdle(false) // アクティブ状態にする
    if (timeoutOccurred) {
      onResume() // タイムアウトから復帰した場合に呼び出す
      setTimeoutOccurred(false) // タイムアウト状態をリセット
    }
    handleDebouncedAction() // イベント後、アイドル状態を遅延して更新
  }, [handleDebouncedAction, onResume, timeoutOccurred])

  useEffect(() => {
    // ユーザーがアクティブになった時にonActiveを呼ぶ
    if (!isIdle) {
      onActive()
    }

    // イベントリスナーの登録
    customEvents.forEach((event) => {
      window.addEventListener(event, onEvent)
    })

    // クリーンアップ処理
    return () => {
      customEvents.forEach((event) => {
        window.removeEventListener(event, onEvent)
      })
      handleDebouncedAction.cancel() // debounceのキャンセル
    }
  }, [
    customEvents,
    onEvent,
    isIdle,
    onActive,
    onResume,
    timeoutOccurred,
    handleDebouncedAction,
  ])

  // タイムアウトチェック
  const checkTimeout = useCallback(() => {
    const now = Date.now()
    if (
      isIdle &&
      lastInteractionTime &&
      now - lastInteractionTime > timeoutLimit
    ) {
      onTimeout({ lastInteractionTime, type: 'timeout' })
      setTimeoutOccurred(true) // タイムアウト状態にフラグを立てる
      clearLastInteractionTime()
    }
  }, [
    lastInteractionTime,
    timeoutLimit,
    isIdle,
    onTimeout,
    clearLastInteractionTime,
  ])

  useEffect(() => {
    // 初回ロード時にタイムアウトチェック
    if (
      lastInteractionTime &&
      Date.now() - lastInteractionTime > timeoutLimit
    ) {
      onTimeout({ lastInteractionTime, type: 'initial' })
      setTimeoutOccurred(true) // タイムアウト状態にフラグを立てる
      clearLastInteractionTime()
    }
  }, [lastInteractionTime, timeoutLimit, onTimeout, clearLastInteractionTime])

  useEffect(() => {
    const intervalId = setInterval(checkTimeout, 1000)
    return () => clearInterval(intervalId) // インターバルのクリーンアップ
  }, [checkTimeout])
}

export default useIdleTimeout
