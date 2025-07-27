import { useCallback } from 'react'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { useUserDataStore } from '../stores/useUserDataStore'
import type { UserWrite } from '../documents/user-document'
import { createNewUser } from '../functions/user-crud'
import type { UserSetupFormState } from '../../types/form/user-setup-form-state'

const userCrudHandler = () => {
  const { idbUser } = useUserDataStore()
  const asyncKeys = ['submitCreateUser'] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  const submitCreateUser = useCallback(
    (formState: UserSetupFormState) => {
      if (!idbUser) {
        return
      }
      const userData: UserWrite = {
        displayName: formState.displayName,
        birthdate: formState.birthdate,
        gender: formState.gender,
        email: null,
        activeSessionInfo: null,
      }
      callAsyncFunction('submitCreateUser', createNewUser, [idbUser, userData])
    },
    [idbUser, callAsyncFunction]
  )

  return { asyncStates, submitCreateUser }
}

export default userCrudHandler
