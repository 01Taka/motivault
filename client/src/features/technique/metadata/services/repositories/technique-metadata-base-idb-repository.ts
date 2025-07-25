import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  PartialTechniqueMetadataBaseWriteSchema,
  TechniqueMetadataBaseSchema,
  type TechniqueMetadataBaseRead,
  type TechniqueMetadataBaseWrite,
} from '../documents/user-technique-metadata-base-document'

/**
 * documentPath: [uid, habitId]
 */
export class TechniqueMetadataBaseIDBRepository extends IndexedDBService<
  TechniqueMetadataBaseRead,
  TechniqueMetadataBaseWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniquesMetadata'])
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(
    data: TechniqueMetadataBaseWrite
  ): TechniqueMetadataBaseWrite {
    return TechniqueMetadataBaseSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TechniqueMetadataBaseWrite>
  ): Partial<TechniqueMetadataBaseWrite> {
    return PartialTechniqueMetadataBaseWriteSchema.parse(data)
  }
}
