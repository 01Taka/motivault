import type {
  TimeBlockingRead,
  TimeBlockingWrite,
} from '../../../../techniques/timeBlocking/services/documents/time-blocking-document'
import { IndexedDBService } from '../../../indexed-db-service'

export class TimeBlockingIDBRepository extends IndexedDBService<
  TimeBlockingRead,
  TimeBlockingWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques']) //, { techniques: 'timeBroking' }
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  private filterData<T extends TimeBlockingWrite | Partial<TimeBlockingWrite>>(
    data: T
  ): T extends TimeBlockingWrite
    ? TimeBlockingWrite
    : Partial<TimeBlockingWrite> {
    const { tags } = data
    return {
      tags,
    } as T extends TimeBlockingWrite
      ? TimeBlockingWrite
      : Partial<TimeBlockingWrite>
  }

  protected filterWriteData(data: TimeBlockingWrite): TimeBlockingWrite {
    return this.filterData(data)
  }

  protected filterPartialWriteData(
    data: Partial<TimeBlockingWrite>
  ): Partial<TimeBlockingWrite> {
    return this.filterData(data)
  }
}
