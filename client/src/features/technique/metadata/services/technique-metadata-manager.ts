// import type FirestoreService from '../../../../firebase/firestore/handler/firestore-service'
// import type { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
// import type {
//   BaseDocumentRead,
//   BaseDocumentWrite,
// } from '../../../../types/db/db-service-document-types'
// import type { IDBService } from '../../../../types/db/db-service-interface'
// import type {
//   RepositoryArgsBaseMap,
//   RepositoryType,
// } from '../../../../types/db/db-service-repository-types'
// import { TechniqueSchema } from '../../types/data/technique-id-schema'
// import type { TechniqueId } from '../../types/data/technique-id-types'
// import { TechniqueMetadataBaseFirestoreRepository } from './repositories/technique-metadata-base-firestore-repository'
// import { TechniqueMetadataBaseIDBRepository } from './repositories/idb/technique-metadata-base-idb-repository'

// const UniqueMetadataIndexedDBService: Record<
//   string,
//   IndexedDBService<BaseDocumentRead, BaseDocumentWrite>
// > = {}

// const UniqueMetadataFirestoreService: Record<
//   string,
//   FirestoreService<BaseDocumentRead, BaseDocumentWrite>
// > = {}

// // <
// //   T extends new (uid: string) => IDBService<any, any>,
// //   R extends TechniqueMetadataBaseRead,
// //   W extends TechniqueMetadataBaseWrite,
// // >

// const getTechniqueMetadataDBService = <T extends RepositoryType>(
//   techniqueId: TechniqueId,
//   repositoryType: T
// ): new (...args: RepositoryArgsBaseMap[T]) => IDBService<any, any> => {
//   TechniqueSchema.parse(techniqueId)

//   if (repositoryType === 'indexedDB') {
//     return TechniqueMetadataBaseIDBRepository
//   } else {
//     return TechniqueMetadataBaseFirestoreRepository
//   }
// }

// // if (
// //   dbServiceType === 'indexedDB' &&
// //   techniqueId in UniqueMetadataIndexedDBService
// // ) {
// //   return UniqueMetadataIndexedDBService[techniqueId]
// // }
// // if (
// //   dbServiceType === 'firestore' &&
// //   techniqueId in UniqueMetadataFirestoreService
// // ) {
// //   return UniqueMetadataFirestoreService[techniqueId]
// // }
