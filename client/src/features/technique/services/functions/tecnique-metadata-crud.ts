import type { DBWriteTarget } from '../../../../types/db/db-service-interface'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type {
  TechniqueMetadataBaseWrite,
  TechniqueMetadataBaseRead,
} from '../documents/technique-metadata-base-document'
import type { TechniqueMetadataBaseRepository } from '../repositories/repositories'

export const initializeMetadataRepositoryIfNeed = async (
  metadataRepo: TechniqueMetadataBaseRepository,
  techniqueId: TechniqueId,
  metadata: TechniqueMetadataBaseWrite
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
  metadataRepo: TechniqueMetadataBaseRepository
) => {
  return await metadataRepo.getAll()
}
