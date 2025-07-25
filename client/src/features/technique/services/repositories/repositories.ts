import type { IDBService } from '../../../../types/db/db-service-interface'
import type {
  TechniqueExpGainEventRead,
  TechniqueExpGainEventWrite,
} from '../documents/session/exp-gain-event-document'
import type {
  TechniqueSessionRead,
  TechniqueSessionWrite,
} from '../documents/session/technique-session-document'
import type {
  TechniqueUnlockAchievementEventRead,
  TechniqueUnlockAchievementEventWrite,
} from '../documents/session/unlock-achievement-event-document'
import type {
  TechniqueMetadataBaseRead,
  TechniqueMetadataBaseWrite,
} from '../documents/technique-metadata-base-document'

export type TechniqueMetadataBaseRepository = IDBService<
  TechniqueMetadataBaseRead,
  TechniqueMetadataBaseWrite
>

export type TechniqueSessionRepository = IDBService<
  TechniqueSessionRead,
  TechniqueSessionWrite
>

export type TechniqueExpGainEventRepository = IDBService<
  TechniqueExpGainEventRead,
  TechniqueExpGainEventWrite
>

export type TechniqueUnlockAchievementsEventRepository = IDBService<
  TechniqueUnlockAchievementEventRead,
  TechniqueUnlockAchievementEventWrite
>
