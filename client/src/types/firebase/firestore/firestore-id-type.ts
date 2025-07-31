import type z from 'zod'
import type { FirestoreDocIdSchema } from './firestore-id-schema'

export type FirestoreDocId = z.infer<typeof FirestoreDocIdSchema>
