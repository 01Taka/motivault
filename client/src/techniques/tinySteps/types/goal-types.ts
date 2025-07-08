export interface TinyStepsGoal {
  id: number
  text: string
  tagId: number
  level: 1 | 2 | 3
}

export interface TinyStepsTag {
  title: string
  color: string
  backgroundColor: string
}

export type TinyStepsMoodFeedback = 'good' | 'neutral' | 'bad'
