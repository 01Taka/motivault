import type { TechniqueId } from '../../types/data/technique-id-types'
import type {
  TechniqueExpGainEventRepository,
  TechniqueMetadataRepository,
  TechniqueSessionRepository,
  TechniqueUnlockAchievementsEventRepository,
} from '../repositories/repositories'

const ERROR_MESSAGES = {
  metadataNotFound: (techniqueId: TechniqueId) =>
    `Technique metadata not found for ID: ${techniqueId}`,
  sessionNotFound: (techniqueId: TechniqueId, sessionId: string) =>
    `Session not found for techniqueId: ${techniqueId}, sessionId: ${sessionId}`,
  invalidExpGained: (expGained: number, expGainLimit: number) =>
    `Invalid expGained value: ${expGained}. It must be between 0 and ${expGainLimit}.`,
  experienceGainFailed: (
    techniqueId: TechniqueId,
    sessionId: string,
    error: any
  ) =>
    `Experience gain failed for techniqueId: ${techniqueId}, sessionId: ${sessionId}. Error: ${error}`,
}

const fetchMetadataAndSession = async (
  metadataRepo: TechniqueMetadataRepository,
  sessionRepo: TechniqueSessionRepository,
  techniqueId: TechniqueId,
  sessionId: string
) => {
  const metadata = await metadataRepo.read([techniqueId])
  const session = await sessionRepo.read([techniqueId, sessionId])

  if (!metadata) {
    throw new Error(ERROR_MESSAGES.metadataNotFound(techniqueId))
  }

  if (!session) {
    throw new Error(ERROR_MESSAGES.sessionNotFound(techniqueId, sessionId))
  }

  return { metadata, session }
}

export const gainTechniqueExp = async (
  metadataRepo: TechniqueMetadataRepository,
  sessionRepo: TechniqueSessionRepository,
  expEventRepo: TechniqueExpGainEventRepository,
  techniqueId: TechniqueId,
  sessionId: string,
  expGained: number,
  gainedReason: string,
  timestamp = Date.now(),
  expGainLimit = 1000
) => {
  // expGained の範囲チェック
  if (expGained < 0 || expGained > expGainLimit) {
    throw new Error(ERROR_MESSAGES.invalidExpGained(expGained, expGainLimit))
  }

  try {
    const { metadata, session } = await fetchMetadataAndSession(
      metadataRepo,
      sessionRepo,
      techniqueId,
      sessionId
    )

    // 経験値の更新
    const totalGainedExp = metadata.totalGainedExp + expGained
    await metadataRepo.update({ totalGainedExp }, [techniqueId])

    // セッションの更新
    const sessionTotalExpGained = session.totalExpGained + expGained
    await sessionRepo.update({ totalExpGained: sessionTotalExpGained }, [
      techniqueId,
      sessionId,
    ])

    // 経験値獲得イベントの作成
    await expEventRepo.create(
      { timestamp, amount: expGained, reason: gainedReason },
      [techniqueId]
    )
  } catch (error) {
    console.error('Error during experience gain process:', error)
    throw new Error(
      ERROR_MESSAGES.experienceGainFailed(techniqueId, sessionId, error)
    )
  }
}

export const unlockTechniqueAchievement = async (
  metadataRepo: TechniqueMetadataRepository,
  sessionRepo: TechniqueSessionRepository,
  achievementEventRepo: TechniqueUnlockAchievementsEventRepository,
  techniqueId: TechniqueId,
  sessionId: string,
  unlockedAchievementIds: string[],
  timestamp = Date.now()
) => {
  if (unlockedAchievementIds.length === 0) {
    return
  }

  try {
    const { metadata, session } = await fetchMetadataAndSession(
      metadataRepo,
      sessionRepo,
      techniqueId,
      sessionId
    )

    // アチーブメントIDの更新
    const unlockedIds = Array.from(
      new Set([...metadata.unlockedAchievementIds, ...unlockedAchievementIds])
    )
    await metadataRepo.update({ unlockedAchievementIds: unlockedIds }, [
      techniqueId,
    ])

    const sessionUnlockedIds = Array.from(
      new Set([...session.unlockedAchievementIds, ...unlockedAchievementIds])
    )
    await sessionRepo.update({ unlockedAchievementIds: sessionUnlockedIds }, [
      techniqueId,
      sessionId,
    ])

    // アチーブメント獲得イベントの作成
    await achievementEventRepo.create({ timestamp, unlockedAchievementIds }, [
      techniqueId,
    ])
  } catch (error) {
    console.error('Error during achievement unlock process:', error)
    throw new Error(
      ERROR_MESSAGES.experienceGainFailed(techniqueId, sessionId, error)
    )
  }
}
