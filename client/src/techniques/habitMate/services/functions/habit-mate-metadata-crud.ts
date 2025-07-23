import type { HabitMateMetadataWrite } from '../documents/habit-mate-metadata-document'
import type { HabitMateMetadataIDBRepository } from '../repositories/habit-mate-metadata-idb-repository'

export const createMetadataIfNeed = async (
  repo: HabitMateMetadataIDBRepository,
  uid: string,
  data: HabitMateMetadataWrite
) => {
  const metadata = await repo.read([uid])
  if (!metadata) {
    return await repo.create(data, [uid])
  }
  return null
}
