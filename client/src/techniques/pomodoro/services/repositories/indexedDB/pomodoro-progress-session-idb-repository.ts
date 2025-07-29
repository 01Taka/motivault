import { TechniqueIdSchema } from '../../../../../features/technique/types/data/technique-id-schema'
import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import { POMODORO_PROGRESS_SESSION_KEY } from '../../constants/pomodoro-session-constants'
import {
  PartialPomodoroProgressSessionWriteSchema,
  PomodoroProgressSessionWriteSchema,
  type PomodoroProgressSessionRead,
  type PomodoroProgressSessionWrite,
} from '../../documents/pomodoro-progress-session-document'

/**
 * documentPath: [uid, habitId]
 */
export class PomodoroProgressSessionIDBRepository extends IndexedDBService<
  PomodoroProgressSessionRead,
  PomodoroProgressSessionWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'localData'], {
      users: uid,
      techniques: TechniqueIdSchema.enum.pomodoro,
      localData: POMODORO_PROGRESS_SESSION_KEY,
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: PomodoroProgressSessionWrite
  ): PomodoroProgressSessionWrite {
    return PomodoroProgressSessionWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<PomodoroProgressSessionWrite>
  ): Partial<PomodoroProgressSessionWrite> {
    return PartialPomodoroProgressSessionWriteSchema.parse(data)
  }
}
