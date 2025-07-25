import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import {
  PartialUserWriteSchema,
  UserSchema,
  type UserRead,
  type UserWrite,
} from '../documents/user-document'

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

  protected filterWriteData(data: UserWrite): UserWrite {
    return UserSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<UserWrite>
  ): Partial<UserWrite> {
    return PartialUserWriteSchema.parse(data)
  }
}
