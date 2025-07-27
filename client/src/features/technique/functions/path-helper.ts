import type { TechniqueId } from '../types/data/technique-id-types'

export function camelToKebab(camelCaseString: string): string {
  return camelCaseString
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export const getTechniquePathById = (techniqueId: TechniqueId) => {
  return camelToKebab(techniqueId)
}
