import {
  INITIAL_XP,
  RANK_XP_INCREMENT,
  rankLevelThresholds,
  rankOrder,
} from '../constants/level-constants'
import type { TechniqueRank } from '../types/data/level-rank-types'
import type {
  TechniqueLevelInfo,
  XPAnimationSegment,
} from '../types/level-types'

function getRankByLevel(level: number): TechniqueRank {
  for (let i = rankLevelThresholds.length - 1; i >= 0; i--) {
    if (level >= rankLevelThresholds[i]) {
      return rankOrder[i]
    }
  }
  return rankOrder[0]
}

export function calculateLevelInfo(totalXp: number): TechniqueLevelInfo {
  let level = 1
  let accumulatedXp = 0

  while (true) {
    const rank = getRankByLevel(level)
    const increment = RANK_XP_INCREMENT[rank]
    const xpForNextLevel = Math.floor(INITIAL_XP + (level - 1) * increment)

    if (accumulatedXp + xpForNextLevel > totalXp) {
      const currentLevelXp = totalXp - accumulatedXp
      const nextLevelTotalXp = accumulatedXp + xpForNextLevel

      return {
        currentLevel: level,
        currentLevelXp,
        nextLevelXp: xpForNextLevel,
        nextLevelTotalXp,
        rank,
      }
    }

    accumulatedXp += xpForNextLevel
    level++
  }
}

export function createXPAnimationSegments(
  previousTotalXP: number,
  currentTotalXP: number
): XPAnimationSegment[] {
  const segments: XPAnimationSegment[] = []

  let cursorXP = previousTotalXP

  while (true) {
    const currentLevelInfo = calculateLevelInfo(cursorXP)

    const levelStartTotalXP =
      currentLevelInfo.nextLevelTotalXp - currentLevelInfo.nextLevelXp
    const levelEndTotalXP = currentLevelInfo.nextLevelTotalXp

    const isFirst = segments.length === 0
    const isLast = levelEndTotalXP >= currentTotalXP

    const segment: XPAnimationSegment = {
      ...(isFirst ? { startXP: cursorXP - levelStartTotalXP } : {}),
      ...(isLast ? { endXP: currentTotalXP - levelStartTotalXP } : {}),
      nextLevelXP: currentLevelInfo.nextLevelXp,
      level: currentLevelInfo.currentLevel,
      rank: currentLevelInfo.rank,
    }

    segments.push(segment)

    if (isLast) break

    cursorXP = levelEndTotalXP
  }

  return segments
}
