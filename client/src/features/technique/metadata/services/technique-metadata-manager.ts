import { db } from '../../../../firebase/firebase'
import type FirestoreService from '../../../../firebase/firestore/handler/firestore-service'
import type { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../../../types/db/db-service-document-types'
import type { IDBService } from '../../../../types/db/db-service-interface'
import { TechniqueSchema } from '../../types/data/technique-id-schema'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type {
  TechniqueMetadataBaseRead,
  TechniqueMetadataBaseWrite,
} from './documents/user-technique-metadata-base-document'
import { TechniqueMetadataBaseFirestoreRepository } from './repositories/technique-metadata-base-firestore-repository'
import { TechniqueMetadataBaseIDBRepository } from './repositories/technique-metadata-base-idb-repository'

const UniqueMetadataIndexedDBService: Record<
  string,
  IndexedDBService<BaseDocumentRead, BaseDocumentWrite>
> = {}

const UniqueMetadataFirestoreService: Record<
  string,
  FirestoreService<BaseDocumentRead, BaseDocumentWrite>
> = {}

// <
//   T extends new (uid: string) => IDBService<any, any>,
//   R extends TechniqueMetadataBaseRead,
//   W extends TechniqueMetadataBaseWrite,
// >

const getTechniqueMetadataDBService = (
  techniqueId: TechniqueId,
  dbServiceType: 'indexedDB' | 'firestore'
): new (uid: string) => IDBService<any, any> => {
  TechniqueSchema.parse(techniqueId)

  if (dbServiceType === 'indexedDB') {
    return TechniqueMetadataBaseIDBRepository
  } else {
    return TechniqueMetadataBaseFirestoreRepository
  }
}

// if (
//   dbServiceType === 'indexedDB' &&
//   techniqueId in UniqueMetadataIndexedDBService
// ) {
//   return UniqueMetadataIndexedDBService[techniqueId]
// }
// if (
//   dbServiceType === 'firestore' &&
//   techniqueId in UniqueMetadataFirestoreService
// ) {
//   return UniqueMetadataFirestoreService[techniqueId]
// }
