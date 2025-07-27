import z from 'zod'
import type {
  TechniqueId,
  TechniquePathId,
} from '../types/data/technique-id-types'
import { TechniqueIdSchema } from '../types/data/technique-id-schema'

// Function to convert camelCase to kebab-case
export function camelToKebab(camelCaseString: string): string {
  return camelCaseString
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
}

// Function to convert kebab-case to camelCase
// This function relies on a known mapping, or a generic regex approach.
// For known enums, a map is safer to ensure valid TechniqueId.
export function kebabToCamel(kebabCaseString: string): string {
  return kebabCaseString.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

// Define a schema for the kebab-case IDs as they appear in the URL path
// This is generated directly from your camelCase enum for consistency
export const TechniquePathIdSchema = z.enum(
  TechniqueIdSchema.options.map((id) => camelToKebab(id)) as [
    string,
    ...string[],
  ]
)

// Type for the kebab-case ID directly from the path

// Function to get the full path for a given TechniqueId
export const getTechniquePathById = (techniqueId: TechniqueId) => {
  const kebabId = camelToKebab(techniqueId)
  return `/techniques/${kebabId}` // Assuming the base path is /techniques/
}

// Function to get the TechniqueId from a kebab-case path string
export const getTechniqueIdFromPathId = (
  pathId: TechniquePathId
): TechniqueId => {
  // We can confidently cast here because TechniquePathIdSchema is derived from TechniqueIdSchema
  // and we're converting back using the kebabToCamel logic.
  return kebabToCamel(pathId) as TechniqueId
}

// A more robust way to handle this with Zod's transform for direct parsing
// This schema takes a kebab-case string and transforms it into a validated camelCase TechniqueId
export const TransformedTechniqueIdSchema = TechniquePathIdSchema.transform(
  (kebabId): TechniqueId => {
    // Use the kebabToCamel function to convert, and then validate against the original schema
    const camelId = kebabToCamel(kebabId)
    const validationResult = TechniqueIdSchema.safeParse(camelId)
    if (!validationResult.success) {
      // This should ideally not happen if enums and functions are consistent
      throw new Error(
        `Transformed ID "${camelId}" is not a valid TechniqueId. Zod error: ${validationResult.error.message}`
      )
    }
    return validationResult.data
  }
)
