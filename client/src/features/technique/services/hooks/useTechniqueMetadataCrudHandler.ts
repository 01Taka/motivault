import { useCallback } from 'react'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { initializeMetadataRepositoryIfNeed } from '../functions/technique-metadata-crud'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type { Version } from '../../../../types/utils/services/version-types'
import type { TechniqueMetadataWrite } from '../documents/metadata/technique-metadata-schema'
import { useTechniqueMetadataDataStore } from '../stores/useTechniqueMetadataDataStore'
import type { TechniqueMetadataBaseWrite } from '../documents/metadata/technique-metadata-base-document'

const useTechniqueMetadataCrudHandler = () => {
  const { idbMetadata } = useTechniqueMetadataDataStore()

  const asyncKeys = ['initializeMetadata'] as const
  const { asyncStates, callAsyncFunction, logError } =
    useMultipleAsyncHandler(asyncKeys)

  const initializeMetadata = useCallback(
    (techniqueId: TechniqueId, staticInfoVersion: Version) => {
      if (!idbMetadata) {
        logError('initializeMetadata', '初期化されていません')
        return
      }

      const metadataBase: TechniqueMetadataBaseWrite = {
        techniqueId: techniqueId,
        staticInfoVersionInInstalled: staticInfoVersion,
        installedAt: Date.now(),
        lastUsedAt: Date.now(),
        totalGainedExp: 0,
        unlockedAchievementIds: [],
        isVisible: true,
      }

      let metadata: TechniqueMetadataWrite

      switch (techniqueId) {
        case 'habitMate':
          metadata = {
            ...metadataBase,
            currentHabitLevel: 1,
            activeHabitIds: [],
          }
          break
        default:
          metadata = { ...metadataBase, techniqueId }
          break
      }

      callAsyncFunction(
        'initializeMetadata',
        initializeMetadataRepositoryIfNeed,
        [idbMetadata, techniqueId, metadata]
      )
    },
    [idbMetadata, callAsyncFunction]
  )

  return { asyncStates, initializeMetadata }
}

export default useTechniqueMetadataCrudHandler
