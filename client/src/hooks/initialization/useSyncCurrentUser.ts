import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '../../firebase/firebase'
import { getRepositories } from '../../firebase/firestore/repositories'
import { useCurrentUserStore } from '../../stores/user/currentUserStore'

export const useSyncCurrentUser = () => {
  const { setUid, setUser, setLoading, setError } = useCurrentUserStore()

  useEffect(() => {
    setLoading(true)

    // FirebaseAuth からログイン状態を監視
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUid(null)
        setUser(null)
        setLoading(false)
        return
      }

      const uid = firebaseUser.uid
      setUid(uid)

      try {
        // 初回取得
        const userData = await getRepositories().users.read([uid])
        setUser(userData)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
      }

      // 更新監視
      const result = getRepositories().users.addReadCallback(
        (data) => {
          setUser(data)
        },
        [uid]
      )

      return () => {
        result.unsubscribe()
      }
    })

    return () => {
      unsubscribeAuth()
    }
  }, [setUid, setUser, setLoading, setError])
}
