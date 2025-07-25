import { z } from 'zod'
import type { VersionSchema } from './version-schema'

// スキーマからTypeScriptの型を推論
export type Version = z.infer<typeof VersionSchema>
