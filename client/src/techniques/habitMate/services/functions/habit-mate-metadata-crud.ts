import type { HabitMateMetadataWrite } from '../documents/habit-mate-metadata-document'
import type { HabitMateMetadataRepository } from '../repositories/habit-mate-repositories'

export const createMetadataIfNeed = async (
  repo: HabitMateMetadataRepository,
  data: HabitMateMetadataWrite
) => {
  const metadata = await repo.read([])
  if (!metadata) {
    return await repo.create(data, [])
  }
  return null
}
