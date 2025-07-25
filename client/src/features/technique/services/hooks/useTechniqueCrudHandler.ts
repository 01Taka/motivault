import { useCallback } from 'react'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { useTechniqueDataStore } from '../stores/useTechniqueDataStore'
import {
  gainTechniqueExp,
  unlockTechniqueAchievement,
} from '../functions/technique-event-crud'
import { useUserDataStore } from '../../../user/services/stores/useUserDataStore'
import {
  changeTechniqueSession,
  endCurrentTechniqueSession,
  startTechniqueSession,
} from '../functions/technique-session-crud'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type { TechniqueSessionEndReason } from '../documents/session/technique-session-document'

const useTechniqueCrudHandler = () => {
  const { user, idbUser } = useUserDataStore()
  const { idbMetadata, idbSessions, idbExpEvent, idbAchievementEvent } =
    useTechniqueDataStore()
  const asyncKeys = [
    'changeSession',
    'startSession',
    'endSession',
    'gainExp',
    'unlockAchievement',
  ] as const
  const {
    asyncStates,
    callAsyncFunction,
    globalError,
    logError,
    resetGlobalError,
  } = useMultipleAsyncHandler(asyncKeys)

  const changeSession = useCallback(
    async (
      newTechniqueId: TechniqueId,
      endReasonForPreviousSession: TechniqueSessionEndReason
    ) => {
      if (!idbUser || !idbSessions) {
        const error = new Error(
          'IndexedDB stores are not initialized for session change.'
        )
        logError(
          'changeSession',
          error,
          'セッションの変更に失敗しました: データベースが準備できていません。'
        )
        return { success: false, message: 'Database not ready.' }
      }

      const result = await callAsyncFunction(
        'changeSession',
        changeTechniqueSession,
        [idbUser, idbSessions, newTechniqueId, endReasonForPreviousSession],
        'セッションの変更に失敗しました。'
      )

      return result
    },
    [idbUser, idbSessions, callAsyncFunction, logError]
  )

  const startSession = useCallback(
    async (techniqueId: TechniqueId) => {
      if (!idbUser || !idbSessions) {
        const error = new Error(
          'IndexedDB stores are not initialized for session start.'
        )
        logError(
          'startSession',
          error,
          'セッションの開始に失敗しました: データベースが準備できていません。'
        )
        return { success: false, message: 'Database not ready.' }
      }

      const result = await callAsyncFunction(
        'startSession',
        startTechniqueSession,
        [idbUser, idbSessions, techniqueId],
        'セッションの開始に失敗しました。'
      )

      return result
    },
    [idbUser, idbSessions, callAsyncFunction, logError]
  )

  const endSession = useCallback(
    async (endReason: TechniqueSessionEndReason, timestamp?: number) => {
      if (!idbUser || !idbSessions) {
        const error = new Error(
          'IndexedDB stores are not initialized for session end.'
        )
        logError(
          'endSession',
          error,
          'セッションの終了に失敗しました: データベースが準備できていません。'
        )
        return { success: false, message: 'Database not ready.' }
      }

      const result = await callAsyncFunction(
        'endSession',
        endCurrentTechniqueSession,
        [idbUser, idbSessions, endReason, timestamp],
        'セッションの終了に失敗しました。'
      )

      return result
    },
    [idbUser, idbSessions, callAsyncFunction, logError]
  )

  const gainExp = useCallback(
    async (expGained: number, gainedReason: string) => {
      if (!user || !user.activeSessionInfo) {
        const error = new Error(
          'User or active session information is not available for gaining experience.'
        )
        logError(
          'gainExp',
          error,
          '経験値の獲得に失敗しました: ユーザーセッションデータがありません。'
        )
        return { success: false, message: 'Missing user session data.' }
      }
      if (!idbMetadata || !idbSessions || !idbExpEvent) {
        const error = new Error(
          'IndexedDB stores are not initialized for gaining experience.'
        )
        logError(
          'gainExp',
          error,
          '経験値の獲得に失敗しました: データベースが準備できていません。'
        )
        return { success: false, message: 'Database not ready.' }
      }

      const { techniqueId, sessionId } = user.activeSessionInfo
      const result = await callAsyncFunction(
        'gainExp',
        gainTechniqueExp,
        [
          idbMetadata,
          idbSessions,
          idbExpEvent,
          techniqueId,
          sessionId,
          expGained,
          gainedReason,
        ],
        '経験値の獲得に失敗しました。'
      )

      if (!result.success) {
        console.error('Failed to gain experience:', result.result)
      }
      return result
    },
    [user, idbMetadata, idbSessions, idbExpEvent, callAsyncFunction, logError]
  )

  const unlockAchievement = useCallback(
    async (unlockedAchievementIds: string[]) => {
      if (!user || !user.activeSessionInfo) {
        const error = new Error(
          'User or active session information is not available for unlocking achievement.'
        )
        logError(
          'unlockAchievement',
          error,
          '実績の解除に失敗しました: ユーザーセッションデータがありません。'
        )
        return {
          success: false,
          message: 'Missing user session data for achievement.',
        }
      }
      if (!idbMetadata || !idbSessions || !idbAchievementEvent) {
        const error = new Error(
          'IndexedDB achievement stores are not initialized.'
        )
        logError(
          'unlockAchievement',
          error,
          '実績の解除に失敗しました: データベースが準備できていません。'
        )
        return {
          success: false,
          message: 'Database not ready for achievement.',
        }
      }

      const { techniqueId, sessionId } = user.activeSessionInfo
      const result = await callAsyncFunction(
        'unlockAchievement',
        unlockTechniqueAchievement,
        [
          idbMetadata,
          idbSessions,
          idbAchievementEvent,
          techniqueId,
          sessionId,
          unlockedAchievementIds,
        ],
        '実績の解除に失敗しました。'
      )

      if (!result.success) {
        console.error('Failed to unlock achievement:', result.result)
      }
      return result
    },
    [
      user,
      idbMetadata,
      idbSessions,
      idbAchievementEvent,
      callAsyncFunction,
      logError,
    ]
  )

  return {
    asyncStates,
    globalError, // Expose globalError
    resetGlobalError, // Expose resetGlobalError
    changeSession,
    startSession,
    endSession,
    gainExp,
    unlockAchievement,
  }
}

export default useTechniqueCrudHandler
