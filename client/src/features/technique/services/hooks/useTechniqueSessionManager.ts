import { useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useTechniqueCrudHandler from './useTechniqueCrudHandler'
import { TechniqueIdSchema } from '../../types/data/technique-id-schema'
import useIdleTimeout from '../../../../hooks/system/useIdleTimeout'
import type { TechniqueId } from '../../types/data/technique-id-types'

const SESSION_STORAGE_KEY = 'lastActiveTechniqueId'
const TIMEOUT_LIMIT = 10000

const useTechniqueSessionManager = () => {
  const location = useLocation()
  const { asyncStates, startSession, endSession, changeSession } =
    useTechniqueCrudHandler()

  const prevTechniqueIdRef = useRef<string | null>(null)

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
    } else if (
      prevTechniqueIdRef.current !== null &&
      currentTechniqueId &&
      currentTechniqueId !== prevTechniqueIdRef.current
    ) {
      shouldChangeSession = true
    } else if (
      prevTechniqueIdRef.current !== null &&
      currentTechniqueId === null
    ) {
      shouldEndPreviousSession = true
    } else if (
      currentTechniqueId !== null &&
      (prevTechniqueIdRef.current === null ||
        currentTechniqueId !== prevTechniqueIdRef.current)
    ) {
      shouldStartNewSession = true
    }

    // 実際にセッションを変更・終了・開始する
    if (shouldChangeSession && currentTechniqueId) {
      changeSession(currentTechniqueId, 'linkMoved')
    } else if (shouldEndPreviousSession) {
      endSession('linkMoved')
    }

    if (shouldStartNewSession && currentTechniqueId && !shouldChangeSession) {
      startSession(currentTechniqueId)
    }

    prevTechniqueIdRef.current = currentTechniqueId
  }

  // 技術IDを抽出しバリデーションする関数
  const getCurrentTechniqueId = (pathname: string): TechniqueId | null => {
    const match = pathname.match(/^\/techniques\/([^/]+)(?:\/|$)/)
    const extractedTechniqueId = match ? match[1] : null

    const validationResult = TechniqueIdSchema.safeParse(extractedTechniqueId)
    return validationResult.success ? validationResult.data : null
  }

  // IDをsessionStorageに保存または削除
  const updateSessionStorage = (currentTechniqueId: string | null) => {
    if (currentTechniqueId !== null) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, currentTechniqueId)
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
    }
  }

  // useIdleTimeoutの設定
  useIdleTimeout({
    timeoutLimit: TIMEOUT_LIMIT,
    onTimeout: ({ lastInteractionTime }) => {
      endSession('timeout', lastInteractionTime)
    },
    onResume: () => {
      const currentTechniqueId = getCurrentTechniqueId(location.pathname)
      if (currentTechniqueId) {
        startSession(currentTechniqueId)
      }
    },
  })

  useEffect(() => {
    const currentTechniqueId = getCurrentTechniqueId(location.pathname)
    const lastActiveIdFromStorage = sessionStorage.getItem(SESSION_STORAGE_KEY)

    // セッション変更判定の実行
    handleSessionChange(currentTechniqueId, lastActiveIdFromStorage)

    // sessionStorageの更新
    updateSessionStorage(currentTechniqueId)
  }, [location, endSession, startSession, changeSession])

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
