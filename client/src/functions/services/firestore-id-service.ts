import { customAlphabet } from 'nanoid'

export const createFirestoreId = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  20
)
