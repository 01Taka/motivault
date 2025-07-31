import { useEffect } from 'react'
import useTechniqueSessionManager from '../features/technique/services/hooks/useTechniqueSessionManager'
import { useTechniqueDataStore } from '../features/technique/services/stores/useTechniqueDataStore'
import { useTechniqueMetadataDataStore } from '../features/technique/services/stores/useTechniqueMetadataDataStore'
import { useUserDataStore } from '../features/user/services/stores/useUserDataStore'
import useAbstractDataSync from './services/useAbstractDataSync'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { UserIDBRepository } from '../features/user/services/repositories/user-idb-repository'

const useInitializeApp = () => {
  const navigate = useNavigate()
  const userStore = useUserDataStore()
  useAbstractDataSync(userStore)
  useAbstractDataSync(useTechniqueMetadataDataStore())
  useAbstractDataSync({ ...useTechniqueDataStore(), dataKeysToListen: [] })
  useTechniqueSessionManager()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        if (user) {
          const userDB = new UserIDBRepository(user.uid)
          const userData = await userDB.read([])
          if (userData) {
            userStore.setUserAuthState('loggedIn')
          } else {
            userStore.setUserAuthState('authenticated')
            navigate('/start/user-setup')
          }
        } else {
          userStore.setUserAuthState('unauthenticated')
          navigate('/start')
        }
      }
    )

    return () => {
      unsubscribeAuth()
    }
  }, [userStore.idbUser])
}

export default useInitializeApp
