import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * usePulse Hookのオプション
 */
interface UsePulseOptions {
  /**
   * パルスのデフォルト持続時間（ミリ秒）。
   * 省略された場合は1000ミリ秒（1秒）が使用されます。
   */
  defaultDuration?: number
  /**
   * Hookの初期化時に、パルスが開始されるたびに呼び出されるコールバック関数。
   */
  onPulseStart?: () => void
  /**
   * Hookの初期化時に、パルスが終了するたびに呼び出されるコールバック関数。
   */
  onPulseEnd?: () => void
}

/**
 * パルス状態を管理するカスタムHook
 *
 * @param {UsePulseOptions} [options] - パルス設定のためのオプションオブジェクト。
 * @returns {[boolean, (pulseOptions?: { duration?: number, onStart?: () => void, onEnd?: () => void }) => void]}
 * [0]: isPulsing - 現在パルス中であるかを示す真偽値。
 * [1]: startPulse - パルスを開始する関数。
 * @param {object} [pulseOptions] - このパルスの設定のためのオプションオブジェクト。
 * @param {number} [pulseOptions.duration] - このパルスの持続時間（ミリ秒）。指定しない場合はdefaultDurationを使用。
 * @param {() => void} [pulseOptions.onStart] - このパルス開始時に呼び出されるコールバック関数。
 * @param {() => void} [pulseOptions.onEnd] - このパルス終了時に呼び出されるコールバック関数。
 */
const usePulse = (
  options?: UsePulseOptions
): [
  boolean,
  (pulseOptions?: {
    duration?: number
    onStart?: () => void
    onEnd?: () => void
  }) => void,
] => {
  const { defaultDuration = 1000, onPulseStart, onPulseEnd } = options || {}

  const [isPulsing, setIsPulsing] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // クリーンアップ関数
  const clearPulse = useCallback((): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // パルスを開始する関数
  const startPulse = useCallback(
    (pulseOptions?: {
      duration?: number
      onStart?: () => void
      onEnd?: () => void
    }): void => {
      // 既存のパルスがあればクリア
      clearPulse()

      setIsPulsing(true)
      // Hookの初期化時に渡されたonPulseStartと、startPulse呼び出し時に渡されたonStartの両方を呼び出す
      onPulseStart?.()
      pulseOptions?.onStart?.()

      const pulseDuration = pulseOptions?.duration ?? defaultDuration

      timeoutRef.current = setTimeout(() => {
        setIsPulsing(false)
        // Hookの初期化時に渡されたonPulseEndと、startPulse呼び出し時に渡されたonEndの両方を呼び出す
        onPulseEnd?.()
        pulseOptions?.onEnd?.()
        timeoutRef.current = null
      }, pulseDuration)
    },
    [defaultDuration, clearPulse, onPulseStart, onPulseEnd]
  ) // 依存配列に新しいコールバックを追加

  // コンポーネントのアンマウント時にタイムアウトをクリア
  useEffect(() => {
    return () => {
      clearPulse()
    }
  }, [clearPulse])

  return [isPulsing, startPulse]
}

export default usePulse
