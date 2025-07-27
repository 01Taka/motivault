import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  PartialTechniqueMetadataBaseWriteSchema,
  TechniqueMetadataBaseSchema,
  type TechniqueMetadataBaseRead,
  type TechniqueMetadataBaseWrite,
} from '../../documents/technique-metadata-base-document'

export class TechniqueMetadataBaseIDBRepository extends IndexedDBService<
  TechniqueMetadataBaseRead,
  TechniqueMetadataBaseWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques'], { users: uid })
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
