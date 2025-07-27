import { useCallback, useMemo } from 'react'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { initializeMetadataRepositoryIfNeed } from '../functions/technique-metadata-crud'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type { TechniqueMetadataBaseWrite } from '../documents/technique-metadata-base-document'
import type { Version } from '../../../../types/utils/services/version-types'
import { useTechniqueMetadataDataStore } from '../stores/useTechniqueMetadataDataStore'
import { techniquesStaticInfoById } from '../../functions/constantsHelper/technique-data-helper'
import type { FullTechniqueData } from '../../types/technique-types'
import { calculateLevelInfo } from '../../../level/functions/level-utils'

const useTechniqueMetadataCrudHandler = () => {
  const { metadata, idbMetadata } = useTechniqueMetadataDataStore()
  const asyncKeys = ['initializeMetadata'] as const
  const { callAsyncFunction, logError } = useMultipleAsyncHandler(asyncKeys)
  const initializeMetadata = useCallback(
    (techniqueId: TechniqueId, techniqueVersion: Version) => {
      if (!idbMetadata) {
        logError('initializeMetadata', '初期化されていません')
        return
      }
      const metadata: TechniqueMetadataBaseWrite = {
        techniqueVersion,
        installedAt: Date.now(),
        lastUsedAt: Date.now(),
        totalGainedExp: 0,
        unlockedAchievementIds: [],
        isVisible: true,
      }
      callAsyncFunction(
        'initializeMetadata',
        initializeMetadataRepositoryIfNeed,
        [idbMetadata, techniqueId, metadata]
      )
    },
    [idbMetadata, callAsyncFunction]
  )
  // Type predicate to assert that a value is not undefined
  function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined
  }

  const fullTechniquesData: FullTechniqueData[] = useMemo(() => {
    return metadata
      .map((data) => {
        if (data.docId in techniquesStaticInfoById) {
          return {
            ...data,
            ...techniquesStaticInfoById[data.docId],
            ...calculateLevelInfo(data.totalGainedExp),
          }
        }
        return undefined
      })
      .filter(isDefined)
  }, [metadata])

  return { fullTechniquesData, initializeMetadata }
}

export default useTechniqueMetadataCrudHandler
