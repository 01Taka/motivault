import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type { UserRead, UserWrite } from '../documents/user-document'

/**
 * documentPath: [uid, habitId]
 */
export class UserIDBRepository extends IndexedDBService<UserRead, UserWrite> {
  private uid: string

  constructor(uid: string) {
    super(['users'], {
      users: uid,
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData<T extends UserWrite | Partial<UserWrite>>(
    data: T
  ): T extends UserWrite ? UserWrite : Partial<UserWrite> {
    const { displayName, birthdate, gender, email } = data
    return { displayName, birthdate, gender, email } as T extends UserWrite
      ? UserWrite
      : Partial<UserWrite>
  }
}
