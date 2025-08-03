import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  type TimeBlockingTemplateLayerRead,
  type TimeBlockingTemplateLayerWrite,
  TimeBlockingTemplateLayerWriteSchema,
  PartialTimeBlockingTemplateLayerWriteSchema,
} from '../../documents/time-blocking-template-layer-document'

export class TimeBlockingTemplateLayerIDBRepository extends IndexedDBService<
  TimeBlockingTemplateLayerRead,
  TimeBlockingTemplateLayerWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'templateLayers'], {
      users: uid,
      techniques: 'timeBlocking',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TimeBlockingTemplateLayerWrite
  ): TimeBlockingTemplateLayerWrite {
    return TimeBlockingTemplateLayerWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TimeBlockingTemplateLayerWrite>
  ): Partial<TimeBlockingTemplateLayerWrite> {
    return PartialTimeBlockingTemplateLayerWriteSchema.parse(data)
  }
}
