import { TechniqueIdSchema } from '../../../../../features/technique/types/data/technique-id-schema'
import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import { POMODORO_TIMER_STATE_KEY } from '../../constants/pomodoro-session-constants'
import {
  type PomodoroTimerStateRead,
  PomodoroTimerStateWriteSchema,
  PartialPomodoroTimerStateWriteSchema,
  type PomodoroTimerStateWrite,
} from '../../documents/pomodoro-timer-state-document'

/**
 * documentPath: [uid, habitId]
 */
export class PomodoroTimerStateIDBRepository extends IndexedDBService<
  PomodoroTimerStateRead,
  PomodoroTimerStateWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'localData'], {
      users: uid,
      techniques: TechniqueIdSchema.enum.pomodoro,
      localData: POMODORO_TIMER_STATE_KEY,
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: PomodoroTimerStateWrite
  ): PomodoroTimerStateWrite {
    return PomodoroTimerStateWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<PomodoroTimerStateWrite>
  ): Partial<PomodoroTimerStateWrite> {
    return PartialPomodoroTimerStateWriteSchema.parse(data)
  }
}
