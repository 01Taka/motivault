import { useMemo } from 'react'
import { calculateLevelInfo } from '../../level/functions/level-utils'
import { techniquesStaticInfoMap } from '../functions/constantsHelper/technique-data-helper'
import type { FullTechniqueData } from '../types/technique-types'
import { useTechniqueMetadataDataStore } from '../services/stores/useTechniqueMetadataDataStore'
import { getAchievementsStaticInfoByIds } from '../../achievement/functions/constantsHelper/data/achievement-static-info-helper'

const useFullTechniqueData = () => {
  const { metadata } = useTechniqueMetadataDataStore()
  function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined
  }

  const fullTechniquesData: FullTechniqueData[] = useMemo(() => {
    return metadata
      .map((data) => {
        if (data.docId in techniquesStaticInfoMap) {
          return {
            ...data,
            ...techniquesStaticInfoMap[data.docId],
            ...calculateLevelInfo(data.totalGainedExp),
            unlockedAchievementsStaticInfo: getAchievementsStaticInfoByIds([
              ...data.unlockedAchievementIds,
            ]),
          }
        }
        return undefined
      })
      .filter(isDefined)
  }, [metadata])

  return fullTechniquesData
}

export default useFullTechniqueData
