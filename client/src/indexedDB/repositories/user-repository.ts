import type {
  UserRead,
  UserWrite,
} from '../../types/firebase/firestore/documents/users/user-document'
import { IndexedDBService } from '../indexed-db-service'

export class UserIDBRepository extends IndexedDBService<UserRead, UserWrite> {
  private uid: string

  constructor(uid: string) {
    super(['users'])
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
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
