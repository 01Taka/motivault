import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  type TimeBlockingBlockSettingRead,
  type TimeBlockingBlockSettingWrite,
  TimeBlockingBlockSettingWriteSchema,
  PartialTimeBlockingBlockSettingWriteSchema,
} from '../../documents/time-blocking-block-setting-document'

export class TimeBlockingBlockSettingIDBRepository extends IndexedDBService<
  TimeBlockingBlockSettingRead,
  TimeBlockingBlockSettingWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'settings'], {
      users: uid,
      techniques: 'timeBlocking',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TimeBlockingBlockSettingWrite
  ): TimeBlockingBlockSettingWrite {
    return TimeBlockingBlockSettingWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TimeBlockingBlockSettingWrite>
  ): Partial<TimeBlockingBlockSettingWrite> {
    return PartialTimeBlockingBlockSettingWriteSchema.parse(data)
  }
}
