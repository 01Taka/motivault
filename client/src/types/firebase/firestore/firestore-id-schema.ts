import z from 'zod'

const firestoreDocIdRegex = /^[a-zA-Z0-9_-]{1,2000}$/

export const FirestoreDocIdSchema = z.string().regex(firestoreDocIdRegex, {
  message: 'Invalid Firestore document ID',
})
