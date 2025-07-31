import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  type TimeBlockingPlanRead,
  type TimeBlockingPlanWrite,
  TimeBlockingPlanWriteSchema,
  PartialTimeBlockingPlanWriteSchema,
} from '../../documents/time-blocking-plan-document'

export class TimeBlockingPlanIDBRepository extends IndexedDBService<
  TimeBlockingPlanRead,
  TimeBlockingPlanWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'plans'], {
      users: uid,
      techniques: 'timeBlocking',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TimeBlockingPlanWrite
  ): TimeBlockingPlanWrite {
    return TimeBlockingPlanWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TimeBlockingPlanWrite>
  ): Partial<TimeBlockingPlanWrite> {
    return PartialTimeBlockingPlanWriteSchema.parse(data)
  }
}
