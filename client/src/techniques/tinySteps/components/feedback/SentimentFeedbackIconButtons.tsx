import React from 'react'
import SentimentIcon from './SentimentIcon'
import type { TinyStepsMoodFeedback } from '../../types/goal-types'

interface SentimentFeedbackIconButtonsProps {
  mood: TinyStepsMoodFeedback | ''
  onChangeMood: (mood: TinyStepsMoodFeedback) => void
}

const SentimentFeedbackIconButtons: React.FC<
  SentimentFeedbackIconButtonsProps
> = ({ mood, onChangeMood }) => {
  return (
    <div>
      <SentimentIcon mood="good" selectedMood={mood} onSelect={onChangeMood} />
      <SentimentIcon
        mood="neutral"
        selectedMood={mood}
        onSelect={onChangeMood}
      />
      <SentimentIcon mood="bad" selectedMood={mood} onSelect={onChangeMood} />
    </div>
  )
}

export default SentimentFeedbackIconButtons
