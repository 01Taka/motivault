import { IndexedDBService } from '../../../../../../indexedDB/indexed-db-service'
import {
  PartialTechniqueExpGainEventWriteSchema,
  TechniqueExpGainEventSchema,
  type TechniqueExpGainEventRead,
  type TechniqueExpGainEventWrite,
} from '../../documents/session/exp-gain-event-document'

/**
 * documentPath: [techniqueId, sessionId]
 */
export class ExpGainEventIDBRepository extends IndexedDBService<
  TechniqueExpGainEventRead,
  TechniqueExpGainEventWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniquesMetadata', 'gainExpEvents'], { users: uid })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TechniqueExpGainEventWrite
  ): TechniqueExpGainEventWrite {
    return TechniqueExpGainEventSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TechniqueExpGainEventWrite>
  ): Partial<TechniqueExpGainEventWrite> {
    return PartialTechniqueExpGainEventWriteSchema.parse(data)
  }
}
