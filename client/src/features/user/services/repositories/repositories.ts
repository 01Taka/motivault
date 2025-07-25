import type { IDBService } from '../../../../types/db/db-service-interface'
import type { UserRead, UserWrite } from '../documents/user-document'

export type UserRepository = IDBService<UserRead, UserWrite>
