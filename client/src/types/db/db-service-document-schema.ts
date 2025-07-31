import { z } from 'zod'
import { FirestoreDocIdSchema } from '../firebase/firestore/firestore-id-schema'
import { UnixTimestampSchema } from '../utils/datetime-schema'

// メタデータ（作成日時など）の共通スキーマ
export const BaseMetadataSchema = z.object({
  createdById: FirestoreDocIdSchema,
  createdAt: UnixTimestampSchema,
  updatedAt: UnixTimestampSchema,
  deletedAt: UnixTimestampSchema.optional(),
  isActive: z.boolean(),
})

// ドキュメント読み取り時の共通スキーマ（メタデータを含む）
export const DocumentReadSchema = BaseMetadataSchema.extend({
  docId: FirestoreDocIdSchema,
  path: z.string(),
  parentId: FirestoreDocIdSchema.nullable(),
})

export const DocumentWriteSchema = z.object({
  createdById: FirestoreDocIdSchema.optional(),
  createdAt: UnixTimestampSchema.optional(),
  updatedAt: UnixTimestampSchema.optional(),
  deletedAt: UnixTimestampSchema.optional(),
})
