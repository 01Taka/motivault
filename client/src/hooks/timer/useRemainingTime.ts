import { useEffect, useMemo, useRef, useState } from 'react'

const useRemainingTime = ({
  isRunning,
  stoppedAt,
  expectedEndAt,
  expectedDuration,
  getNow = () => Date.now(),
}: {
  isRunning: boolean
  stoppedAt: number
  expectedEndAt: number // startTime + expectedDuration
  expectedDuration: number
  getNow?: () => number
}) => {
  const [diffTime, setDiffTime] = useState(0)
  const remainingTimeRef = useRef<number>(Infinity)

  const remainingTime = useMemo(() => {
    return isRunning ? diffTime : expectedEndAt - stoppedAt
  }, [isRunning, diffTime, expectedEndAt, stoppedAt])

  useEffect(() => {
    remainingTimeRef.current = diffTime
  }, [diffTime])

  // 経過時間を計算
  const elapsedTime = expectedDuration - remainingTime

  // インターバルで diffTime を更新
  useEffect(() => {
    if (!expectedEndAt) return

    const updateRemainingTime = () => {
      const diff = expectedEndAt - getNow()
      setDiffTime(diff)
      remainingTimeRef.current = diff
    }

    updateRemainingTime()
    const interval = setInterval(updateRemainingTime, 1000)

    return () => clearInterval(interval)
  }, [expectedEndAt])

  return {
    remainingTime,
    elapsedTime,
    remainingTimeRef,
  }
}

export default useRemainingTime
