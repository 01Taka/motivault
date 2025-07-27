import type { Version } from '../../../../types/utils/services/version-types'
import type { TechniqueId } from './technique-id-types'

export interface TechniqueStaticInfo {
  docId: TechniqueId
  version: Version
  title: string
  officialName: string
  tags: string[]
  imageUrl: string
  slogan: string
  overview: string
  details: TechniqueDetail
}

interface TechniqueDetailTextParagraph {
  type: 'text'
  contents: string
}

interface TechniqueDetailUnorderedListParagraph {
  type: 'ul'
  contents: string[]
}

interface TechniqueDetailOrderedListParagraph {
  type: 'ol'
  contents: string[]
}

type TechniqueDetailParagraphHeader =
  | {
      isHeaderId: false
      header: string
    }
  | {
      isHeaderId: true
      headerId: string
    }

export type TechniqueDetailParagraph = (
  | TechniqueDetailTextParagraph
  | TechniqueDetailUnorderedListParagraph
  | TechniqueDetailOrderedListParagraph
) &
  TechniqueDetailParagraphHeader

interface TechniqueDetail {
  paragraph: TechniqueDetailParagraph[]
}
