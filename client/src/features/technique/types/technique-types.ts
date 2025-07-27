import type { AchievementStaticInfo } from '../../achievement/types/data/achievement-data-types'
import type { TechniqueLevelInfo } from '../../achievements/types/achievement-types'
import type { TechniqueMetadataBaseRead } from '../services/documents/metadata/technique-metadata-base-document'
import type { TechniqueStaticInfo } from './data/technique-static-info-types'

export type FullTechniqueData = TechniqueMetadataBaseRead &
  TechniqueStaticInfo &
  TechniqueLevelInfo & {
    unlockedAchievementsStaticInfo: AchievementStaticInfo[]
  }
