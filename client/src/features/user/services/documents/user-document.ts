import z from 'zod'
import { ISODateSchema } from '../../../../types/utils/datetime-schema'
import { GenderSchema } from '../../../../types/utils/services/gender-schema'
import { EmailSchema } from '../../../../types/utils/services/email-schema'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

export const UserSchema = z.object({
  displayName: z.string().min(1, 'Display name cannot be empty.'),
  birthdate: ISODateSchema,
  gender: GenderSchema,
  email: EmailSchema,
})

export const UserReadSchema = UserSchema.extend(DocumentReadSchema.shape)
export const UserWriteSchema = UserSchema.extend(DocumentWriteSchema.shape)

export const PartialUserReadSchema = UserReadSchema.partial()
export const PartialUserWriteSchema = UserWriteSchema.partial()

export type UserRead = z.infer<typeof UserReadSchema>
export type UserWrite = z.infer<typeof UserWriteSchema>
