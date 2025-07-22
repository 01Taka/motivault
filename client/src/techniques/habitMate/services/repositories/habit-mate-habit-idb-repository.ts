import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  HabitMateHabitRead,
  HabitMateHabitWrite,
} from '../documents/habit-mate-habit-document'

/**
 * documentPath: [uid, taskId]
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

  protected filterWriteData<
    T extends HabitMateHabitWrite | Partial<HabitMateHabitWrite>,
  >(
    data: T
  ): T extends HabitMateHabitWrite
    ? HabitMateHabitWrite
    : Partial<HabitMateHabitWrite> {
    const {
      level,
      habit,
      isExecutable,
      timing,
      startedAt,
      workedDate,
      isFailed,
      status,
      resetCount,
    } = data

    return {
      level,
      habit,
      isExecutable,
      timing,
      startedAt,
      workedDate,
      isFailed,
      status,
      resetCount,
    } as T extends HabitMateHabitWrite
      ? HabitMateHabitWrite
      : Partial<HabitMateHabitWrite>
  }
}
