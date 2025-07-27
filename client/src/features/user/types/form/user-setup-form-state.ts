import type { ISODate } from '../../../../types/utils/datetime-types'
import type { Gender } from '../../../../types/utils/services/gender-types'

export interface UserSetupFormState {
  displayName: string
  birthdate: ISODate
  gender: Gender
}
