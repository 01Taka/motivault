import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  PartialTechniqueSessionWriteSchema,
  TechniqueSessionSchema,
  type TechniqueSessionRead,
  type TechniqueSessionWrite,
} from '../../documents/session/technique-session-document'

/**
 * documentPath: [techniqueId, sessionId]
 */
export class TechniqueSessionIDBRepository extends IndexedDBService<
  TechniqueSessionRead,
  TechniqueSessionWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'sessions'], { users: uid })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TechniqueSessionWrite
  ): TechniqueSessionWrite {
    return TechniqueSessionSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TechniqueSessionWrite>
  ): Partial<TechniqueSessionWrite> {
    return PartialTechniqueSessionWriteSchema.parse(data)
  }
}
