import { useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useTechniqueCrudHandler from './useTechniqueCrudHandler'
import useIdleTimeout from '../../../../hooks/system/useIdleTimeout'
import type { TechniqueId } from '../../types/data/technique-id-types'
import { getCurrentTechniqueIdFromPathname } from '../../functions/path-helper'

const SESSION_STORAGE_KEY = 'lastActiveTechniqueId'
const TIMEOUT_LIMIT = 10000

const useTechniqueSessionManager = () => {
  const location = useLocation()
  const { asyncStates, startSession, endSession, changeSession } =
    useTechniqueCrudHandler()

  const prevTechniqueIdRef = useRef<string | null>(null)

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
    currentTechniqueId: TechniqueId | null,
    lastActiveIdFromStorage: string | null
  ) => {
    let shouldEndPreviousSession = false
    let shouldStartNewSession = false
    let shouldChangeSession = false

    if (
      prevTechniqueIdRef.current === null &&
      lastActiveIdFromStorage !== null
    ) {
      shouldEndPreviousSession = true
      console.log(
        'DEBUG: Scenario 1 - prevTechniqueIdRef is null and lastActiveIdFromStorage exists. Should end previous session.'
      )
    } else if (
      prevTechniqueIdRef.current !== null &&
      currentTechniqueId &&
      currentTechniqueId !== prevTechniqueIdRef.current
    ) {
      shouldChangeSession = true
      console.log(
        'DEBUG: Scenario 2 - prevTechniqueIdRef exists, currentTechniqueId exists and is different. Should change session.'
      )
    } else if (
      prevTechniqueIdRef.current !== null &&
      currentTechniqueId === null
    ) {
      shouldEndPreviousSession = true
      console.log(
        'DEBUG: Scenario 3 - prevTechniqueIdRef exists and currentTechniqueId is null. Should end previous session.'
      )
    } else if (
      currentTechniqueId !== null &&
      (prevTechniqueIdRef.current === null ||
        currentTechniqueId !== prevTechniqueIdRef.current)
    ) {
      shouldStartNewSession = true
      console.log(
        'DEBUG: Scenario 4 - currentTechniqueId exists and (prevTechniqueIdRef is null or different). Should start new session.'
      )
    }

    // 実際にセッションを変更・終了・開始する
    if (shouldChangeSession && currentTechniqueId) {
      callChangeSession(currentTechniqueId, 'linkMoved')
    } else if (shouldEndPreviousSession) {
      callEndSession('linkMoved')
    }

    if (shouldStartNewSession && currentTechniqueId && !shouldChangeSession) {
      callStartSession(currentTechniqueId)
    }

    prevTechniqueIdRef.current = currentTechniqueId
  }

  // IDをsessionStorageに保存または削除
  const updateSessionStorage = (currentTechniqueId: string | null) => {
    if (currentTechniqueId !== null) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, currentTechniqueId)
      console.log('DEBUG: sessionStorage updated with ID:', currentTechniqueId)
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
      console.log('DEBUG: sessionStorage cleared.')
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
    const currentTechniqueId = getCurrentTechniqueIdFromPathname(
      location.pathname
    )
    const lastActiveIdFromStorage = sessionStorage.getItem(SESSION_STORAGE_KEY)

    // セッション変更判定の実行
    handleSessionChange(currentTechniqueId, lastActiveIdFromStorage)

    // sessionStorageの更新
    updateSessionStorage(currentTechniqueId)
  }, [location, callEndSession, callStartSession, callChangeSession]) // Dependencies updated to use wrapped functions

  // --- テスト用ナビゲーション機能 ---
  const navigate = useNavigate()

  const handleSpacePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        const currentPath = location.pathname
        if (currentPath.includes('/techniques/task-press')) {
          navigate('/techniques/tiny-steps')
        } else {
          navigate('/techniques/task-press')
        }
      }
    },
    [location.pathname, navigate]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleSpacePress)
    return () => {
      window.removeEventListener('keydown', handleSpacePress)
    }
  }, [handleSpacePress])
  // --- テスト用ナビゲーション機能 終わり ---

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
