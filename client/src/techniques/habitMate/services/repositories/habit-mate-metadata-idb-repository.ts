import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import {
  HabitMateMetadataWriteSchema,
  PartialHabitMateMetadataWriteSchema,
  type HabitMateMetadataRead,
  type HabitMateMetadataWrite,
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
      users: uid,
      techniquesMetadata: 'habitMate',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: HabitMateMetadataWrite
  ): HabitMateMetadataWrite {
    return HabitMateMetadataWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<HabitMateMetadataWrite>
  ): Partial<HabitMateMetadataWrite> {
    return PartialHabitMateMetadataWriteSchema.parse(data)
  }
}
