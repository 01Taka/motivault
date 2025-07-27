// import { getRepositories } from '../../../firebase/firestore/repositories'
// import { toTimestamp } from '../../../functions/dateTime-utils/time-conversion'
// import type { Gender } from '../../../types/utils/services/gender-types'

// export const submitUserSetup = async (
//   uid: string,
//   userInfo: {
//     displayName: string
//     birthdate: Date
//     gender: Gender
//   }
// ) => {
//   await getRepositories().users.createWithId(
//     {
//       ...userInfo,
//       birthdate: toTimestamp(userInfo.birthdate),
//     },
//     [uid]
//   )
// }
