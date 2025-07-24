import z from 'zod'
import { ISODateSchema } from '../../../../types/utils/datetime-schema'
import { GenderSchema } from '../../../../types/utils/services/gender-schema'
import { EmailSchema } from '../../../../types/utils/services/email-schema'
import {
  documentReadSchema,
  documentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

export const UserSchema = z.object({
  displayName: z.string().min(1, 'Display name cannot be empty.'),
  birthdate: ISODateSchema,
  gender: GenderSchema,
  email: EmailSchema,
})

export const UserReadSchema = UserSchema.extend(documentReadSchema.shape)

export const UserWriteSchema = UserSchema.extend(documentWriteSchema.shape)

export type UserRead = z.infer<typeof UserReadSchema>
export type UserWrite = z.infer<typeof UserWriteSchema>
