import useFormState from './base/useFormState'
import type { ISODate } from '../../types/datetime-types'
import type { Gender } from '../../types/firebase/firestore/util-document-types'

export interface UserSetUpFormState {
  displayName: string
  birthdate: ISODate | ''
  gender: Gender | ''
}

export const useUserSetupForm = () => {
  return useFormState<UserSetUpFormState>({
    displayName: '',
    birthdate: '',
    gender: '',
  })
}
