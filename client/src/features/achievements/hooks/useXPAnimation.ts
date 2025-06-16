import { useRef, useState } from 'react'
import type {
  TechniqueRank,
  XPAnimationSegment,
} from '../types/achievement-types'

interface UseXPAnimationOptions {
  onLevelUp?: (data: {
    fromXP: number
    toXP: number
    nextLevelXP: number
    rank: TechniqueRank
  }) => void
  onAnimationEnd?: () => void
  animationDuration?: number
}

export const useXPAnimation = (options?: UseXPAnimationOptions) => {
  const [animatedXP, setAnimatedXP] = useState(0)
  const [animatedLevel, setAnimatedLevel] = useState(0)
  const [animatedRank, setAnimatedRank] = useState<TechniqueRank | null>(null)
  const [previousXP, setPreviousXP] = useState<number | undefined>(undefined)
  const [nextLevelXP, setNextLevelXP] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const isAnimatingRef = useRef(false)

  const runAnimation = async (from: number, to: number): Promise<void> => {
    return new Promise((resolve) => {
      const duration = options?.animationDuration ?? 1000
      const start = performance.now()
      const diff = to - from

      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const value = from + diff * progress

        setPreviousXP(animatedXP)
        setAnimatedXP(value)

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          resolve()
        }
      }

      requestAnimationFrame(step)
    })
  }

  const playAnimation = async (segments: XPAnimationSegment[]) => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    setIsAnimating(true)

    for (let i = 0; i < segments.length; i++) {
      const { startXP, endXP, nextLevelXP, level, rank } = segments[i]
      const from = startXP ?? 0
      const to = endXP ?? nextLevelXP

      if (options?.onLevelUp && i !== 0) {
        options.onLevelUp({ fromXP: from, toXP: to, nextLevelXP, rank })
      }
      setNextLevelXP(nextLevelXP)
      setAnimatedLevel(level)
      setAnimatedRank(rank)

      await runAnimation(from, to)
    }

    setIsAnimating(false)
    isAnimatingRef.current = false
    options?.onAnimationEnd?.()
  }

  return {
    animatedXP,
    animatedLevel,
    animatedRank,
    previousXP,
    isAnimating,
    nextLevelXP,
    playAnimation,
  }
}
