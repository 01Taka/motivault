import React from 'react'
import { IconButton, type SxProps } from '@mui/material'
import SentimentVerySatisfied from '@mui/icons-material/SentimentVerySatisfied'
import SentimentNeutral from '@mui/icons-material/SentimentNeutral'
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied'
import type { TinyStepsMoodFeedback } from '../../types/goal-types'
import { moodColors } from '../../constants/mood-constants'

interface SentimentIconProps {
  mood: TinyStepsMoodFeedback
  selectedMood: string
  onSelect: (mood: TinyStepsMoodFeedback) => void
}

const iconSx: SxProps = {
  fontSize: '3rem',
}

const SentimentIcon: React.FC<SentimentIconProps> = ({
  mood,
  selectedMood,
  onSelect,
}) => {
  const isSelected = selectedMood === mood
  return (
    <IconButton
      onClick={() => onSelect(mood)}
      sx={{
        color: isSelected && moodColors[mood] ? moodColors[mood].color : 'gray',
      }}
    >
      {mood === 'good' && <SentimentVerySatisfied sx={iconSx} />}
      {mood === 'neutral' && <SentimentNeutral sx={iconSx} />}
      {mood === 'bad' && <SentimentVeryDissatisfied sx={iconSx} />}
    </IconButton>
  )
}

export default SentimentIcon
