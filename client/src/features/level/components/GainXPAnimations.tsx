import React, { useEffect, useMemo, useState } from 'react'
import {
  calculateLevelInfo,
  createXPAnimationSegments,
} from '../functions/level-utils'
import { useXPAnimation } from '../hooks/useXPAnimation'
import Popup from '../../../components/utils/Popup'
import RankUpView from './rank/RankUpView'
import LevelUpDetailView from './levelUpDetail/LevelUpDetailView'

interface GainXPAnimationsProps {
  title: string
  previousTotalXP: number
  currentTotalXP: number
}

const GainXPAnimations: React.FC<GainXPAnimationsProps> = ({
  title,
  previousTotalXP,
  currentTotalXP,
}) => {
  const { rank: previousRank } = useMemo(
    () => calculateLevelInfo(previousTotalXP),
    [previousTotalXP]
  )

  const {
    currentLevel,
    currentLevelXp: currentXP,
    nextLevelXp,
    rank: currentRank,
  } = useMemo(() => calculateLevelInfo(currentTotalXP), [currentTotalXP])

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
      <LevelUpDetailView
        title={title}
        currentLevel={isAnimating ? animatedLevel : currentLevel}
        currentXP={isAnimating ? animatedXP : currentXP}
        nextLevelXp={isAnimating ? animNextLevelXP : nextLevelXp}
        currentRank={isAnimating && animatedRank ? animatedRank : currentRank}
        isAnimating={isAnimating}
      />
      <Popup open={showRankUp} onClose={() => setShowRankUp(false)}>
        <RankUpView oldRank={previousRank} newRank={animatedRank ?? 'iron'} />
      </Popup>
    </>
  )
}

export default GainXPAnimations
