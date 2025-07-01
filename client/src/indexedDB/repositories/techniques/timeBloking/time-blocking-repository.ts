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

  protected getUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends TimeBlockingWrite | Partial<TimeBlockingWrite>,
  >(data: T): T {
    const { tags } = data
    return {
      tags,
    } as any
  }
}
