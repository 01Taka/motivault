import type { UserWrite } from '../documents/user-document'
import type { UserRepository } from '../repositories/repositories'

export const createNewUser = async (
  userRepo: UserRepository,
  data: UserWrite
) => {
  const user = await userRepo.read([])
  if (user) {
    console.error(`User ${user.docId} is exist.`)
  }
  return await userRepo.create(data)
}
