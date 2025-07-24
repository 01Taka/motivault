import { z } from 'zod'
import type { versionSchema } from './version-schema'

// スキーマからTypeScriptの型を推論
export type Version = z.infer<typeof versionSchema>
