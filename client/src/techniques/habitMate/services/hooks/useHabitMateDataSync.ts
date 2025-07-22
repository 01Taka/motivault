import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useHabitMateDataStore } from '../stores/useHabitMateDataStore'

const useHabitMateDataSync = () => {
  const { setRepositories, clearRepositories, initializeListeners, clearData } =
    useHabitMateDataStore()

  useEffect(() => {
    let cleanupListeners: (() => void) | undefined

    const unsubscribeAuth = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setRepositories(user.uid)
        // リポジトリがセットされた後にリスナーを初期化
        cleanupListeners = initializeListeners(user.uid)
      } else {
        // ログアウト時はリポジトリとデータをクリアし、リスナーを解除
        clearRepositories()
        clearData()
        cleanupListeners?.() // 既存のリスナーを解除
      }
    })

    // クリーンアップ関数
    return () => {
      unsubscribeAuth() // Firebase認証リスナーを解除
      cleanupListeners?.() // コレクションスナップショットリスナーを解除
    }
  }, [setRepositories, clearRepositories, initializeListeners, clearData])
}

export default useHabitMateDataSync
