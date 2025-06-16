import React, { useEffect, useMemo, useState } from 'react'
import AchievementDetailView from './AchievementDetailView'
import RankUpModal from './RankUpModal'
import type { TechniqueAchievementBadge } from '../types/achievement-types'
import { useXPAnimation } from '../hooks/useXPAnimation'
import {
  createXPAnimationSegments,
  getLevelInfo,
} from '../functions/level-utils'

interface AchievementAnimationsScreenProps {
  title: string
  previousTotalXP: number
  currentTotalXP: number
  badges: TechniqueAchievementBadge[]
}

const AchievementAnimationsScreen: React.FC<
  AchievementAnimationsScreenProps
> = ({ title, previousTotalXP, currentTotalXP, badges }) => {
  const { rank: previousRank } = useMemo(
    () => getLevelInfo(previousTotalXP),
    [previousTotalXP]
  )

  const {
    currentLevel,
    currentLevelXp: currentXP,
    nextLevelXp,
    rank: currentRank,
  } = useMemo(() => getLevelInfo(currentTotalXP), [currentTotalXP])

  const [showRankUp, setShowRankUp] = useState(false)

  const {
    animatedXP,
    animatedLevel,
    animatedRank,
    nextLevelXP: animNextLevelXP,
    isAnimating,
    playAnimation,
  } = useXPAnimation({
    onLevelUp: () => {},
    onAnimationEnd: () => {
      if (previousRank !== currentRank) {
        setShowRankUp(true)
      }
    },
    animationDuration: 1000,
  })

  useEffect(() => {
    const segments = createXPAnimationSegments(
      previousTotalXP ?? 0,
      currentTotalXP ?? 0
    )
    playAnimation(segments)
  }, [])

  return (
    <>
      <AchievementDetailView
        title={title}
        currentLevel={isAnimating ? animatedLevel : currentLevel}
        currentXP={isAnimating ? animatedXP : currentXP}
        nextLevelXp={isAnimating ? animNextLevelXP : nextLevelXp}
        currentRank={isAnimating && animatedRank ? animatedRank : currentRank}
        badges={badges}
        isAnimating={isAnimating}
      />
      <RankUpModal
        open={showRankUp}
        oldRank={previousRank}
        newRank={animatedRank ?? 'iron'}
        onClose={() => setShowRankUp(false)}
      />
    </>
  )
}

export default AchievementAnimationsScreen
