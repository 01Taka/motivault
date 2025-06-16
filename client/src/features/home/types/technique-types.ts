export interface TechniqueReference {
  label: string
  url: string
}

export interface Technique {
  id: string
  title: string
  officialName: string
  category: string
  imageUrl: string
  description: string
  benefits: string
  reason: string
  steps: string[]
  references: TechniqueReference[]
}
