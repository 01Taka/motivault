import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import {
  HabitMateHabitWriteSchema,
  PartialHabitMateHabitWriteSchema,
  type HabitMateHabitRead,
  type HabitMateHabitWrite,
} from '../documents/habit-mate-habit-document'

/**
 * documentPath: [uid, habitId]
 */
export class HabitMateHabitIDBRepository extends IndexedDBService<
  HabitMateHabitRead,
  HabitMateHabitWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'habits'], {
      techniques: 'habitMate',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(data: HabitMateHabitWrite): HabitMateHabitWrite {
    return HabitMateHabitWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<HabitMateHabitWrite>
  ): Partial<HabitMateHabitWrite> {
    return PartialHabitMateHabitWriteSchema.parse(data)
  }
}
