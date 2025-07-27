import { camelToKebab } from '../../functions/path-helper'
import { TechniqueIdSchema } from '../../types/data/technique-id-schema'
import type { TechniqueId } from '../../types/data/technique-id-types'

type TechniquePath = {
  [K in TechniqueId]: string
}

export const techniquePath: TechniquePath = Object.values(
  TechniqueIdSchema.enum
).reduce((acc, key) => {
  const kebabCaseKey = camelToKebab(key)
  acc[key] = kebabCaseKey
  return acc
}, {} as TechniquePath)
