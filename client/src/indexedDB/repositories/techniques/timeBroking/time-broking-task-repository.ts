import type {
  TimeBlockingTaskRead,
  TimeBlockingTaskWrite,
} from '../../../../techniques/timeBlocking/types/documents/task-documents'
import { IndexedDBService } from '../../../indexed-db-service'

export class TimeBlockingTaskIDBRepository extends IndexedDBService<
  TimeBlockingTaskRead,
  TimeBlockingTaskWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['techniques', 'tasks'], { techniques: 'timeBroking' })
    this.uid = uid
  }

  protected getUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends TimeBlockingTaskWrite | Partial<TimeBlockingTaskWrite>,
  >(data: T): T {
    const { id, title, startTime, duration, tagId, completed, repeat } = data
    return {
      id,
      title,
      startTime,
      duration,
      tagId,
      completed,
      repeat,
    } as any
  }
}
