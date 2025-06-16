import { repositories } from '../../../firebase/firestore/repositories'
import { toTimestamp } from '../../../functions/dateTime-utils/time-conversion'
import type { Gender } from '../../../types/firebase/firestore/util-document-types'

export const submitUserSetup = async (
  uid: string,
  userInfo: {
    displayName: string
    birthdate: Date
    gender: Gender
  }
) => {
  await repositories.users.createWithId(
    {
      ...userInfo,
      birthdate: toTimestamp(userInfo.birthdate),
    },
    [uid]
  )
}
