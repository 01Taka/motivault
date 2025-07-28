import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import useTechniqueCrudHandler from './useTechniqueCrudHandler'
import useIdleTimeout from '../../../../hooks/system/useIdleTimeout'
import type { TechniqueId } from '../../types/data/technique-id-types'
import { getCurrentTechniqueIdFromPathname } from '../../functions/path-helper'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'

const TIMEOUT_LIMIT = 15 * MINUTES_IN_MS

const useTechniqueSessionManager = () => {
  const location = useLocation()
  const {
    asyncStates,
    listenerStatus,
    user,
    startSession,
    endSession,
    changeSession,
  } = useTechniqueCrudHandler()

  // Wrapper function for startSession to allow for logging/debugging
  const callStartSession = useCallback(
    (id: TechniqueId) => {
      console.log('Attempting to start session for ID:', id)
      startSession(id)
    },
    [startSession]
  )

  // Wrapper function for endSession to allow for logging/debugging
  const callEndSession = useCallback(
    (reason: 'timeout' | 'linkMoved', lastInteractionTime?: number) => {
      console.log(
        'Attempting to end session for reason:',
        reason,
        'lastInteractionTime:',
        lastInteractionTime
      )
      endSession(reason, lastInteractionTime)
    },
    [endSession]
  )

  // Wrapper function for changeSession to allow for logging/debugging
  const callChangeSession = useCallback(
    (id: TechniqueId, reason: 'linkMoved') => {
      console.log(
        'Attempting to change session to ID:',
        id,
        'for reason:',
        reason
      )
      changeSession(id, reason)
    },
    [changeSession]
  )

  // セッション開始/終了/変更判定のための関数
  const handleSessionChange = (
    currentPathTechniqueId: TechniqueId | null,
    currentActiveTechniqueId: TechniqueId | null
  ) => {
    let shouldEndPreviousSession = false
    let shouldStartNewSession = false
    let shouldChangeSession = false

    if (currentPathTechniqueId === null && currentActiveTechniqueId !== null) {
      shouldEndPreviousSession = true
      console.log(
        'DEBUG: Scenario 1 - Path has no technique ID, but an active session exists. Ending current session.'
      )
    } else if (
      currentPathTechniqueId &&
      currentActiveTechniqueId &&
      currentPathTechniqueId !== currentActiveTechniqueId
    ) {
      shouldChangeSession = true
      console.log(
        'DEBUG: Scenario 2 - Path has a different technique ID than the active session. Changing session.'
      )
    } else if (
      currentPathTechniqueId !== null &&
      currentActiveTechniqueId === null
    ) {
      shouldStartNewSession = true
      console.log(
        'DEBUG: Scenario 3 - Path has a technique ID, but no active session. Starting new session.'
      )
    }

    // 実際にセッションを変更・終了・開始する
    if (shouldChangeSession && currentPathTechniqueId) {
      callChangeSession(currentPathTechniqueId, 'linkMoved')
    } else if (shouldEndPreviousSession) {
      callEndSession('linkMoved')
    }

    if (
      shouldStartNewSession &&
      !shouldChangeSession &&
      currentPathTechniqueId
    ) {
      callStartSession(currentPathTechniqueId)
    }
  }

  // useIdleTimeoutの設定
  useIdleTimeout({
    timeoutLimit: TIMEOUT_LIMIT,
    onTimeout: ({ lastInteractionTime }) => {
      callEndSession('timeout', lastInteractionTime)
    },
    onResume: () => {
      const currentTechniqueId = getCurrentTechniqueIdFromPathname(
        location.pathname
      )
      if (currentTechniqueId) {
        callStartSession(currentTechniqueId)
      }
    },
  })

  useEffect(() => {
    if (listenerStatus.user !== 'listening' || !user) {
      return
    }
    const currentTechniqueId = getCurrentTechniqueIdFromPathname(
      location.pathname
    )
    const currentActiveTechniqueId = user.activeSessionInfo?.techniqueId ?? null

    if (currentTechniqueId === currentActiveTechniqueId) {
      return
    }
    // セッション変更判定の実行
    handleSessionChange(currentTechniqueId, currentActiveTechniqueId)
  }, [
    location,
    listenerStatus.user,
    user,
    callEndSession,
    callStartSession,
    callChangeSession,
  ]) // Dependencies updated to use wrapped functions

  const {
    startSession: startSessionAsyncStates,
    endSession: endSessionAsyncStates,
    changeSession: changeSessionAsyncStates,
  } = asyncStates

  return {
    startSessionAsyncStates,
    endSessionAsyncStates,
    changeSessionAsyncStates,
  }
}

export default useTechniqueSessionManager
