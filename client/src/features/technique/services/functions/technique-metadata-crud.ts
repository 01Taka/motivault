import type { DBWriteTarget } from '../../../../types/db/db-service-interface'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type { TechniqueMetadataBaseRead } from '../documents/metadata/technique-metadata-base-document'
import type { TechniqueMetadataWrite } from '../documents/metadata/technique-metadata-schema'
import type { TechniqueMetadataRepository } from '../repositories/repositories'

export const initializeMetadataRepositoryIfNeed = async (
  metadataRepo: TechniqueMetadataRepository,
  techniqueId: TechniqueId,
  metadata: TechniqueMetadataWrite
): Promise<{
  isInitialized: boolean
  result: DBWriteTarget | TechniqueMetadataBaseRead
}> => {
  const data = await metadataRepo.read([techniqueId])
  if (!data) {
    const result = await metadataRepo.createWithId(metadata, [techniqueId])
    return { isInitialized: true, result }
  }
  return { isInitialized: false, result: data }
}

export const getAllMetadata = async (
  metadataRepo: TechniqueMetadataRepository
) => {
  return await metadataRepo.getAll()
}
