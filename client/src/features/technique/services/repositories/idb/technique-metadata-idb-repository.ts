import { IndexedDBService } from '../../../../../indexedDB/indexed-db-service'
import {
  MetadataWriteSchema,
  PartialMetadataWriteSchema,
  type TechniqueMetadataRead,
  type TechniqueMetadataWrite,
} from '../../documents/metadata/technique-metadata-schema'

export class TechniqueMetadataIDBRepository extends IndexedDBService<
  TechniqueMetadataRead,
  TechniqueMetadataWrite
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
    data: TechniqueMetadataWrite
  ): TechniqueMetadataWrite {
    return MetadataWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TechniqueMetadataWrite>
  ): Partial<TechniqueMetadataWrite> {
    return PartialMetadataWriteSchema.parse(data)
  }
}
