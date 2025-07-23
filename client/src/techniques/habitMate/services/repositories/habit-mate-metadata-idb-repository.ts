import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  HabitMateMetadataRead,
  HabitMateMetadataWrite,
} from '../documents/habit-mate-metadata-document'

/**
 * documentPath: [uid]
 */
export class HabitMateMetadataIDBRepository extends IndexedDBService<
  HabitMateMetadataRead,
  HabitMateMetadataWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniquesMetadata'], {
      techniquesMetadata: 'habitMate',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends HabitMateMetadataWrite | Partial<HabitMateMetadataWrite>,
  >(
    data: T
  ): T extends HabitMateMetadataWrite
    ? HabitMateMetadataWrite
    : Partial<HabitMateMetadataWrite> {
    const { maxConcurrentHabits, activeHabitIds } = data

    return {
      maxConcurrentHabits,
      activeHabitIds,
    } as T extends HabitMateMetadataWrite
      ? HabitMateMetadataWrite
      : Partial<HabitMateMetadataWrite>
  }
}
