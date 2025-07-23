import { z } from 'zod'

// メタデータ（作成日時など）の共通スキーマ
const baseMetadataSchema = z.object({
  createdById: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().optional(),
  isActive: z.boolean(),
})

// ドキュメント読み取り時の共通スキーマ（メタデータを含む）
export const documentReadSchema = baseMetadataSchema.extend({
  docId: z.string(),
  path: z.string(),
  parentId: z.string().nullable(),
})

export const documentWriteSchema = z.object({
  createdById: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  deletedAt: z.number().optional(),
})
