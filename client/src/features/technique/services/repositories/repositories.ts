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
  TechniqueMetadataRead,
  TechniqueMetadataWrite,
} from '../documents/metadata/technique-metadata-schema'

export type TechniqueMetadataRepository = IDBService<
  TechniqueMetadataRead,
  TechniqueMetadataWrite
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
