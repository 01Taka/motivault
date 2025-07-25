import type { Firestore } from 'firebase/firestore'
import FirestoreService from '../../../../../firebase/firestore/handler/firestore-service'
import {
  PartialTechniqueMetadataBaseWriteSchema,
  TechniqueMetadataBaseSchema,
  type TechniqueMetadataBaseRead,
  type TechniqueMetadataBaseWrite,
} from '../documents/technique-metadata-base-document'

/**
 * documentPath: [uid, habitId]
 */
export class TechniqueMetadataBaseFirestoreRepository extends FirestoreService<
  TechniqueMetadataBaseRead,
  TechniqueMetadataBaseWrite
> {
  private uid: string

  constructor(firestore: Firestore, uid: string) {
    super(firestore, ['users', 'techniquesMetadata'], { users: uid })
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
