import FirestoreService from '../../handler/firestore-service'
import type {
  UserRead,
  UserWrite,
} from '../../../../types/firebase/firestore/documents/users/user-document'
import type { Firestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export class UserRepository extends FirestoreService<UserRead, UserWrite> {
  constructor(firestore: Firestore) {
    super(firestore, ['users'])
  }

  protected getCreatorUid(): string {
    const uid = getAuth().currentUser?.uid
    if (!uid) {
      throw new Error('Firestore Service においてUIDが取得できませんでした。')
    }
    return uid
  }

  protected filterWriteData<T extends UserWrite | Partial<UserWrite>>(
    data: T
  ): T extends UserWrite ? UserWrite : Partial<UserWrite> {
    const { displayName, birthdate, gender } = data
    return {
      displayName,
      birthdate,
      gender,
    } as any
  }
}
