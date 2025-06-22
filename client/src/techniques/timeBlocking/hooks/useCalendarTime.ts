import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const TOTAL_HOURS = 24

export const useCalendarTime = () => {
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs())
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    now,
    hours: Array.from({ length: TOTAL_HOURS }, (_, i) => i),
  }
}
