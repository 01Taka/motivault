import React, { useEffect } from 'react'
import UserSetupForm from './UserSetupForm'
import userCrudHandler from '../../../user/services/hooks/userCrudHandler'
import { useNavigate } from 'react-router-dom'
import { useUserDataStore } from '../../../user/services/stores/useUserDataStore'
import AppUserExistsScreen from './AppUserExistsScreen'
import { Typography } from '@mui/material'

interface UserSetupProps {}

const UserSetup: React.FC<UserSetupProps> = ({}) => {
  const navigate = useNavigate()
  const { asyncStates, submitCreateUser } = userCrudHandler()
  const { user, listenerStatus } = useUserDataStore()

  useEffect(() => {
    if (asyncStates.submitCreateUser?.status === 'success') {
      navigate('/start/tutorial')
    }
  }, [asyncStates.submitCreateUser?.status])

  return (
    <div>
      {listenerStatus.user === 'initializing' ||
      listenerStatus.user === 'unset' ||
      asyncStates.submitCreateUser?.status === 'success' ? ( //ページ遷移待機用
        <Typography>Loading...</Typography>
      ) : listenerStatus.user === 'listening' && user ? (
        <AppUserExistsScreen
          userData={user}
          onGoToApp={() => navigate('/')}
          onGoToTutorial={() => navigate('/start/tutorial')}
          onLogout={() => {}}
        />
      ) : (
        <UserSetupForm
          disabledSubmit={asyncStates.submitCreateUser?.status === 'loading'}
          onSubmit={(formState) => submitCreateUser(formState)}
        />
      )}
    </div>
  )
}

export default UserSetup
