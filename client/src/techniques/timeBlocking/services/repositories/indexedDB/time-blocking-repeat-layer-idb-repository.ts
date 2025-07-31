import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  type TimeBlockingRepeatLayerRead,
  type TimeBlockingRepeatLayerWrite,
  TimeBlockingRepeatLayerWriteSchema,
  PartialTimeBlockingRepeatLayerWriteSchema,
} from '../../documents/time-blocking-repeat-layer-document'

export class TimeBlockingRepeatLayerIDBRepository extends IndexedDBService<
  TimeBlockingRepeatLayerRead,
  TimeBlockingRepeatLayerWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'repeatLayers'], {
      users: uid,
      techniques: 'timeBlocking',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TimeBlockingRepeatLayerWrite
  ): TimeBlockingRepeatLayerWrite {
    return TimeBlockingRepeatLayerWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TimeBlockingRepeatLayerWrite>
  ): Partial<TimeBlockingRepeatLayerWrite> {
    return PartialTimeBlockingRepeatLayerWriteSchema.parse(data)
  }
}
