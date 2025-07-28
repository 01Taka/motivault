import React, { useState } from 'react'
import { Box, Stack } from '@mui/material'
import GoalCard from './GoalCard'
import { tags, goals as tinyStepGoals } from '../constants/goals-constants'
import type { TinyStepsGoal } from '../types/goal-types'
import { getRandomElement } from '../functions/utils'
import usePersistentTimer from '../../../hooks/timer/usePersistentTimer'
import { MINUTES_IN_MS } from '../../../constants/datetime-constants'
import { usePersistedState } from '../../../hooks/utils/usePersistedState'
import Popup from '../../../components/utils/Popup'
import FeedbackForm from './feedback/FeedbackForm'
import DrawButton from './buttons/DrawButton'
import EndButton from './buttons/EndButton'
import StartButton from './buttons/StartButton'

interface TinyStepsProps {}

const MAX_REMAINING_REDRAW_COUNT = 3

const TinySteps: React.FC<TinyStepsProps> = ({}) => {
  const [goal, setGoal] = useState<TinyStepsGoal | null>(null)

  const [confirmedGoal, setConfirmedGoal] =
    usePersistedState<TinyStepsGoal | null>({
      key: 'tinyStepsConfirmedGoal',
      initialValue: null,
      onReady: (value) => setGoal(value),
    })

  const { remainingTime, start, stop, reset } = usePersistentTimer(
    'tinyStepsGoalTimer',
    15 * MINUTES_IN_MS
  )

  const [remainingRedrawCount, setRemainingRedrawCount] = useState(
    MAX_REMAINING_REDRAW_COUNT
  )
  const isFirstDraw = remainingRedrawCount === MAX_REMAINING_REDRAW_COUNT

  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false)

  const handleDrawGoal = () => {
    setRemainingRedrawCount((prev) => {
      if (prev > 0) {
        const goal = getRandomElement(tinyStepGoals, tinyStepGoals[0])
        setGoal(goal)
        return prev - 1
      }
      return 0
    })
  }

  const handleStartClick = () => {
    setConfirmedGoal(goal)
    start()
  }

  const handleEndClick = () => {
    stop()
    setFeedbackOpen(true)
  }

  const handleFeedbackClose = () => {
    setFeedbackOpen(false)
    setConfirmedGoal(null)
    setRemainingRedrawCount(MAX_REMAINING_REDRAW_COUNT)
    setGoal(null)
    reset()
  }

  return (
    <Stack spacing={2} alignItems="center" sx={{ width: '100%', pt: 5 }}>
      {/* GoalCardにランダムな目標とタグを渡す */}
      <Box sx={{ width: '95%' }}>
        <GoalCard
          timer={remainingTime}
          data={goal ? { goal, tag: tags[goal.tagId] } : null}
        />
      </Box>
      <DrawButton
        type={isFirstDraw ? 'draw' : 'redraw'}
        onClick={() => handleDrawGoal()}
        disabled={remainingRedrawCount === 0 || !!confirmedGoal}
        label={
          isFirstDraw ? 'ガチャを引く' : `引き直す (${remainingRedrawCount})`
        }
      />
      <StartButton
        onClick={handleStartClick}
        disabled={isFirstDraw || !!confirmedGoal}
      />
      <EndButton onClick={handleEndClick} disabled={!confirmedGoal} />
      <Popup open={feedbackOpen} hideCloseButton>
        {goal && (
          <FeedbackForm
            data={{ goal, tag: tags[goal.tagId] }}
            timer={remainingTime}
            onSubmit={handleFeedbackClose}
          />
        )}
      </Popup>
    </Stack>
  )
}

export default TinySteps
