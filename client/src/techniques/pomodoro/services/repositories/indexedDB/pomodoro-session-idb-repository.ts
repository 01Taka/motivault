import { TechniqueIdSchema } from '../../../../../features/technique/types/data/technique-id-schema'
import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  PartialPomodoroSessionWriteSchema,
  PomodoroSessionWriteSchema,
  type PomodoroSessionRead,
  type PomodoroSessionWrite,
} from '../../documents/pomodoro-session-document'

/**
 * documentPath: [uid, habitId]
 */
export class PomodoroSessionIDBRepository extends IndexedDBService<
  PomodoroSessionRead,
  PomodoroSessionWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'sessions'], {
      users: uid,
      techniques: TechniqueIdSchema.enum.pomodoro,
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(data: PomodoroSessionWrite): PomodoroSessionWrite {
    return PomodoroSessionWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<PomodoroSessionWrite>
  ): Partial<PomodoroSessionWrite> {
    return PartialPomodoroSessionWriteSchema.parse(data)
  }
}
