import { useRef } from 'react'
import achieveSE from '../../../assets/sounds/achieve.mp3'

export const useHabitAudio = () => {
  const audioRef = useRef(new Audio(achieveSE))

  const ringSE = () => {
    audioRef.current.currentTime = 0
    audioRef.current.play().catch((e) => {
      console.log('再生失敗:', e)
    })
  }

  return { ringSE }
}
