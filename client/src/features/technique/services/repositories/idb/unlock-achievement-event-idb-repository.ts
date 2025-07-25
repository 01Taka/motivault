import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  PartialTechniqueUnlockAchievementEventWriteSchema,
  TechniqueUnlockAchievementEventSchema,
  type TechniqueUnlockAchievementEventRead,
  type TechniqueUnlockAchievementEventWrite,
} from '../../documents/session/unlock-achievement-event-document'

/**
 * documentPath: [techniqueId, sessionId]
 */
export class UnlockAchievementEventIDBRepository extends IndexedDBService<
  TechniqueUnlockAchievementEventRead,
  TechniqueUnlockAchievementEventWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniquesMetadata', 'unlockAchievementEvents'], {
      users: uid,
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TechniqueUnlockAchievementEventWrite
  ): TechniqueUnlockAchievementEventWrite {
    return TechniqueUnlockAchievementEventSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TechniqueUnlockAchievementEventWrite>
  ): Partial<TechniqueUnlockAchievementEventWrite> {
    return PartialTechniqueUnlockAchievementEventWriteSchema.parse(data)
  }
}
